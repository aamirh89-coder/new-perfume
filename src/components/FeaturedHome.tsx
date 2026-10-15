import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles, Flame, Sparkle, Users } from 'lucide-react';

export const FeaturedHome: React.FC = () => {
  const { navigateTo, setFamilyFilter, setGenderFilter } = useShop();
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'newarrivals'>('featured');

  const featured = PRODUCTS.filter((p) => p.isBestSeller || p.isNewArrival).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  const displayedProducts =
    activeTab === 'featured'
      ? featured
      : activeTab === 'bestsellers'
      ? bestSellers
      : newArrivals;

  const collections = [
    {
      id: 'women',
      title: 'Women’s Collection',
      frenchSubtitle: 'Pour Femme · Fleur & Lumière',
      description: 'Luminous centifolia roses, solar Mediterranean neroli, night-blooming tuberose, and velvety white ambers.',
      gender: 'For Her',
      tag: 'Solar & Floral',
      image: '/src/assets/images/perfume_soleil_dore_1791440907547.jpg',
      badge: 'Bespoke Femininity',
    },
    {
      id: 'men',
      title: 'Men’s Collection',
      frenchSubtitle: 'Pour Homme · Cuir & Ombre',
      description: 'Smoked birch tar, antique saddle leather, Tuscan patchouli, dark plum, and aged Haitian vetiver roots.',
      gender: 'For Him',
      tag: 'Smoky & Leather',
      image: '/src/assets/images/hero_luxury_perfume_1791440856817.jpg',
      badge: 'Architectural Shadow',
    },
    {
      id: 'unisex',
      title: 'Unisex Signature Extraits',
      frenchSubtitle: 'Partagé · Rare Woods & Resins',
      description: 'Artisanal boundary-defying formulas centered on 20-year Cambodian oud, Siamese labdanum, and limousin oak.',
      gender: 'Unisex',
      tag: 'Woody & Oriental',
      image: '/src/assets/images/perfume_rose_oud_1791440893303.jpg',
      badge: 'Genderless Haute Parfumerie',
    },
  ];

  const families = [
    {
      name: 'Woody Amber',
      notes: 'Labdanum · Ambergris · Smoked Oak',
      desc: 'Deep balsamic resins aged in Limousin oak barrels.',
      img: '/src/assets/images/perfume_amber_noir_1791440872307.jpg',
    },
    {
      name: 'Floral Oriental',
      notes: 'Rose de Mai · Cambodian Oud · Saffron',
      desc: 'Regal Grasse centifolia rose married to precious woods.',
      img: '/src/assets/images/perfume_rose_oud_1791440893303.jpg',
    },
    {
      name: 'Solar Citrus',
      notes: 'Bergamot · Neroli · White Amber',
      desc: 'Sunlit Amalfi zests sparkling above creamy musk.',
      img: '/src/assets/images/perfume_soleil_dore_1791440907547.jpg',
    },
    {
      name: 'Aromatic Vetiver',
      notes: 'Haitian Vetiver · Mysore Sandal · Cardamom',
      desc: 'Earthy roots distilled in vintage copper alembics.',
      img: '/src/assets/images/perfume_vetiver_santal_1791440925029.jpg',
    },
  ];

  const handleCollectionClick = (gender: string) => {
    setGenderFilter(gender);
    setFamilyFilter('All');
    navigateTo('products');
  };

  return (
    <section id="featured-collections" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-800">
      
      {/* Section Header with Tabs for Featured, Best Sellers, and New Arrivals */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
            <Sparkles size={13} />
            <span>Curated Haute Parfumerie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light tracking-tight">
            The Atelier Creations
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-[#121216] border border-stone-800 p-1">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'featured'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkle size={13} />
            <span>Featured Flacons</span>
          </button>
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bestsellers'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame size={13} />
            <span>Best Sellers ({bestSellers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('newarrivals')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'newarrivals'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles size={13} />
            <span>New Arrivals ({newArrivals.length})</span>
          </button>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Men's, Women's, and Unisex Collections Showcase */}
      <div className="border-t border-stone-800/80 pt-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium flex items-center justify-center gap-1.5">
            <Users size={14} />
            <span>Signature Aura Collections</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Men’s, Women’s & Unisex Collections
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-2 leading-relaxed">
            Distinguished aromatic compositions calibrated for individual expression, whether commanding, luminous, or shared.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.gender)}
              className="group relative bg-[#141418] border border-stone-800 overflow-hidden cursor-pointer hover:border-[#c5a880]/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[3/4] bg-black overflow-hidden relative">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c5a880] bg-black/80 px-3 py-1 border border-stone-800 backdrop-blur-sm">
                    {col.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mb-1">
                    {col.frenchSubtitle}
                  </div>
                  <h4 className="font-serif text-2xl text-stone-100 group-hover:text-[#c5a880] transition-colors mb-2">
                    {col.title}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-[#c5a880] group-hover:text-white transition-colors">
                  <span className="uppercase tracking-[0.2em] font-medium text-[11px]">
                    Explore {col.title}
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Olfactory Territories Banner */}
      <div className="border-t border-stone-800/80 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
            Sensory Cartography
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Olfactory Territories
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-2">
            Explore compositions grouped by mood, botanical family, and resonance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {families.map((fam) => (
            <div
              key={fam.name}
              onClick={() => {
                setFamilyFilter(fam.name);
                setGenderFilter('All');
                navigateTo('products');
              }}
              className="group relative bg-[#141418] border border-stone-800 overflow-hidden cursor-pointer hover:border-[#c5a880]/60 transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-black overflow-hidden relative">
                <img
                  src={fam.img}
                  alt={fam.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/50 to-transparent" />
              </div>
              <div className="p-5">
                <h4 className="font-serif text-xl text-stone-200 group-hover:text-[#c5a880] transition-colors mb-1">
                  {fam.name}
                </h4>
                <div className="text-[11px] text-[#c5a880] font-mono mb-2">
                  {fam.notes}
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                  {fam.desc}
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 group-hover:text-stone-300 transition-colors flex items-center gap-1.5 font-medium">
                  <span>Explore Territory</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
