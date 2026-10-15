import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Package, Check, Copy, Truck, Clock, Sparkles } from 'lucide-react';
import { WhatsAppOrderButton } from './WhatsAppOrderButton';

export const OrdersModal: React.FC = () => {
  const { isOrdersModalOpen, setIsOrdersModalOpen, orders, navigateTo } = useShop();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOrdersModalOpen) return null;

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrdersModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#101014] border border-stone-800 max-w-3xl w-full text-stone-200 overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium">
              Private Patron Register
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
              Order Archives & Tracking
            </h2>
          </div>
          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close orders modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Orders Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <Package size={40} className="mx-auto text-stone-700 mb-3" />
              <h3 className="font-serif text-2xl text-stone-300 mb-2">No Past Orders Found</h3>
              <p className="text-xs text-stone-400 max-w-xs mx-auto mb-6">
                Your purchase history and atelier certificates will be catalogued here upon placing an order.
              </p>
              <button
                onClick={() => {
                  setIsOrdersModalOpen(false);
                  navigateTo('products');
                }}
                className="px-6 py-3 bg-[#c5a880] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#d8be96] transition-colors cursor-pointer"
              >
                Explore The Flacons
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#141418] border border-stone-800 p-6 space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl text-stone-100 font-medium">
                        {order.id}
                      </span>
                      <button
                        onClick={() => handleCopyId(order.id)}
                        className="text-stone-500 hover:text-[#c5a880] transition-colors p-1 cursor-pointer"
                        title="Copy Order ID"
                        aria-label="Copy order id"
                      >
                        {copiedId === order.id ? <Check size={14} className="text-[#c5a880]" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      Placed on {order.date} · Destined for {order.shippingAddress.city}, {order.shippingAddress.country}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] tracking-wider uppercase text-[#c5a880] bg-[#c5a880]/10 px-2.5 py-1 border border-[#c5a880]/30 font-medium flex items-center gap-1.5">
                      <Sparkles size={11} />
                      <span>{order.status}</span>
                    </span>
                    <span className="font-mono tabular-nums text-stone-200 font-medium text-base ml-2">
                      ${order.total}
                    </span>
                  </div>
                </div>

                {/* Dispatch Progress Tracker */}
                <div className="bg-[#101014] p-4 border border-stone-800/80">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
                    <Truck size={12} className="text-[#c5a880]" />
                    <span>Atelier Fulfillment Status</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 border border-[#c5a880]/40 bg-[#c5a880]/5 text-[#c5a880]">
                      <div className="font-medium">1. Compounding</div>
                      <div className="text-stone-400 mt-0.5">Grasse Atelier</div>
                    </div>
                    <div className="p-2 border border-[#c5a880]/40 bg-[#c5a880]/5 text-[#c5a880]">
                      <div className="font-medium">2. Wax-Sealed</div>
                      <div className="text-stone-400 mt-0.5">Insured Packaging</div>
                    </div>
                    <div className="p-2 border border-stone-800 text-stone-500">
                      <div className="font-medium">3. In Transit</div>
                      <div className="text-stone-600 mt-0.5">Courier Delivery</div>
                    </div>
                  </div>
                </div>

                {/* Purchased Items List */}
                <div className="space-y-3">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                    Compounded Flacons:
                  </div>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center text-xs bg-[#101014] p-3 border border-stone-800/60">
                      <div className="w-10 h-12 bg-black shrink-0 overflow-hidden border border-stone-800">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-stone-200 font-medium">{item.product.name}</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          {item.volume} · Qty: {item.quantity} · ${item.price} each
                        </div>
                      </div>
                      <div className="font-mono tabular-nums text-stone-300 font-medium">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Samples and Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-stone-800/80">
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase tracking-wider block mb-1">
                      Discovery Vials Included:
                    </span>
                    <span className="text-stone-300 text-[11px]">
                      {order.selectedSamples.length > 0
                        ? order.selectedSamples.map((s) => s.replace('sample-', '')).join(', ')
                        : 'Curated by Master Nose'}
                    </span>
                  </div>
                  {order.giftNote && (
                    <div>
                      <span className="text-stone-500 text-[10px] uppercase tracking-wider block mb-1">
                        Calligraphy Card Dedication:
                      </span>
                      <span className="italic text-stone-300 font-serif text-[12px]">
                        "{order.giftNote}"
                      </span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Order Concierge Action for Confirmed Order */}
                <div className="pt-2 border-t border-stone-800/80">
                  <WhatsAppOrderButton order={order} variant="compact" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0e0e12] text-center text-xs text-stone-500">
          All client orders are permanently preserved in your local browser sanctuary.
        </div>

      </div>
    </div>
  );
};
