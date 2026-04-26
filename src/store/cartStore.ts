import { create } from 'zustand';
import { Product, CartItem } from '../types';

// Load cart from localStorage
const loadCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem('cart_items');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart_items', JSON.stringify(items));
  } catch {
    // ignore
  }
};

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addToCart: (product: Product, size: string, color: string, quantity = 1) => {
    set((state) => {
      const existingIdx = state.items.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      let newItems: CartItem[];
      if (existingIdx !== -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...state.items, { product, quantity, size, color }];
      }
      saveCart(newItems);
      return { items: newItems };
    });
  },

  removeFromCart: (productId: number, size: string, color: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
      saveCart(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (productId: number, size: string, color: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      saveCart(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cart_items');
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
