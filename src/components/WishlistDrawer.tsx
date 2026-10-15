import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigateTo,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101014] border-l border-stone-800 text-stone-200 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium">
                Personal Sanctuary
              </div>
              <h2 className="font-serif text-2xl text-[#f4efe6] font-light">
                Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-20 text-stone-500">
                <Heart size={36} className="mx-auto text-stone-700 mb-3" />
                <p className="font-serif text-2xl text-stone-300 mb-2">No Saved Fragrances</p>
                <p className="text-xs mb-6 max-w-xs mx-auto">
                  Click the heart icon on any flacon to curate your private sensory wishlist.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateTo('products');
                  }}
                  className="px-6 py-3 bg-[#c5a880] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#d8be96] transition-colors cursor-pointer"
                >
                  Browse Fragrances
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 bg-[#141418] border border-stone-800 relative group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigateTo('product-detail', product.id);
                      }}
                      className="w-20 h-24 bg-black overflow-hidden shrink-0 border border-stone-800 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] tracking-wider uppercase text-stone-400 mb-0.5">
                          {product.olfactoryFamily} · {product.concentration}
                        </div>
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateTo('product-detail', product.id);
                          }}
                          className="font-serif text-base text-[#f4efe6] hover:text-[#c5a880] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <div className="font-mono tabular-nums text-xs text-[#c5a880] mt-1">
                          From ${product.price50ml} (50ml)
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => {
                            addToCart(product, '50ml', 1);
                          }}
                          className="px-3 py-1.5 bg-[#c5a880] hover:bg-[#d8be96] text-black text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag size={12} />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-500 hover:text-stone-300 p-1 cursor-pointer"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-[#0e0e12]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => addToCart(p, '50ml', 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 bg-stone-900 border border-[#c5a880] text-[#f4efe6] hover:bg-[#c5a880] hover:text-black text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Move All To Flacon Bag</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateTo('wishlist');
                }}
                className="w-full mt-2.5 py-2.5 text-center text-[11px] text-stone-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer border border-stone-800 hover:border-stone-700 bg-stone-950/60"
              >
                View Full Wishlist Sanctuary
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
