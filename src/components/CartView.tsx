import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPLIMENTARY_SAMPLES } from '../data/products';
import { ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, ShoppingBag } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    discountCode,
    discountPercent,
    applyDiscountCode,
    selectedSamples,
    toggleSample,
    setIsCheckoutOpen,
    navigateTo,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const freeShippingThreshold = 150;
  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoMsg({ text: res.message, error: !res.success });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigateTo('products')}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Continue Exploring Flacons</span>
        </button>

        <div className="text-xs uppercase tracking-widest text-[#c5a880] font-medium">
          Maison Flacon Bag
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b border-stone-800 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-1 font-medium">
            Your Selected Fragrances
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light">
            Shopping Sanctuary
          </h1>
        </div>

        <div className="text-sm text-stone-400 font-mono">
          {cart.reduce((c, i) => c + i.quantity, 0)} {cart.length === 1 ? 'Flacon' : 'Flacons'} Compounded
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center bg-[#141418] border border-stone-800 max-w-2xl mx-auto p-12 space-y-6">
          <ShoppingBag size={48} className="mx-auto text-stone-600" />
          <h2 className="font-serif text-3xl text-stone-200">Your Flacon Bag is Empty</h2>
          <p className="text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
            No fragrances have been invited into your ritual yet. Explore our handcrafted extraits compounded from rare Grasse botanicals.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-8 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore The Flacons</span>
            <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        /* Two-Column Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Items and Samples */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Free Shipping Alert Banner */}
            <div className="p-4 bg-[#141418] border border-stone-800 text-xs">
              {shippingRemaining > 0 ? (
                <div>
                  <div className="flex justify-between text-stone-300 mb-2">
                    <span>
                      Add <strong className="text-[#c5a880] font-mono">${shippingRemaining}</strong> more to qualify for complimentary courier delivery
                    </span>
                    <span className="font-mono">{Math.round((cartSubtotal / freeShippingThreshold) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-[#c5a880] transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-[#c5a880] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <Sparkles size={14} />
                  <span>Complimentary Insured Courier Delivery Unlocked</span>
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="border border-stone-800 bg-[#121216] divide-y divide-stone-800">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  
                  {/* Product Info */}
                  <div
                    onClick={() => navigateTo('product-detail', item.product.id)}
                    className="flex gap-4 cursor-pointer group flex-1"
                  >
                    <div className="w-20 h-24 bg-black shrink-0 overflow-hidden border border-stone-800">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        {item.product.olfactoryFamily} · {item.volume}
                      </div>
                      <h3 className="font-serif text-xl text-stone-200 group-hover:text-[#c5a880] transition-colors">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-stone-400 font-mono mt-1">
                        ${item.price} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-800/60">
                    <div className="flex items-center border border-stone-800 bg-[#141418]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-stone-400 hover:text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-mono tabular-nums text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-stone-400 hover:text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono tabular-nums text-base text-[#f4efe6] font-medium">
                        ${item.price * item.quantity}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-stone-500 hover:text-rose-400 mt-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Complimentary Discovery Samples Picker */}
            <div className="p-6 bg-[#141418] border border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a880] font-medium">
                  <Sparkles size={14} />
                  <span>Complimentary Discovery Vials (Select Up To 2)</span>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {selectedSamples.length}/2 Selected
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                Each flacon order includes two complimentary 2ml extrait discovery vials packed in our signature velvet pouch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPLIMENTARY_SAMPLES.map((sample) => {
                  const isSelected = selectedSamples.includes(sample.id);
                  return (
                    <button
                      key={sample.id}
                      onClick={() => toggleSample(sample.id)}
                      className={`p-3 text-left border text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                          : 'border-stone-800 bg-[#101014] text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-stone-200">{sample.name}</div>
                        <div className="text-[10px] text-stone-500 uppercase">{sample.family}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-[#c5a880] bg-[#c5a880] text-black font-bold' : 'border-stone-700'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 bg-[#141418] border border-stone-800 p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-serif text-2xl text-[#f4efe6] font-light border-b border-stone-800 pb-4">
              Atelier Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">
                Privilege Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. MAISON15"
                    className="w-full bg-[#101014] border border-stone-800 pl-8 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 border border-stone-700 hover:border-[#c5a880] text-xs uppercase tracking-wider text-stone-300 hover:text-white cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <div className={`text-[11px] ${promoMsg.error ? 'text-rose-400' : 'text-[#c5a880]'}`}>
                  {promoMsg.text}
                </div>
              )}
              {discountPercent > 0 && (
                <div className="text-[11px] text-[#c5a880] font-mono">
                  Active Code: {discountCode} ({discountPercent}% applied)
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-stone-400 border-t border-stone-800 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-200">${cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#c5a880]">
                  <span>VIP Privilege Reduction</span>
                  <span className="font-mono tabular-nums">-${cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Delivery</span>
                <span className="font-mono tabular-nums text-stone-200">
                  {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-medium text-white pt-3 border-t border-stone-800">
                <span className="font-serif">Total Due</span>
                <span className="font-mono tabular-nums text-[#c5a880]">${cartTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed To Secure Checkout</span>
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest pt-2">
              <ShieldCheck size={13} />
              <span>Grasse Atelier Direct Dispatch</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
