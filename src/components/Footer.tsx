import React from 'react';
import { useShop } from '../context/ShopContext';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setIsQuizOpen, setIsOrdersModalOpen } = useShop();

  return (
    <footer className="bg-[#08080a] text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Brand Statement Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-stone-800/80 gap-6">
          <div>
            <div className="font-serif text-3xl tracking-[0.2em] text-[#f4efe6] uppercase mb-1">
              Maison d'Or
            </div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880]">
              Haute Parfumerie Française · Grasse · Est. 1928
            </div>
          </div>

          <div className="flex items-center gap-6 text-stone-400 text-xs uppercase tracking-wider">
            <button
              onClick={() => navigateTo('products')}
              className="hover:text-[#c5a880] transition-colors cursor-pointer"
            >
              The Flacons
            </button>
            <button
              onClick={() => navigateTo('story')}
              className="hover:text-[#c5a880] transition-colors cursor-pointer"
            >
              Grasse Atelier
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hover:text-[#c5a880] transition-colors cursor-pointer"
            >
              Scent Diagnostic
            </button>
          </div>
        </div>

        {/* 4 Multi-Column Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-stone-800/80">
          
          {/* Column 1: Atelier & Flagships */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-stone-200 tracking-wide">
              Global Boutiques
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px] leading-relaxed">
              <li>
                <strong className="text-stone-300 block">Paris Atelier & Flagship</strong>
                18 Place Vendôme, 75001 Paris
              </li>
              <li>
                <strong className="text-stone-300 block">London Salon</strong>
                42 Old Bond Street, Mayfair, London
              </li>
              <li>
                <strong className="text-stone-300 block">New York Suite</strong>
                740 Madison Avenue, New York, NY
              </li>
              <li>
                <strong className="text-stone-300 block">Tokyo Atelier</strong>
                6-10-1 Ginza, Chuo-ku, Tokyo
              </li>
            </ul>
          </div>

          {/* Column 2: Olfactory Archives */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-stone-200 tracking-wide">
              The Collections
            </h4>
            <ul className="space-y-2 text-[11px] text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Les Extraits de Parfum (38% Conc.)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Private Reserve Millésimes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Signature Crystal Flacons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Olfactory Diagnostic Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Patron Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-stone-200 tracking-wide">
              Patron Services
            </h4>
            <ul className="space-y-2 text-[11px] text-stone-400">
              <li>
                <button
                  onClick={() => setIsOrdersModalOpen(true)}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-left"
                >
                  Order Archives & Courier Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-left"
                >
                  Shopping Sanctuary & Samples
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-left"
                >
                  Personal Wishlist Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-left"
                >
                  Scent Diagnostic Consultation
                </button>
              </li>
              <li>Complimentary International Courier Shipping</li>
            </ul>
          </div>

          {/* Column 4: Sourcing & Sustainability Ethics */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-stone-200 tracking-wide">
              Artisanal Ethics
            </h4>
            <p className="text-[11px] leading-relaxed text-stone-400 font-light">
              Maison d'Or is committed to the sustainable stewardship of Grasse flower fields and ethical fair-trade sourcing of rare Madagascar vanilla and Cambodian agarwood.
            </p>
            <div className="pt-2 text-[#c5a880] text-[10px] uppercase tracking-widest font-mono">
              Cruelty-Free · Zero Phthalates · 100% Recyclable Crystal
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-4">
          <div>
            © {new Date().getFullYear()} Maison d'Or Haute Parfumerie S.A.S. All rights reserved. Registered in Grasse & Paris.
          </div>
          <div className="flex gap-6 tracking-wider uppercase text-[10px]">
            <span>Privacy Policy</span>
            <span>Terms of Privilege</span>
            <span>Legal Notice</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
