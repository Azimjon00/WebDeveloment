// Initialize default data in localStorage if not present
export function initData() {
  try {
    if (!localStorage.getItem('shop_products')) {
      // Don't use await — just return and let the store fetch products
    }
    
    if (!localStorage.getItem('shop_users')) {
      const defaultUsers = [
        { id: 1, name: 'Администратор', email: 'admin@shop.ru', password: 'admin123', role: 'admin' },
        { id: 2, name: 'Иван Петров', email: 'user@shop.ru', password: 'user123', role: 'user' },
      ];
      localStorage.setItem('shop_users', JSON.stringify(defaultUsers));
    }
  } catch {
    // ignore
  }
}
