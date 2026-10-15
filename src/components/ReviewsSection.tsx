import React from 'react';
import { REVIEWS, PRODUCTS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-800">
      
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
          Connoisseur Dispatches
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe6] font-light tracking-tight mb-4">
          Voices From Our Private Circle
        </h2>
        <p className="text-stone-400 text-sm font-light leading-relaxed">
          Unfiltered reflections from collectors, perfumers, and patrons across Paris, London, Zurich, and New York.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((review) => {
          const product = PRODUCTS.find((p) => p.id === review.productId);
          return (
            <div
              key={review.id}
              className="bg-[#141418] border border-stone-800 p-6 flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#c5a880]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">{review.date}</span>
                </div>

                {product && (
                  <div className="text-[11px] text-[#c5a880] uppercase tracking-wider font-medium mb-2">
                    {product.name}
                  </div>
                )}

                <h3 className="font-serif text-lg text-stone-200 mb-3 leading-snug">
                  "{review.title}"
                </h3>

                <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <div>
                  <div className="text-stone-200 font-medium">{review.author}</div>
                  <div className="text-stone-500">{review.location}</div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-[#c5a880] text-[10px] uppercase tracking-wider">
                    <CheckCircle size={12} />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
