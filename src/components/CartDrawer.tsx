import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPLIMENTARY_SAMPLES } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoMsg({ text: res.message, error: !res.success });
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 150;
  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101014] border-l border-stone-800 text-stone-200 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium">
                Your Selection
              </div>
              <h2 className="font-serif text-2xl text-[#f4efe6] font-light">
                Flacon Bag ({cart.reduce((c, i) => c + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-6 py-3 bg-[#141418] border-b border-stone-800 text-xs">
            {shippingRemaining > 0 ? (
              <div>
                <div className="flex justify-between text-stone-400 mb-1.5 text-[11px]">
                  <span>Add <strong className="text-white font-mono">${shippingRemaining}</strong> for complimentary courier delivery</span>
                  <span className="font-mono">{Math.round((cartSubtotal / freeShippingThreshold) * 100)}%</span>
                </div>
                <div className="h-1 bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-[#c5a880] transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-[#c5a880] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Complimentary Insured Courier Delivery Unlocked</span>
              </div>
            )}
          </div>

          {/* Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-stone-500">
                <p className="font-serif text-2xl text-stone-300 mb-2">Your Bag is Empty</p>
                <p className="text-xs mb-6 max-w-xs mx-auto">
                  Discover our rare extraits de parfum and invite exquisite notes into your ritual.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="px-6 py-3 bg-[#c5a880] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#d8be96] transition-colors cursor-pointer"
                >
                  Explore The Flacons
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-[#141418] border border-stone-800/80 relative"
                    >
                      {/* Thumbnail */}
                      <div
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product-detail', item.product.id);
                        }}
                        className="w-20 h-24 bg-black overflow-hidden shrink-0 border border-stone-800 cursor-pointer group/thumb"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] tracking-wider uppercase text-stone-400 mb-0.5">
                            {item.product.olfactoryFamily} · {item.volume}
                          </div>
                          <h4
                            onClick={() => {
                              setIsCartOpen(false);
                              navigateTo('product-detail', item.product.id);
                            }}
                            className="font-serif text-base text-[#f4efe6] hover:text-[#c5a880] transition-colors cursor-pointer leading-snug"
                          >
                            {item.product.name}
                          </h4>
                          <div className="font-mono tabular-nums text-xs text-[#c5a880] mt-1">
                            ${item.price} each
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-stone-800 bg-stone-900">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-stone-400 hover:text-white cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-mono tabular-nums text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-stone-400 hover:text-white cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 hover:text-stone-300 p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complimentary Samples Selection */}
                <div className="p-4 bg-[#141418] border border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] tracking-wider uppercase text-[#c5a880] font-medium flex items-center gap-1.5">
                      <Sparkles size={12} />
                      <span>Complimentary Samples</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {selectedSamples.length}/2 Selected
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-3">
                    Select up to two 2ml discovery vials to accompany your order.
                  </p>
                  <div className="space-y-1.5">
                    {COMPLIMENTARY_SAMPLES.map((sample) => {
                      const isSelected = selectedSamples.includes(sample.id);
                      return (
                        <button
                          key={sample.id}
                          onClick={() => toggleSample(sample.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs border transition-colors cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                              : 'border-stone-800/80 bg-stone-950/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                          }`}
                        >
                          <span>{sample.name}</span>
                          <span className="text-[10px] text-stone-500 uppercase">{sample.family}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Privilege Code / Coupon Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Privilege Code (e.g. MAISON15)"
                        className="w-full bg-[#141418] border border-stone-800 pl-8 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a880]"
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
                    <div className="text-[11px] text-[#c5a880] flex items-center gap-1 font-mono">
                      VIP Privilege: {discountCode} ({discountPercent}% applied)
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-[#0e0e12] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-200">${cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#c5a880]">
                    <span>Privilege Reduction</span>
                    <span className="font-mono tabular-nums">-${cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier Shipping</span>
                  <span className="font-mono tabular-nums text-stone-200">
                    {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-medium text-white pt-2 border-t border-stone-800">
                  <span className="font-serif">Total</span>
                  <span className="font-mono tabular-nums">${cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('cart');
                }}
                className="w-full py-2.5 text-center text-[11px] text-stone-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer border border-stone-800 hover:border-stone-700 bg-stone-950/60"
              >
                View Full Bag & Gift Options
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest">
                <ShieldCheck size={12} />
                <span>Encrypted 256-bit Maison Payment Gateway</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
