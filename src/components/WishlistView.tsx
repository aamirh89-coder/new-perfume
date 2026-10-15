import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, addToCart, navigateTo } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigateTo('products')}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Continue Exploring Flacons</span>
        </button>

        <div className="text-xs uppercase tracking-widest text-[#c5a880] font-medium">
          Personal Sensory Archive
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-stone-800 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-1 font-medium">
            Curated Flacons
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-light">
            Wishlist Sanctuary
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-400 font-mono">
            {wishlistedProducts.length} Saved {wishlistedProducts.length === 1 ? 'Flacon' : 'Flacons'}
          </span>
          {wishlistedProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, '50ml', 1));
              }}
              className="px-4 py-2 bg-stone-900 border border-[#c5a880] hover:bg-[#c5a880] hover:text-black text-stone-200 text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={13} />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Items Grid */}
      {wishlistedProducts.length === 0 ? (
        <div className="py-24 text-center bg-[#141418] border border-stone-800 max-w-2xl mx-auto p-12 space-y-6">
          <Heart size={48} className="mx-auto text-stone-700" />
          <h2 className="font-serif text-3xl text-stone-200">No Saved Fragrances</h2>
          <p className="text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
            Your personal fragrance sanctuary is currently empty. Tap the heart symbol on any flacon in the archive to curate your private collection.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="px-8 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore The Collection</span>
            <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
