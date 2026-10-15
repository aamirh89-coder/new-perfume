import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Check } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    matchedFamily: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'The Atmosphere',
    subtitle: 'In which setting does your spirit feel most potent?',
    options: [
      {
        label: 'Candlelit Nocturne',
        description: 'Dark opera velvet, whispered secrets, and midnight rainfall.',
        matchedFamily: 'Smoky Leather',
      },
      {
        label: 'Sunlit Mediterranean Terrace',
        description: 'Morning citrus breezes, turquoise waters, and fresh white linen.',
        matchedFamily: 'Solar Citrus',
      },
      {
        label: 'Royal Solarium & Garden',
        description: 'Centifolia roses blooming under dawn dew and exotic incense.',
        matchedFamily: 'Floral Oriental',
      },
      {
        label: 'Quiet Atelier & Library',
        description: 'Aged cedarwood shelves, leather-bound folios, and calming earth.',
        matchedFamily: 'Aromatic Vetiver',
      },
      {
        label: 'Gilded Salon & Amber Hearth',
        description: 'Crackling fire, spiced resins, and dark Madagascar vanilla beans.',
        matchedFamily: 'Woody Amber',
      },
    ],
  },
  {
    id: 2,
    title: 'The Olfactory Note',
    subtitle: 'Which raw ingredient calls to your instinct?',
    options: [
      {
        label: 'Cambodian Oud & Damask Rose',
        description: 'Regal, multi-layered, intoxicating woods.',
        matchedFamily: 'Floral Oriental',
      },
      {
        label: 'Aged Labdanum & Siamese Benzoin',
        description: 'Warm, molten honeyed resin with sacred smoke.',
        matchedFamily: 'Woody Amber',
      },
      {
        label: 'Amalfi Bergamot & Italian Neroli',
        description: 'Crystalline, effervescent, sun-drenched blossoms.',
        matchedFamily: 'Solar Citrus',
      },
      {
        label: 'Haitian Vetiver & Mysore Sandalwood',
        description: 'Crisp green cardamom, roots, and buttery wood.',
        matchedFamily: 'Aromatic Vetiver',
      },
      {
        label: 'Tuscan Leather & Birch Tar',
        description: 'Shadowy, assertive, and commanding authority.',
        matchedFamily: 'Smoky Leather',
      },
    ],
  },
  {
    id: 3,
    title: 'The Sillage & Presence',
    subtitle: 'How should your fragrance announce your presence?',
    options: [
      {
        label: 'Unapologetic & Enveloping',
        description: 'Leaves a hypnotic wake that lingers in the room for hours.',
        matchedFamily: 'Woody Amber',
      },
      {
        label: 'Radiant & Effortless',
        description: 'A sparkling halo of vitality and welcoming warmth.',
        matchedFamily: 'Solar Citrus',
      },
      {
        label: 'Subtle & Intellectual',
        description: 'A quiet signature noticeable only to those invited close.',
        matchedFamily: 'Aromatic Vetiver',
      },
      {
        label: 'Majestic & Bewitching',
        description: 'An indelible, aristocratic impression of regal elegance.',
        matchedFamily: 'Floral Oriental',
      },
    ],
  },
];

export const ScentQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, navigateTo } = useShop();

  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  if (!isQuizOpen) return null;

  const handleSelectOption = (questionId: number, matchedFamily: string) => {
    const updated = { ...selectedAnswers, [questionId]: matchedFamily };
    setSelectedAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate matching fragrance
      const familyCounts: Record<string, number> = {};
      Object.values(updated).forEach((fam) => {
        familyCounts[fam] = (familyCounts[fam] || 0) + 1;
      });

      let topFamily = Object.keys(familyCounts)[0];
      let maxCount = 0;
      Object.entries(familyCounts).forEach(([fam, count]) => {
        if (count > maxCount) {
          maxCount = count;
          topFamily = fam;
        }
      });

      const matched =
        PRODUCTS.find((p) => p.olfactoryFamily === topFamily) ||
        PRODUCTS.find((p) => p.id === 'elixir-d-ambre') ||
        PRODUCTS[0];

      setRecommendedProduct(matched);
      setStep(QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedAnswers({});
    setRecommendedProduct(null);
  };

  const handleClose = () => {
    setIsQuizOpen(false);
    handleReset();
  };

  const currentQ = QUESTIONS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#101014] border border-stone-800 max-w-2xl w-full text-stone-200 overflow-hidden shadow-2xl z-10 my-8 p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white p-2 transition-colors cursor-pointer"
          aria-label="Close quiz"
        >
          <X size={20} />
        </button>

        {step < QUESTIONS.length ? (
          <div>
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-3 mb-8">
              <span className="text-[#c5a880] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Diagnostic Consultation</span>
              </span>
              <span className="font-mono">Question {step + 1} of {QUESTIONS.length}</span>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-widest text-[#c5a880] mb-2 font-medium">
                {currentQ.title}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light leading-snug">
                {currentQ.subtitle}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt.matchedFamily)}
                  className="w-full text-left p-4 bg-[#141418] border border-stone-800 hover:border-[#c5a880] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-lg text-[#f4efe6] group-hover:text-[#c5a880] transition-colors">
                      {opt.label}
                    </span>
                    <ArrowRight size={14} className="text-stone-600 group-hover:text-[#c5a880] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Back button if past step 0 */}
            {step > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-300 cursor-pointer"
                >
                  ← Previous Question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation Result */
          recommendedProduct && (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#c5a880]/20 text-[#c5a880] mx-auto flex items-center justify-center border border-[#c5a880]/30">
                <Check size={24} />
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-1 font-medium">
                  Your Signature Olfactory Identity
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe6] font-light">
                  {recommendedProduct.name}
                </h3>
                <div className="text-xs text-stone-400 italic mt-1">
                  {recommendedProduct.frenchTitle}
                </div>
              </div>

              {/* Product Match Card */}
              <div className="bg-[#141418] border border-stone-800 p-6 flex flex-col sm:flex-row items-center gap-6 text-left">
                <div className="w-32 h-36 bg-black overflow-hidden shrink-0 border border-stone-800">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="text-[11px] tracking-wider uppercase text-[#c5a880]">
                    {recommendedProduct.olfactoryFamily} · {recommendedProduct.concentration}
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    {recommendedProduct.description}
                  </p>
                  <div className="text-xs text-stone-400 pt-1">
                    <strong>Key Resins:</strong> {recommendedProduct.notes.heart.join(', ')}
                  </div>
                  <div className="font-mono tabular-nums text-lg text-white font-medium">
                    ${recommendedProduct.price50ml} (50ml)
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    addToCart(recommendedProduct, '50ml', 1);
                    handleClose();
                  }}
                  className="flex-1 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>Claim Your Flacon · ${recommendedProduct.price50ml}</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('product-detail', recommendedProduct.id);
                  }}
                  className="sm:w-auto px-6 py-4 bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#c5a880] transition-colors cursor-pointer uppercase tracking-wider"
              >
                <RotateCcw size={12} />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
};
