import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, BottleVolume, Order, PageView } from '../types';
import { PRODUCTS } from '../data/products';
import { generateOrderVerificationToken, isOrderConfirmedAndValid } from '../utils/whatsapp';

interface ShopContextType {
  activePage: PageView;
  selectedProductId: string | null;
  navigateTo: (page: PageView, productId?: string) => void;
  cart: CartItem[];
  wishlist: string[];
  selectedSamples: string[];
  orders: Order[];
  lastConfirmedOrder: Order | null;
  setLastConfirmedOrder: (order: Order | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  familyFilter: string;
  setFamilyFilter: (family: string) => void;
  genderFilter: string;
  setGenderFilter: (gender: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
  addToCart: (product: Product, volume: BottleVolume, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleSample: (sampleId: string) => void;
  discountCode: string;
  discountPercent: number;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  placeOrder: (shippingData: Order['shippingAddress'], giftNote?: string) => Order;
  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'maison_dor_cart_v1',
  WISHLIST: 'maison_dor_wishlist_v1',
  SAMPLES: 'maison_dor_samples_v1',
  ORDERS: 'maison_dor_orders_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('elixir-d-ambre');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Body Scroll Lock & Escape Key Handler
  useEffect(() => {
    const isAnyOpen =
      isCartOpen ||
      isWishlistOpen ||
      isCheckoutOpen ||
      isQuizOpen ||
      isOrdersModalOpen ||
      Boolean(quickViewProduct);

    if (isAnyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (quickViewProduct) setQuickViewProduct(null);
        else if (isOrdersModalOpen) setIsOrdersModalOpen(false);
        else if (isCheckoutOpen) setIsCheckoutOpen(false);
        else if (isQuizOpen) setIsQuizOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
        else if (isWishlistOpen) setIsWishlistOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isCartOpen,
    isWishlistOpen,
    isCheckoutOpen,
    isQuizOpen,
    isOrdersModalOpen,
    quickViewProduct,
  ]);

  // Discount
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // LocalStorage initialization with safety
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['rose-imperiale-oud'];
    } catch {
      return ['rose-imperiale-oud'];
    }
  });

  const [selectedSamples, setSelectedSamples] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAMPLES);
      return saved ? JSON.parse(saved) : ['sample-ambre'];
    } catch {
      return ['sample-ambre'];
    }
  });

  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isOrderConfirmedAndValid);
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAMPLES, JSON.stringify(selectedSamples));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [selectedSamples]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [orders]);

  // Navigation helper
  const navigateTo = (page: PageView, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Price calculation based on bottle volume
  const getProductPriceForVolume = (product: Product, volume: BottleVolume): number => {
    switch (volume) {
      case '50ml': return product.price50ml;
      case '100ml': return product.price100ml;
      case '200ml': return product.price200ml;
      default: return product.price50ml;
    }
  };

  // Cart operations
  const addToCart = (product: Product, volume: BottleVolume, quantity: number = 1) => {
    const itemKey = `${product.id}-${volume}`;
    const unitPrice = getProductPriceForVolume(product, volume);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemKey,
            productId: product.id,
            volume,
            quantity,
            price: unitPrice,
            product,
          },
        ];
      }
    });

    showToast(`Added ${product.name} (${volume}) to your cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const productName = product ? product.name : 'Perfume';

    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed ${productName} from your wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${productName} to your wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Complimentary Samples (up to 2 free samples per order)
  const toggleSample = (sampleId: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleId)) {
        return prev.filter((id) => id !== sampleId);
      }
      if (prev.length >= 2) {
        showToast('You may select up to 2 complimentary discovery vials');
        return [prev[1], sampleId];
      }
      return [...prev, sampleId];
    });
  };

  // Promo Code
  const applyDiscountCode = (code: string) => {
    const sanitized = code.trim().toUpperCase();
    if (sanitized === 'MAISON15' || sanitized === 'PARIS15') {
      setDiscountCode(sanitized);
      setDiscountPercent(15);
      showToast('Privilege Code applied: 15% VIP Reduction');
      return { success: true, message: 'Privilege code activated: 15% discount applied.' };
    } else if (sanitized === 'NOIR20') {
      setDiscountCode(sanitized);
      setDiscountPercent(20);
      showToast('Exclusive 20% Private Reserve discount applied');
      return { success: true, message: 'VIP code activated: 20% discount applied.' };
    } else {
      return { success: false, message: 'Invalid or expired privilege invitation code.' };
    }
  };

  // Financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscount = Math.round(cartSubtotal * (discountPercent / 100));
  // Complimentary express courier above $150
  const cartShipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Checkout order placement
  const placeOrder = (shippingAddress: Order['shippingAddress'], giftNote?: string): Order => {
    if (cart.length === 0) {
      throw new Error('Cannot place an order with an empty bag');
    }

    const orderNumber = `MDO-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = Date.now();
    const verificationToken = generateOrderVerificationToken(
      orderNumber,
      cartTotal,
      shippingAddress.email,
      timestamp
    );

    const newOrder: Order = {
      id: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      shippingAddress,
      giftNote: giftNote?.trim() ? giftNote.trim() : undefined,
      selectedSamples: [...selectedSamples],
      status: 'Confirmed',
      verificationToken,
      placedTimestamp: timestamp,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastConfirmedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        selectedProductId,
        navigateTo,
        cart,
        wishlist,
        selectedSamples,
        orders,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        familyFilter,
        setFamilyFilter,
        genderFilter,
        setGenderFilter,
        sortOption,
        setSortOption,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleSample,
        discountCode,
        discountPercent,
        applyDiscountCode,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartCount,
        wishlistCount,
        placeOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
