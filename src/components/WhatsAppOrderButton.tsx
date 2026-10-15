import React, { useState } from 'react';
import { Order } from '../types';
import { generateWhatsAppOrderUrl, isOrderConfirmedAndValid } from '../utils/whatsapp';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface WhatsAppOrderButtonProps {
  order: Order | null;
  className?: string;
  variant?: 'primary' | 'compact' | 'outline';
  showPreviewOption?: boolean;
}

export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  order,
  className = '',
  variant = 'primary',
  showPreviewOption = true,
}) => {
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Security check: Only render/enable when a valid, confirmed order exists
  if (!order || !isOrderConfirmedAndValid(order)) {
    return null;
  }

  const { url, rawMessage, sanitizedPhone, isValid } = generateWhatsAppOrderUrl(order);

  if (!isValid || !url) {
    return null;
  }

  const handleCopyMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(rawMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2400);
  };


  // Official WhatsApp SVG icon
  const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.64 20.28 9.71 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.67 20.16 9.32 19.8 8.14 19.11L7.85 18.94L4.74 19.76L5.57 16.73L5.38 16.42C4.62 15.2 4.21 13.58 4.21 11.91C4.21 7.37 7.91 3.67 12.04 3.67ZM8.77 7.37C8.58 7.37 8.27 7.44 8.02 7.71C7.76 7.99 7.03 8.68 7.03 10.07C7.03 11.47 8.05 12.82 8.19 13.01C8.34 13.2 10.15 16 12.96 17.21C13.63 17.5 14.15 17.67 14.56 17.8C15.23 18.01 15.85 17.98 16.33 17.91C16.87 17.83 17.99 17.23 18.22 16.58C18.45 15.93 18.45 15.37 18.38 15.26C18.31 15.15 18.12 15.08 17.84 14.94C17.55 14.8 16.14 14.11 15.88 14.01C15.62 13.92 15.43 13.88 15.24 14.16C15.05 14.44 14.51 15.08 14.35 15.26C14.19 15.45 14.03 15.47 13.74 15.33C13.46 15.19 12.56 14.89 11.5 13.94C10.67 13.2 10.11 12.28 9.95 12.01C9.79 11.73 9.93 11.57 10.07 11.43C10.2 11.3 10.36 11.09 10.51 10.92C10.66 10.74 10.71 10.61 10.81 10.42C10.9 10.23 10.85 10.07 10.78 9.93C10.71 9.79 10.15 8.42 9.92 7.86C9.69 7.32 9.46 7.39 9.29 7.38C9.13 7.37 8.94 7.37 8.77 7.37Z" />
    </svg>
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {variant === 'primary' && (
        <div className="bg-[#121614] border border-[#25D366]/40 p-5 text-left relative overflow-hidden group">
          {/* Subtle green ambient accent glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#25D366]">
                  WhatsApp Order Concierge
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  +{sanitizedPhone}
                </span>
              </div>
              <h4 className="font-serif text-lg text-[#f4efe6] font-medium leading-tight">
                Connect Directly with Our Atelier Desk
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed max-w-md">
                Click below to launch WhatsApp with your order details pre-filled for real-time dispatch confirmation, courier updates, or bespoke requests.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 cursor-pointer active:scale-[0.98] text-center"
                aria-label="Contact Us on WhatsApp about your order"
              >
                <WhatsAppIcon size={18} />
                <span>Contact Us on WhatsApp</span>
                <ExternalLink size={13} className="opacity-80" />
              </a>

              {showPreviewOption && (
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-3.5 py-3.5 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-stone-300 hover:text-white text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center"
                  title="Preview pre-filled message"
                  aria-label="Preview WhatsApp message"
                >
                  Preview Message
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#25D366]" />
              <span>Order #{order.id} verified · Ready to send</span>
            </div>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedMessage ? <Check size={11} className="text-[#25D366]" /> : <Copy size={11} />}
              <span>{copiedMessage ? 'Message Copied' : 'Copy Message Text'}</span>
            </button>
          </div>
        </div>
      )}

      {variant === 'compact' && (
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black text-[11px] font-semibold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#25D366]/10 text-center"
            aria-label="Chat on WhatsApp about this confirmed order"
          >
            <WhatsAppIcon size={16} />
            <span>Contact on WhatsApp</span>
          </a>
          {showPreviewOption && (
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="p-2.5 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white cursor-pointer"
              title="Preview pre-filled text"
              aria-label="Preview message"
            >
              <Copy size={14} />
            </button>
          )}
        </div>
      )}

      {variant === 'outline' && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 border border-[#25D366]/60 hover:border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/15 text-stone-200 hover:text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
          aria-label="Contact Us on WhatsApp about order"
        >
          <WhatsAppIcon size={16} />
          <span>Contact Us on WhatsApp (Order #{order.id})</span>
        </a>
      )}

      {/* Message Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141418] border border-stone-800 max-w-lg w-full p-6 text-stone-200 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <WhatsAppIcon size={18} />
                <span className="font-serif text-lg text-white font-medium">
                  WhatsApp Message Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-stone-400 hover:text-white text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>

            <div>
              <div className="text-[10px] tracking-wider uppercase text-stone-400 mb-1">
                Recipient: {WHATSAPP_CONFIG.businessName} ({WHATSAPP_CONFIG.businessPhoneNumber})
              </div>
              <div className="bg-[#0c0c0e] border border-stone-800 p-4 rounded-none text-xs font-mono text-stone-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto selection:bg-[#25D366]/30">
                {rawMessage}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <WhatsAppIcon size={16} />
                <span>Open in WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="py-3 px-4 bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedMessage ? <Check size={14} className="text-[#25D366]" /> : <Copy size={14} />}
                <span>{copiedMessage ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
