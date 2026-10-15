import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BottleVolume } from '../types';
import { X, ShoppingBag, Heart, ArrowRight, Star } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
  } = useShop();

  const [selectedVolume, setSelectedVolume] = useState<BottleVolume>('50ml');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  const currentPrice =
    selectedVolume === '50ml'
      ? product.price50ml
      : selectedVolume === '100ml'
      ? product.price100ml
      : product.price200ml;

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    handleClose();
    navigateTo('product-detail', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#121216] border border-stone-800 max-w-3xl w-full text-stone-200 overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white p-2 bg-black/40 border border-stone-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="relative aspect-[4/5] bg-black">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-black/70 px-2.5 py-1 border border-stone-800 text-stone-300">
              {product.collection}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Metadata */}
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#c5a880] mb-1 font-medium">
                {product.olfactoryFamily} · {product.concentration}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light mb-1">
                {product.name}
              </h3>

              <div className="text-xs text-stone-400 italic mb-3">
                {product.frenchTitle}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
                <div className="flex text-[#c5a880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="font-mono tabular-nums">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="font-mono tabular-nums text-2xl text-white font-medium mb-4">
                ${currentPrice}
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Fragrance Notes Highlights */}
              <div className="border-t border-stone-800/80 pt-3 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#c5a880] mb-1.5 font-medium">
                  Pyramid Highlights
                </div>
                <div className="text-xs text-stone-300 space-y-1">
                  <div><strong>Top:</strong> {product.notes.top.join(', ')}</div>
                  <div><strong>Heart:</strong> {product.notes.heart.join(', ')}</div>
                  <div><strong>Base:</strong> {product.notes.base.join(', ')}</div>
                </div>
              </div>

              {/* Volume Options */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] uppercase tracking-wider text-stone-400">
                  Select Volume:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['50ml', '100ml', '200ml'] as BottleVolume[]).map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`py-2 text-xs border text-center transition-colors cursor-pointer ${
                        selectedVolume === vol
                          ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                          : 'border-stone-800 bg-[#16161a] text-stone-400 hover:text-white'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(product, selectedVolume, quantity);
                    handleClose();
                  }}
                  className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>Add To Bag · ${currentPrice}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 border flex items-center justify-center transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/10'
                      : 'border-stone-800 text-stone-400 hover:text-white'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleFullDetail}
                className="w-full text-center text-xs text-stone-400 hover:text-[#c5a880] transition-colors py-1 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <span>View Full Olfactory Profile & Story</span>
                <ArrowRight size={12} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
