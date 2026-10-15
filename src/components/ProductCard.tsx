import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useShop();

  const [imageLoaded, setImageLoaded] = useState(true);
  const [selectedVolume, setSelectedVolume] = useState<'50ml' | '100ml'>('50ml');
  const isWishlisted = isInWishlist(product.id);

  const currentPrice = selectedVolume === '50ml' ? product.price50ml : product.price100ml;

  return (
    <div className="group relative flex flex-col bg-[#141418] border border-stone-800/80 hover:border-[#c5a880]/50 transition-all duration-300">
      
      {/* Visual Anchor (Image Container ~70% card height) */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#101014] cursor-pointer"
        onClick={() => navigateTo('product-detail', product.id)}
      >
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageLoaded(false)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-600 text-xs uppercase tracking-widest">
            {product.name}
          </div>
        )}

        {/* Subtle Single Text Tag */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase font-medium text-stone-200 bg-black/75 px-2.5 py-1 border border-stone-800">
            Best Seller
          </div>
        )}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase font-medium text-[#c5a880] bg-black/75 px-2.5 py-1 border border-[#c5a880]/30">
            New Millésime
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-none bg-black/70 backdrop-blur-sm border transition-colors cursor-pointer ${
            isWishlisted
              ? 'border-[#c5a880] text-[#c5a880]'
              : 'border-stone-800 text-stone-300 hover:text-white hover:border-stone-600'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-stone-950/90 hover:bg-black text-[#f4efe6] text-[11px] uppercase tracking-[0.18em] border border-stone-700 hover:border-[#c5a880] transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata line with typographic separators & rating */}
          <div className="flex items-center justify-between text-[11px] tracking-[0.16em] uppercase text-stone-400 mb-2">
            <div className="flex items-center gap-1.5 truncate">
              <span>{product.olfactoryFamily}</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>{product.gender}</span>
            </div>
            <div className="flex items-center gap-1 text-[#c5a880] font-mono shrink-0 pl-1" title={`${product.rating} out of 5 stars (${product.reviewCount} reviews)`}>
              <Star size={11} fill="#c5a880" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-serif text-xl sm:text-2xl text-[#f4efe6] hover:text-[#c5a880] transition-colors cursor-pointer tracking-wide mb-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Notes preview */}
          <p className="text-xs text-stone-400 font-light line-clamp-1 mb-4">
            {product.notes.top[0]} · {product.notes.heart[0]} · {product.notes.base[0]}
          </p>
        </div>

        {/* Volume selector & Purchase Row */}
        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVolume('50ml');
                }}
                className={`text-[10px] tracking-wider uppercase px-1.5 py-0.5 border cursor-pointer ${
                  selectedVolume === '50ml'
                    ? 'border-[#c5a880] text-[#c5a880]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                50ml
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVolume('100ml');
                }}
                className={`text-[10px] tracking-wider uppercase px-1.5 py-0.5 border cursor-pointer ${
                  selectedVolume === '100ml'
                    ? 'border-[#c5a880] text-[#c5a880]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                100ml
              </button>
            </div>
            {/* Price with tabular numerals */}
            <span className="font-mono tabular-nums text-base text-[#f4efe6] font-medium tracking-tight">
              ${currentPrice}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, selectedVolume, 1);
            }}
            className="px-3.5 py-2.5 bg-stone-900 hover:bg-[#c5a880] hover:text-black text-stone-200 border border-stone-700 hover:border-[#c5a880] text-[11px] uppercase tracking-[0.16em] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={13} />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
