import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { navigateTo, setIsQuizOpen } = useShop();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-stone-800">
      {/* Background Image with Cinematic Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_perfume_1791440856817.jpg"
          alt="Maison d'Or Bespoke Crystal Flacon"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_14s_ease-in-out_infinite]"
        />
        {/* Measured scrim to guarantee 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/80 to-[#0c0c0e]/40" />
        <div className="absolute inset-0 bg-[#0c0c0e]/30 backdrop-brightness-90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Editorial Subtitle / Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#c5a880] mb-6 font-medium"
        >
          <span>Haute Parfumerie</span>
          <span aria-hidden="true">·</span>
          <span>Grasse, France</span>
          <span aria-hidden="true">·</span>
          <span>Millésime 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4efe6] font-light tracking-tight leading-[1.08] mb-8 max-w-4xl mx-auto text-balance"
        >
          Scents sculpted in light, shadow, and rare resins.
        </motion.h1>

        {/* Narrative Prose */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-stone-300 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Artisanal French extraits de parfum formulated with hand-harvested Grasse botanicals, twenty-year Cambodian oud, and pure Madagascar bourbon vanilla.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => navigateTo('products')}
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] text-black hover:bg-[#d8be96] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#c5a880]/15"
          >
            <span>Shop Now</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-collections');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigateTo('products');
              }
            }}
            className="w-full sm:w-auto px-8 py-4 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-[#f4efe6] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Collection</span>
          </button>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-full sm:w-auto px-6 py-4 bg-stone-950/60 hover:bg-stone-900 border border-stone-800 text-[#c5a880] hover:text-[#e4ccab] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Compass size={15} />
            <span>Scent Quiz</span>
          </button>
        </motion.div>

        {/* Proof & Craftsmanship Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto text-xs text-stone-400"
        >
          <div>
            <span className="text-[#c5a880] block text-sm font-serif">30%–38%</span>
            <span className="tracking-wider uppercase text-[10px]">Pure Extrait Concentration</span>
          </div>
          <div>
            <span className="text-[#c5a880] block text-sm font-serif">Grasse Atelier</span>
            <span className="tracking-wider uppercase text-[10px]">French Terroir & Alembics</span>
          </div>
          <div>
            <span className="text-[#c5a880] block text-sm font-serif">Oak Cask Matured</span>
            <span className="tracking-wider uppercase text-[10px]">180-Day Cold Maceration</span>
          </div>
          <div>
            <span className="text-[#c5a880] block text-sm font-serif">Bespoke Flacon</span>
            <span className="tracking-wider uppercase text-[10px]">Heavy Crystal & Brass Cap</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
