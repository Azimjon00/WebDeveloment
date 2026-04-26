import { create } from 'zustand';
import { Product } from '../types';
import { productsApi } from '../services/api';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedSubcategory: string;
  sortOption: SortOption;
  priceRange: [number, number];
  favorites: number[];
  toggleFavorite: (id: number) => void;

  // Actions
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSubcategory: (subcategory: string) => void;
  setSortOption: (option: SortOption) => void;
  setPriceRange: (range: [number, number]) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  createProduct: (product: Omit<Product, 'id'>) => Promise<Product | null>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'Все',
  selectedSubcategory: '',
  sortOption: 'newest',
  priceRange: [0, 100000],
  favorites: [],

  toggleFavorite: (id: number) => {
    set((state) => {
      const isFav = state.favorites.includes(id);
      return {
        favorites: isFav ? state.favorites.filter((fid) => fid !== id) : [...state.favorites, id],
      };
    });
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await productsApi.getAll();
      set({ products, filteredProducts: products, loading: false });
    } catch {
      set({ error: 'Не удалось загрузить товары', loading: false });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCategory: (category: string) => set({ selectedCategory: category }),
  setSubcategory: (subcategory: string) => set({ selectedSubcategory: subcategory }),
  setSortOption: (option: SortOption) => set({ sortOption: option }),
  setPriceRange: (range: [number, number]) => set({ priceRange: range }),

  applyFilters: () => {
    const { products, searchQuery, selectedCategory, selectedSubcategory, sortOption, priceRange } = get();
    let filtered = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory && selectedCategory !== 'Все') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    set({ filteredProducts: filtered });
  },

  resetFilters: () => {
    const { products } = get();
    set({
      searchQuery: '',
      selectedCategory: 'Все',
      selectedSubcategory: '',
      sortOption: 'newest',
      priceRange: [0, 100000],
      filteredProducts: products,
    });
  },

  createProduct: async (product: Omit<Product, 'id'>) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await productsApi.create(product);
      set((state) => ({
        products: [newProduct, ...state.products],
        loading: false,
      }));
      get().applyFilters();
      return newProduct;
    } catch {
      set({ error: 'Не удалось создать товар', loading: false });
      return null;
    }
  },

  updateProduct: async (id: number, updates: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      const updated = await productsApi.update(id, updates);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
        loading: false,
      }));
      get().applyFilters();
      return true;
    } catch {
      set({ error: 'Не удалось обновить товар', loading: false });
      return false;
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await productsApi.delete(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
      get().applyFilters();
      return true;
    } catch {
      set({ error: 'Не удалось удалить товар', loading: false });
      return false;
    }
  },
}));
