export type OlfactoryFamily = 
  | 'Woody Amber' 
  | 'Floral Oriental' 
  | 'Solar Citrus' 
  | 'Smoky Leather' 
  | 'Gourmand' 
  | 'Aromatic Vetiver';

export type FragranceGender = 'Unisex' | 'For Her' | 'For Him';

export type FragranceConcentration = 'Extrait de Parfum' | 'Eau de Parfum Intense' | 'Eau de Parfum';

export type BottleVolume = '50ml' | '100ml' | '200ml';

export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  frenchTitle: string;
  subtitle: string;
  collection: 'Private Reserve' | 'Signature Flacons' | 'Les Extraits';
  gender: FragranceGender;
  olfactoryFamily: OlfactoryFamily;
  concentration: FragranceConcentration;
  price50ml: number;
  price100ml: number;
  price200ml: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  description: string;
  story: string;
  notes: OlfactoryNotes;
  longevity: string;
  sillage: string;
  perfumer: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  intensityScore: number; // 1-5
}

export interface CartItem {
  id: string; // unique item key: productId-volume
  productId: string;
  volume: BottleVolume;
  quantity: number;
  price: number;
  product: Product;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  giftNote?: string;
  selectedSamples: string[];
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  verificationToken?: string;
  placedTimestamp?: number;
}

export type PageView = 'home' | 'products' | 'product-detail' | 'cart' | 'wishlist' | 'story' | 'quiz';
