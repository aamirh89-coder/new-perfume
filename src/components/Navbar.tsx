import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Package } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsQuizOpen,
    setIsOrdersModalOpen,
    orders,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleNavClick = (page: 'home' | 'products' | 'story') => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Editorial Announcement Banner (Single dismissible line) */}
      {!bannerDismissed && (
        <div className="bg-[#121214] border-b border-stone-800/60 py-2 px-4 text-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-stone-400 relative">
          <span className="text-[#c5a880] font-medium">Complimentary Courier Delivery</span> on orders over $150 · Two bespoke discovery vials included with each flacon
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white p-1 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-6 text links) - Zone 3 (Actions) */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#f4efe6] group-hover:text-[#c5a880] transition-colors uppercase">
                Maison d'Or
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.16em] uppercase text-stone-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#c5a880] transition-colors relative py-1 cursor-pointer ${
                activePage === 'home' ? 'text-[#c5a880] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#c5a880]' : ''
              }`}
            >
              Maison
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`hover:text-[#c5a880] transition-colors relative py-1 cursor-pointer ${
                activePage === 'products' ? 'text-[#c5a880] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#c5a880]' : ''
              }`}
            >
              The Flacons
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`hover:text-[#c5a880] transition-colors relative py-1 cursor-pointer ${
                activePage === 'story' ? 'text-[#c5a880] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#c5a880]' : ''
              }`}
            >
              Grasse Atelier
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-1.5 hover:text-[#c5a880] transition-colors cursor-pointer text-stone-300 hover:text-white"
            >
              <Sparkles size={13} className="text-[#c5a880]" />
              <span>Scent Diagnostic</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-5 text-stone-300">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center border-b border-[#c5a880] pb-1 animate-fadeIn">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activePage !== 'products') {
                        navigateTo('products');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (activePage !== 'products') navigateTo('products');
                      }
                    }}
                    placeholder="Search notes or flacons..."
                    className="bg-transparent text-xs text-stone-200 placeholder-stone-500 focus:outline-none w-32 sm:w-48 tracking-wider"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="text-stone-400 hover:text-white ml-1 cursor-pointer"
                    aria-label="Close search"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="hover:text-[#c5a880] transition-colors p-1.5 cursor-pointer"
                  aria-label="Open search"
                >
                  <Search size={19} strokeWidth={1.75} />
                </button>
              )}
            </div>

            {/* Orders / Patron History Archive */}
            <button
              onClick={() => setIsOrdersModalOpen(true)}
              className="hover:text-[#c5a880] transition-colors relative p-1.5 cursor-pointer"
              aria-label="View patron order history"
              title="Patron Order Archives"
            >
              <Package size={19} strokeWidth={1.75} />
              {orders.length > 0 && (
                <span className="absolute 1top-0 right-0 w-2 h-2 bg-[#c5a880] rounded-full" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hover:text-[#c5a880] transition-colors relative p-1.5 cursor-pointer"
              aria-label="View wishlist"
            >
              <Heart size={19} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-mono tabular-nums bg-[#c5a880] text-black font-semibold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-[#c5a880] transition-colors relative p-1.5 cursor-pointer"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag size={19} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-mono tabular-nums bg-[#c5a880] text-black font-semibold rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.15em] text-stone-400 font-mono tabular-nums">
                ({cartCount})
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-300 hover:text-white p-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0e] border-b border-stone-800 px-6 py-6 space-y-4 text-sm tracking-[0.18em] uppercase">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 text-stone-300 hover:text-[#c5a880]"
            >
              Maison
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="block w-full text-left py-2 text-stone-300 hover:text-[#c5a880]"
            >
              The Flacons
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="block w-full text-left py-2 text-stone-300 hover:text-[#c5a880]"
            >
              Grasse Atelier
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuizOpen(true);
              }}
              className="flex items-center gap-2 w-full text-left py-2 text-[#c5a880]"
            >
              <Sparkles size={14} />
              <span>Scent Diagnostic</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOrdersModalOpen(true);
              }}
              className="flex items-center gap-2 w-full text-left py-2 text-stone-400 hover:text-white border-t border-stone-800 pt-3"
            >
              <Package size={14} />
              <span>Patron Order Archives ({orders.length})</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
