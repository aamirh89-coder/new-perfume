import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Compass, Shield } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { navigateTo, setIsQuizOpen } = useShop();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-800">
      
      {/* Narrative Lead */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium">
            <span>The Grasse Atelier Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1928</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light leading-tight">
            We do not create perfumes for trends; we compose olfactory heirlooms.
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Nestled on the sunlit hills above Cannes, Maison d'Or preserves the artisanal practices of French Haute Parfumerie. While modern commercial houses accelerate production using synthetic fillers, we maintain 180-day oak cask maceration in our vaulted stone cellars.
          </p>

          <p className="text-stone-400 text-sm font-light leading-relaxed">
            Every bottle is hand-poured, wax-sealed, and numbered. Our extraits de parfum contain up to 38% pure perfume concentrate, delivering an extraordinary longevity that transcends daylight into evening.
          </p>

          <div className="pt-2 flex gap-4">
            <button
              onClick={() => navigateTo('products')}
              className="px-6 py-3.5 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore The Archive</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-6 py-3.5 bg-transparent border border-stone-700 hover:border-[#c5a880] text-stone-300 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
            >
              Diagnostic
            </button>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] bg-black overflow-hidden border border-stone-800">
            <img
              src="/src/assets/images/perfume_amber_noir_1791440872307.jpg"
              alt="Maison d'Or Atelier craftsmanship"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#141418] border border-stone-800 p-6 hidden sm:block max-w-xs shadow-2xl">
            <span className="text-[#c5a880] font-serif text-2xl block mb-1">3,000+</span>
            <span className="text-xs text-stone-300 font-light leading-relaxed">
              Hand-harvested May rose petals distilled into each 50ml flacon.
            </span>
          </div>
        </div>
      </div>

      {/* The 3 Pillars of Craftsmanship */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-stone-800/80">
        
        {/* Pillar 1 */}
        <div className="space-y-3 p-6 bg-[#141418] border border-stone-800">
          <div className="w-10 h-10 flex items-center justify-center bg-[#c5a880]/10 text-[#c5a880] border border-[#c5a880]/30 mb-2">
            <Sparkles size={18} />
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[#c5a880] font-medium">Pillar I</div>
          <h3 className="font-serif text-2xl text-stone-200">Wild & Rare Botanical Sourcing</h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            From 20-year aged Cambodian agarwood to sun-extracted Amalfi neroli and organic Bourbon vanilla from northeastern Madagascar.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="space-y-3 p-6 bg-[#141418] border border-stone-800">
          <div className="w-10 h-10 flex items-center justify-center bg-[#c5a880]/10 text-[#c5a880] border border-[#c5a880]/30 mb-2">
            <Compass size={18} />
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[#c5a880] font-medium">Pillar II</div>
          <h3 className="font-serif text-2xl text-stone-200">Slow Cold Maceration</h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            We mature our formulations in French Limousin oak barrels for six full months, permitting heavy balsamic notes to fuse harmoniously with volatile citrus.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="space-y-3 p-6 bg-[#141418] border border-stone-800">
          <div className="w-10 h-10 flex items-center justify-center bg-[#c5a880]/10 text-[#c5a880] border border-[#c5a880]/30 mb-2">
            <Shield size={18} />
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[#c5a880] font-medium">Pillar III</div>
          <h3 className="font-serif text-2xl text-stone-200">Heavy Crystal Flacons</h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Formed by master glassblowers in Normandy with solid brushed brass magnetic closures. Engineered to shelter sensitive oils from UV degradation.
          </p>
        </div>

      </div>

    </section>
  );
};
