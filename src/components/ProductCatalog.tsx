import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RotateCcw, Search, DollarSign } from 'lucide-react';

const FAMILIES = [
  'All',
  'Woody Amber',
  'Floral Oriental',
  'Solar Citrus',
  'Smoky Leather',
  'Gourmand',
  'Aromatic Vetiver',
];

const GENDERS = ['All', 'Unisex', 'For Her', 'For Him'];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-200', label: 'Under $200' },
  { id: '200-230', label: '$200 – $230' },
  { id: 'above-230', label: '$230 & Above' },
];

export const ProductCatalog: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    familyFilter,
    setFamilyFilter,
    genderFilter,
    setGenderFilter,
    sortOption,
    setSortOption,
  } = useShop();

  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search matching (name, description, or any note)
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFrench = product.frenchTitle.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFamily = product.olfactoryFamily.toLowerCase().includes(query);
        const allNotes = [
          ...product.notes.top,
          ...product.notes.heart,
          ...product.notes.base,
        ].map((n) => n.toLowerCase());
        const matchesNotes = allNotes.some((n) => n.includes(query));

        if (!matchesName && !matchesFrench && !matchesDesc && !matchesFamily && !matchesNotes) {
          return false;
        }
      }

      // Family filter
      if (familyFilter !== 'All' && product.olfactoryFamily !== familyFilter) {
        return false;
      }

      // Gender filter
      if (genderFilter !== 'All' && product.gender !== genderFilter) {
        return false;
      }

      // Price filter (based on 50ml entry price)
      if (priceRange === 'under-200' && product.price50ml >= 200) {
        return false;
      }
      if (priceRange === '200-230' && (product.price50ml < 200 || product.price50ml > 230)) {
        return false;
      }
      if (priceRange === 'above-230' && product.price50ml <= 230) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price50ml - b.price50ml;
        case 'price-desc':
          return b.price50ml - a.price50ml;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'featured':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });
  }, [searchQuery, familyFilter, genderFilter, priceRange, sortOption]);

  const hasActiveFilters =
    familyFilter !== 'All' ||
    genderFilter !== 'All' ||
    priceRange !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setFamilyFilter('All');
    setGenderFilter('All');
    setPriceRange('all');
    setSearchQuery('');
    setSortOption('featured');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase text-[#c5a880] mb-3 font-medium">
          <span>The Atelier Flacons</span>
          <span aria-hidden="true">·</span>
          <span>Extraits de Parfum</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light tracking-tight mb-4 text-balance">
          The Complete Olfactory Archive
        </h2>
        <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
          Each formula is compounded with botanical absolutes and rare resins. Blended slowly in small batches for uncompromised complexity.
        </p>
      </div>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="mb-10 space-y-6">
        
        {/* Top Control Bar: Search, Counter & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by note (e.g. oud, bergamot, iris)..."
              className="w-full bg-[#141418] border border-stone-800 pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count & Active Filters Indicator */}
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span className="font-mono tabular-nums">
              Showing {filteredProducts.length} of {PRODUCTS.length} creations
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-[#c5a880] hover:text-[#e4ccab] transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-stone-500 whitespace-nowrap">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#141418] border border-stone-800 px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Connoisseur Rating</option>
              <option value="newest">Latest Millésime</option>
            </select>
          </div>

        </div>

        {/* Olfactory Family Segmented Controls (Interactive Category Filter Buttons) */}
        <div className="flex flex-col gap-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium">
            Category / Olfactory Family:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {FAMILIES.map((family) => {
              const active = familyFilter === family;
              return (
                <button
                  key={family}
                  onClick={() => setFamilyFilter(family)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#c5a880] text-black border-[#c5a880] font-medium'
                      : 'bg-[#141418] text-stone-300 border-stone-800 hover:border-stone-600'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender / Collection Preference & Price Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Gender / Aura Filter */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              Aura & Collection:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {GENDERS.map((gender) => {
                const active = genderFilter === gender;
                return (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender)}
                    className={`px-3 py-1 text-xs tracking-wider uppercase transition-colors cursor-pointer border ${
                      active
                        ? 'bg-stone-200 text-black border-stone-200 font-medium'
                        : 'bg-[#141418] text-stone-400 border-stone-800/80 hover:border-stone-600 hover:text-stone-200'
                    }`}
                  >
                    {gender}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Filtering */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium flex items-center gap-1">
              <DollarSign size={12} className="text-[#c5a880]" />
              <span>Price Range (50ml Flacon):</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {PRICE_RANGES.map((pr) => {
                const active = priceRange === pr.id;
                return (
                  <button
                    key={pr.id}
                    onClick={() => setPriceRange(pr.id)}
                    className={`px-3 py-1 text-xs tracking-wider uppercase transition-colors cursor-pointer border ${
                      active
                        ? 'bg-[#c5a880]/20 text-[#c5a880] border-[#c5a880] font-medium'
                        : 'bg-[#141418] text-stone-400 border-stone-800/80 hover:border-stone-600 hover:text-stone-200'
                    }`}
                  >
                    {pr.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#141418] border border-stone-800 p-8 max-w-lg mx-auto">
          <SlidersHorizontal size={32} className="mx-auto text-stone-600 mb-4" />
          <h3 className="font-serif text-2xl text-stone-200 mb-2">No Fragrances Match Criteria</h3>
          <p className="text-xs text-stone-400 leading-relaxed mb-6">
            We couldn't find creations matching your current search and filter selections. Try adjusting your parameters or explore our complete catalog.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#c5a880] text-black text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#d8be96] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
