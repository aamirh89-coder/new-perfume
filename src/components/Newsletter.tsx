import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Privilege Register Confirmed. Welcome to Maison d\'Or.');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-b border-stone-800">
      <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 text-[#c5a880] mx-auto flex items-center justify-center border border-[#c5a880]/30 mb-4">
        <Sparkles size={16} />
      </div>

      <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
        Private Register
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe6] font-light tracking-tight mb-4 text-balance">
        Receive Private Reserve Announcements
      </h2>

      <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto mb-8">
        Patrons receive private salon invitations, preview access to unreleased barrel macerations, and seasonal botanical harvest monographs.
      </p>

      {subscribed ? (
        <div className="bg-[#141418] border border-[#c5a880]/40 p-6 max-w-md mx-auto text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#c5a880] text-sm font-medium">
            <Check size={16} />
            <span>Invitation Dispatched</span>
          </div>
          <p className="text-xs text-stone-400">
            A confirmation correspondence and complimentary discovery code have been forwarded to {email}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your confidential email..."
            className="flex-1 bg-[#141418] border border-stone-800 px-4 py-3.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a880] transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Request Entry</span>
            <ArrowRight size={14} />
          </button>
        </form>
      )}

      <div className="mt-4 text-[10px] uppercase tracking-widest text-stone-600">
        Discretion Assured · No commercial spam · Unsubscribe at any time
      </div>
    </section>
  );
};
