import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Sparkles, Compass, Shield, Award } from 'lucide-react';

export const StoryView: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#c5a880] transition-colors mb-10 cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span>Return to Maison Home</span>
      </button>

      {/* Hero Banner */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-black overflow-hidden border border-stone-800 mb-14">
        <img
          src="/src/assets/images/hero_luxury_perfume_1791440856817.jpg"
          alt="Maison d'Or Atelier Cellars"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/60 to-transparent" />
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-xl">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
            Grasse, Côte d'Azur · Haute Parfumerie
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light">
            The Philosophy of Pure Scent
          </h1>
        </div>
      </div>

      {/* Chapters / Editorial prose */}
      <div className="space-y-16 max-w-4xl mx-auto">
        
        {/* Chapter 1 */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
            Chapter 01. The Grasse Terroir
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-200">
            Microclimates between the Maritime Alps and Mediterranean Sea
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            The microclimate of Grasse has been recognized since the 17th century as the undisputed capital of the perfume world. Here, sheltered from northern winds while bathed in Mediterranean light, May rose (*Rosa centifolia*), bigarade orange blossom, and night-blooming jasmine develop olfactory complexity impossible to replicate anywhere else on Earth.
          </p>
        </section>

        {/* Chapter 2 */}
        <section className="space-y-4 bg-[#141418] border border-stone-800 p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
            Chapter 02. The Six-Month Oak Maceration
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-200">
            Slow Aging in Limousin French Casks
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Commercial fragrances are produced within hours using synthetic accelerants. At Maison d'Or, once the nose finalizes the formula, the raw oils rest in charred French Limousin oak casks for 180 uninterrupted days. This process naturally rounds harsh edges, allowing heavy resins and top notes to marry intimately.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 text-xs">
            <div>
              <span className="text-[#c5a880] font-mono block text-lg font-medium">38%</span>
              <span className="text-stone-400">Pure Extrait Concentration</span>
            </div>
            <div>
              <span className="text-[#c5a880] font-mono block text-lg font-medium">180 Days</span>
              <span className="text-stone-400">Cold Vault Maturation</span>
            </div>
            <div>
              <span className="text-[#c5a880] font-mono block text-lg font-medium">100% Hand-Crafted</span>
              <span className="text-stone-400">Individual Wax-Seal Closures</span>
            </div>
          </div>
        </section>

        {/* Chapter 3 */}
        <section className="space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
            Chapter 03. The Flacon & The Crystal Cap
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-200">
            Protection as a Fine Art Form
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Light and air are the natural enemies of natural essential oils. Our flacons are poured from ultra-dense, UV-filtering optical crystal in the glassworks of Normandy. Topped by a heavy magnetic solid brass cap, each vessel is designed to preserve your fragrance for decades without degradation.
          </p>
        </section>

        {/* CTA */}
        <div className="pt-10 border-t border-stone-800 text-center">
          <h3 className="font-serif text-3xl text-[#f4efe6] mb-4">
            Discover Your Signature Flacon
          </h3>
          <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
            Explore the complete archive or allow our master diagnostic to recommend an olfactory match.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-8 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
          >
            Explore The Flacons
          </button>
        </div>

      </div>

    </div>
  );
};
