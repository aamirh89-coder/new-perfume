import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedHome } from './components/FeaturedHome';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { StoryView } from './components/StoryView';
import { CartView } from './components/CartView';
import { WishlistView } from './components/WishlistView';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { OrdersModal } from './components/OrdersModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4efe6] flex flex-col font-sans selection:bg-[#c5a880]/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <FeaturedHome />
            <BrandStory />
            <ReviewsSection />
            <Newsletter />
          </>
        )}

        {activePage === 'products' && (
          <ProductCatalog />
        )}

        {activePage === 'product-detail' && (
          <ProductDetail />
        )}

        {activePage === 'story' && (
          <StoryView />
        )}

        {activePage === 'cart' && (
          <CartView />
        )}

        {activePage === 'wishlist' && (
          <WishlistView />
        )}
      </main>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <ScentQuizModal />
      <OrdersModal />
      <Toast />

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
