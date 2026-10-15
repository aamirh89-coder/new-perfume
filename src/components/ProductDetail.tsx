import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, REVIEWS } from '../data/products';
import { BottleVolume } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, Sparkles, Droplets, Clock, Wind, Star } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedVolume, setSelectedVolume] = useState<BottleVolume>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  // Sync activeImage if product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedVolume('50ml');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, product.image]);

  const isWishlisted = isInWishlist(product.id);

  const currentPrice =
    selectedVolume === '50ml'
      ? product.price50ml
      : selectedVolume === '100ml'
      ? product.price100ml
      : product.price200ml;

  const galleryList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.olfactoryFamily === product.olfactoryFamily).slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  const handleBuyNow = () => {
    addToCart(product, selectedVolume, quantity);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Back to archive navigation */}
      <button
        onClick={() => navigateTo('products')}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#c5a880] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span>Back to The Archive</span>
      </button>

      {/* Main Two-Column View: Sticky Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-stone-800">
        
        {/* Gallery / Left Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-[#141418] border border-stone-800 overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-medium text-stone-200 bg-black/80 px-3 py-1 border border-stone-800">
                Maison Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail Gallery Strip */}
          {galleryList.length > 1 && (
            <div className="flex gap-3">
              {galleryList.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`w-20 h-24 bg-black overflow-hidden border transition-all cursor-pointer ${
                    activeImage === imgSrc
                      ? 'border-[#c5a880] ring-1 ring-[#c5a880]'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo angle ${idx + 1}`}
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Perfumer's Master Note Quote */}
          <div className="p-6 bg-[#141418] border border-stone-800/80">
            <div className="flex items-center gap-2 text-[#c5a880] text-xs uppercase tracking-widest mb-2">
              <Sparkles size={13} />
              <span>Nose Formulation Statement</span>
            </div>
            <p className="font-serif italic text-base sm:text-lg text-stone-300 leading-relaxed mb-3">
              "{product.story}"
            </p>
            <div className="text-xs text-stone-400 tracking-wider uppercase font-medium">
              — {product.perfumer}
            </div>
          </div>
        </div>

        {/* Purchase Module / Right Column */}
        <div className="lg:col-span-5 space-y-8 sticky top-28">
          
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-2 font-medium">
              <span>{product.collection}</span>
              <span aria-hidden="true">·</span>
              <span>{product.olfactoryFamily}</span>
              <span aria-hidden="true">·</span>
              <span>{product.gender}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f4efe6] font-light tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="text-xs text-stone-400 font-light italic mb-4">
              {product.frenchTitle}
            </div>

            {/* Rating & Review Count */}
            <div className="flex items-center gap-3 text-xs text-stone-400 mb-6">
              <div className="flex items-center text-[#c5a880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="font-mono tabular-nums text-stone-300 font-medium">{product.rating}</span>
              <span aria-hidden="true">·</span>
              <span className="underline decoration-stone-600 underline-offset-4">
                {product.reviewCount} Connoisseur Assessments
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-mono tabular-nums text-[#f4efe6] font-medium tracking-tight mb-6">
              ${currentPrice}
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-light mb-6">
              {product.description}
            </p>
          </div>

          {/* Volume Selection (50ml / 100ml / 200ml) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs tracking-wider uppercase text-stone-400">
              <span>Flacon Volume:</span>
              <span className="text-[#c5a880] font-medium">{selectedVolume} Extrait</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['50ml', '100ml', '200ml'] as BottleVolume[]).map((vol) => {
                const active = selectedVolume === vol;
                const price =
                  vol === '50ml' ? product.price50ml : vol === '100ml' ? product.price100ml : product.price200ml;
                return (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`py-3 px-2 border text-center transition-colors cursor-pointer ${
                      active
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-stone-800 bg-[#141418] text-stone-400 hover:border-stone-600 hover:text-stone-200'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wider font-medium">{vol}</div>
                    <div className="text-[11px] font-mono tabular-nums text-stone-400 mt-0.5">${price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-800 bg-[#141418] h-12 px-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-stone-400 hover:text-white px-2 py-1 cursor-pointer text-sm font-mono"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono tabular-nums text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-stone-400 hover:text-white px-2 py-1 cursor-pointer text-sm font-mono"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, selectedVolume, quantity)}
                className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 border border-[#c5a880] text-[#f4efe6] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={15} className="text-[#c5a880]" />
                <span>Add To Flacon Bag</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 flex items-center justify-center border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/10'
                    : 'border-stone-800 bg-[#141418] text-stone-400 hover:text-white hover:border-stone-600'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full h-12 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center cursor-pointer"
            >
              Order Immediate Delivery · ${currentPrice * quantity}
            </button>
          </div>

          {/* Complimentary Perks Accordion */}
          <div className="pt-4 border-t border-stone-800/80 space-y-3 text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-[#c5a880] shrink-0" />
              <span>Complimentary insured shipping & signature silk gift box.</span>
            </div>
            <div className="flex items-center gap-3">
              <Droplets size={16} className="text-[#c5a880] shrink-0" />
              <span>Includes two 2ml sample discovery vials of your choosing.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Fragrance Pyramid Breakdown Section */}
      <div className="py-16 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
            Olfactory Architecture
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light tracking-tight">
            The Fragrance Pyramid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Top Notes */}
          <div className="bg-[#141418] border border-stone-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#c5a880] font-medium">
                  Head Notes
                </span>
                <span className="text-[10px] text-stone-500 font-mono">0–30 min</span>
              </div>
              <h4 className="font-serif text-xl text-stone-200 mb-3">The First Impression</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                Volatile molecules that awaken the senses immediately upon skin contact.
              </p>
            </div>
            <div className="border-t border-stone-800/80 pt-3">
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.notes.top.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Heart Notes */}
          <div className="bg-[#141418] border border-[#c5a880]/30 p-6 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#c5a880]/5 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#c5a880] font-medium">
                  Heart Notes
                </span>
                <span className="text-[10px] text-stone-500 font-mono">2–6 hrs</span>
              </div>
              <h4 className="font-serif text-xl text-stone-200 mb-3">The True Personality</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                The emotional center of the composition, revealing deep botanical resins and blooms.
              </p>
            </div>
            <div className="border-t border-stone-800/80 pt-3">
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.notes.heart.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Base Notes */}
          <div className="bg-[#141418] border border-stone-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#c5a880] font-medium">
                  Base Notes
                </span>
                <span className="text-[10px] text-stone-500 font-mono">8–16+ hrs</span>
              </div>
              <h4 className="font-serif text-xl text-stone-200 mb-3">The Lasting Shadow</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                Heavy, tenacious molecular fixatives that meld with your personal body chemistry.
              </p>
            </div>
            <div className="border-t border-stone-800/80 pt-3">
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.notes.base.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Longevity, Sillage & Intensity Gauges */}
        <div className="mt-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-[#141418] border border-stone-800 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 text-[#c5a880] text-xs uppercase tracking-widest mb-1">
              <Clock size={14} />
              <span>Longevity</span>
            </div>
            <div className="font-serif text-xl text-stone-200">{product.longevity}</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 text-[#c5a880] text-xs uppercase tracking-widest mb-1">
              <Wind size={14} />
              <span>Sillage</span>
            </div>
            <div className="font-serif text-xl text-stone-200">{product.sillage}</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 text-[#c5a880] text-xs uppercase tracking-widest mb-1">
              <Sparkles size={14} />
              <span>Concentration Intensity</span>
            </div>
            <div className="font-serif text-xl text-stone-200 flex items-center justify-center gap-1.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < product.intensityScore
                      ? 'bg-[#c5a880]'
                      : 'bg-stone-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connoisseur Reviews for this Fragrance */}
      {productReviews.length > 0 && (
        <div className="py-16 border-b border-stone-800">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-medium">
              Client Testimonials
            </div>
            <h3 className="font-serif text-3xl text-[#f4efe6] font-light">
              Impressions & Experiences
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {productReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#141418] border border-stone-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#c5a880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">{rev.date}</span>
                </div>
                <h4 className="font-serif text-lg text-stone-200 mb-2">{rev.title}</h4>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] tracking-wider uppercase text-stone-500">
                  {rev.author} · {rev.location} · <span className="text-stone-400">Verified Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Creations */}
      <div className="pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-1 font-medium">
              Olfactory Harmony
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
              Complementary Flacons
            </h3>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs uppercase tracking-[0.16em] text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer"
          >
            View All ({PRODUCTS.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {fallbackRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
