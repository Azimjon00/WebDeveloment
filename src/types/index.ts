export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  stock: number;
  brand: string;
  isNew?: boolean;
  isSale?: boolean;
  isFavorite?: boolean;
  owner?: number;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
export type PageType = 'home' | 'list' | 'details' | 'login' | 'register' | 'create' | 'edit' | 'profile' | 'dashboard' | 'favorites' | 'my-items' | 'admin' | 'cart';
