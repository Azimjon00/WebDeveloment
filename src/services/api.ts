import { User, Product } from '../types';
import { products as initialProducts } from '../data/products';

const USERS_KEY = 'shop_users';
const PRODUCTS_KEY = 'shop_products';
const CURRENT_USER_KEY = 'shop_current_user';

function safeParse(key: string, fallback: any): any {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    // Validate basic structure
    if (!parsed) return fallback;
    return parsed;
  } catch {
    // Corrupted data — clear and return fallback
    try { localStorage.removeItem(key); } catch {}
    return fallback;
  }
}

function getUsers(): User[] {
  const data = safeParse(USERS_KEY, null);
  if (!data || !Array.isArray(data)) {
    const defaultUsers: User[] = [
      { id: 1, name: 'Администратор', email: 'admin@shop.ru', password: 'admin123', role: 'admin' },
      { id: 2, name: 'Иван Петров', email: 'user@shop.ru', password: 'user123', role: 'user' },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return data;
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getProducts(): Product[] {
  const data = safeParse(PRODUCTS_KEY, null);
  if (!data || !Array.isArray(data)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return data;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// Orders functions removed — not used in current version

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<User | null> {
    await delay(500);
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  async register(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    await delay(500);
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    const newUser: User = { id: Date.now(), name, email, password, role: 'user' };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true, message: 'Регистрация успешна!' };
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    return safeParse(CURRENT_USER_KEY, null);
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  async updateProfile(user: User): Promise<User> {
    await delay(300);
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      saveUsers(users);
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },
};

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    await delay(400);
    return getProducts();
  },

  async getById(id: number): Promise<Product | undefined> {
    await delay(200);
    return getProducts().find(p => p.id === id);
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(400);
    const products = getProducts();
    const newProduct: Product = { ...product, id: Date.now(), isNew: true } as Product;
    products.unshift(newProduct);
    saveProducts(products);
    return newProduct;
  },

  async update(id: number, updates: Partial<Product>): Promise<Product> {
    await delay(400);
    const products = getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Товар не найден');
    products[idx] = { ...products[idx], ...updates };
    saveProducts(products);
    return products[idx];
  },

  async delete(id: number): Promise<void> {
    await delay(400);
    saveProducts(getProducts().filter(p => p.id !== id));
  },
};
