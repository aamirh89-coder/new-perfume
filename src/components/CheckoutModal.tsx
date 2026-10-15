import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { X, Check, ShieldCheck, CreditCard, Sparkles, Truck, Package, ArrowRight, AlertCircle, Phone } from 'lucide-react';
import { WhatsAppOrderButton } from './WhatsAppOrderButton';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    selectedSamples,
    placeOrder,
    setIsOrdersModalOpen,
    navigateTo,
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'e.vance@chateau-elegance.fr',
    phone: '+33 1 42 68 55 00',
    address: '18 Place Vendôme',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [giftNote, setGiftNote] = useState('With deepest compliments and enduring affection.');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cod'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'A valid email address is required for dispatch updates.';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 6) {
      errors.phone = 'Valid telephone or WhatsApp number is required (at least 6 digits).';
    }
    if (!formData.address.trim() || formData.address.trim().length < 3) {
      errors.address = 'Street address is required.';
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required.';
    }
    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required.';
    }
    if (!formData.country.trim()) {
      errors.country = 'Country is required.';
    }
    if (cart.length === 0) {
      errors.cart = 'Your shopping bag is empty. Please select a fragrance.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const order = placeOrder(formData, includeGiftBox ? giftNote : undefined);
        setConfirmedOrder(order);
        setFormErrors({});
      } catch (err) {
        console.error('Order creation error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#101014] border border-stone-800 max-w-4xl w-full text-stone-200 overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white p-2 transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#c5a880] mx-auto flex items-center justify-center border border-[#c5a880]/40">
              <Check size={32} strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
                Privilege Order Confirmed
              </div>
              <div className="flex items-center justify-center gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6]">
                  Order {confirmedOrder.id}
                </h2>
                <button
                  type="button"
                  onClick={() => handleCopyOrderId(confirmedOrder.id)}
                  className="px-2.5 py-1 text-xs border border-stone-700 bg-stone-900 text-stone-300 hover:text-white hover:border-[#c5a880] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy Order ID"
                >
                  {copiedId ? <Check size={12} className="text-[#c5a880]" /> : null}
                  <span>{copiedId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Thank you, {confirmedOrder.shippingAddress.fullName}. Your flacons are now entering cold conditioning and manual wax-sealing in our Grasse laboratory.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#141418] border border-stone-800 p-6 text-left space-y-4 text-xs">
              {/* Product items breakdown */}
              <div className="border-b border-stone-800 pb-3 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block">
                  Ordered Fragrances ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)})
                </span>
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-stone-300">
                    <span className="truncate pr-2">
                      • {item.product.name} ({item.volume}) <span className="text-stone-500">×{item.quantity}</span>
                    </span>
                    <span className="font-mono text-stone-200 shrink-0">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-b border-stone-800 pb-3">
                <span className="text-stone-400">Customer Details:</span>
                <span className="text-stone-200 font-medium text-right">
                  {confirmedOrder.shippingAddress.fullName} · {confirmedOrder.shippingAddress.phone}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-3">
                <span className="text-stone-400">Dispatch Destination:</span>
                <span className="text-stone-200 font-medium text-right">
                  {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.country}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-3">
                <span className="text-stone-400">Complimentary Samples:</span>
                <span className="text-[#c5a880]">2 Vials Included in Velvet Pouch</span>
              </div>
              {confirmedOrder.giftNote && (
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-stone-400 block mb-1">Handwritten Wax-Sealed Note:</span>
                  <span className="italic text-stone-300 font-serif text-sm">"{confirmedOrder.giftNote}"</span>
                </div>
              )}
              <div className="flex justify-between pt-1 text-sm font-medium">
                <span className="text-white">Total Charged:</span>
                <span className="font-mono tabular-nums text-[#c5a880] text-base">${confirmedOrder.total}</span>
              </div>
            </div>

            {/* Official WhatsApp Integration - Available Only on Confirmed Orders */}
            <WhatsAppOrderButton order={confirmedOrder} />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleClose}
                className="flex-1 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
              >
                Return To The Maison Archive
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  setIsOrdersModalOpen(true);
                }}
                className="sm:w-auto px-6 py-4 bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
              >
                Track in Orders Archive
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Bag Warning */
          <div className="p-12 text-center max-w-md mx-auto space-y-6">
            <h2 className="font-serif text-3xl text-stone-200">Your Bag is Empty</h2>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              You must have at least one flacon in your bag before proceeding to checkout.
            </p>
            <button
              onClick={() => {
                handleClose();
                navigateTo('products');
              }}
              className="w-full py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Explore The Flacons
            </button>
          </div>
        ) : (
          /* Active Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            
            {/* Form Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium mb-1">
                  Maison Haute Parfumerie
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  Direct Atelier Dispatch
                </h2>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-stone-400 font-medium border-b border-stone-800 pb-2">
                  1. Courier Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      Full Name <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Lady Eleanor Vance"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.fullName}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      Email Address <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. patron@chateau-elegance.com"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.email ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500 flex items-center justify-between">
                      <span>Phone / WhatsApp <span className="text-[#c5a880]">*</span></span>
                      <span className="text-[10px] text-[#25D366] font-mono flex items-center gap-1">
                        <Phone size={10} /> WhatsApp
                      </span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 1 42 68 55 00"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      Street Address <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 18 Place Vendôme"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.address ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.address}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      City <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Paris"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.city ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.city}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      Postal Code <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="75001"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.postalCode ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.postalCode && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.postalCode}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-500">
                      Country <span className="text-[#c5a880]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="France"
                      className={`w-full bg-[#16161a] border p-2.5 text-xs text-stone-200 focus:outline-none transition-colors ${
                        formErrors.country ? 'border-red-500/80 bg-red-950/10' : 'border-stone-800 focus:border-[#c5a880]'
                      }`}
                    />
                    {formErrors.country && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{formErrors.country}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bespoke Gift Box & Handwritten Card */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    2. Complimentary Gift Packaging
                  </label>
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="accent-[#c5a880]"
                  />
                </div>
                {includeGiftBox && (
                  <div className="space-y-2 bg-[#141418] border border-stone-800 p-4">
                    <label className="text-[11px] text-stone-400 block">
                      Handwritten Calligraphy Card Message:
                    </label>
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      className="w-full bg-[#16161a] border border-stone-800 p-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880]"
                      placeholder="Write your dedication here..."
                    />
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-wider text-stone-400 font-medium border-b border-stone-800 pb-2">
                  3. Payment Privilege
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 text-center border text-xs cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-stone-800 bg-[#16161a] text-stone-400'
                    }`}
                  >
                    <CreditCard size={16} className="mx-auto mb-1 text-[#c5a880]" />
                    <span>Card / Amex</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`p-3 text-center border text-xs cursor-pointer ${
                      paymentMethod === 'apple-pay'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-stone-800 bg-[#16161a] text-stone-400'
                    }`}
                  >
                    <Sparkles size={16} className="mx-auto mb-1 text-[#c5a880]" />
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-center border text-xs cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-stone-800 bg-[#16161a] text-stone-400'
                    }`}
                  >
                    <Truck size={16} className="mx-auto mb-1 text-[#c5a880]" />
                    <span>Courier COD</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order Flacons...</span>
                ) : (
                  <>
                    <span>Confirm Order · ${cartTotal}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest">
                <ShieldCheck size={12} />
                <span>Private Grasse Atelier Dispatch · Fully Insured</span>
              </div>
            </form>

            {/* Order Review Sidebar Column */}
            <div className="lg:col-span-5 bg-[#0e0e12] border-t lg:border-t-0 lg:border-l border-stone-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl text-stone-200 mb-4">
                  Order Summary ({cart.reduce((c, i) => c + i.quantity, 0)})
                </h3>

                {/* Items preview */}
                <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs border-b border-stone-800/60 pb-2.5">
                      <div className="w-12 h-14 bg-black overflow-hidden shrink-0 border border-stone-800">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-stone-300 font-medium">{item.product.name}</div>
                        <div className="text-[10px] text-stone-500">{item.volume} · Qty: {item.quantity}</div>
                      </div>
                      <div className="font-mono text-stone-200">${item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                {/* Discovery Samples */}
                <div className="bg-[#141418] p-3 border border-stone-800 mb-6 text-xs">
                  <div className="text-[10px] uppercase tracking-wider text-[#c5a880] font-medium mb-1">
                    Complimentary Discovery Vials:
                  </div>
                  <div className="text-stone-300 space-y-0.5 text-[11px]">
                    {selectedSamples.length > 0 ? (
                      selectedSamples.map((s) => <div key={s}>• 2ml Discovery Vial ({s.replace('sample-', '')})</div>)
                    ) : (
                      <div>• 2ml Discovery Flacons included by master nose</div>
                    )}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="space-y-2 text-xs border-t border-stone-800 pt-4">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-stone-200">${cartSubtotal}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#c5a880]">
                      <span>VIP Privilege Reduction</span>
                      <span className="font-mono tabular-nums">-${cartDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-400">
                    <span>Insured Courier Shipping</span>
                    <span className="font-mono tabular-nums text-stone-200">
                      {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-white pt-2 border-t border-stone-800">
                    <span className="font-serif">Total Due</span>
                    <span className="font-mono tabular-nums text-[#c5a880]">${cartTotal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800/60 text-[11px] text-stone-500">
                All bottles are packed in our signature velvet-lined presentation casket with personalized batch certificate.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
