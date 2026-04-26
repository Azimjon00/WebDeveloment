import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Validate and clear corrupted localStorage data
function validateLocalStorage() {
  const keys = [
    'shop_products',
    'shop_users',
    'shop_current_user',
    'shop_orders',
    'shop_cart',
    'shop_favorites',
    'cart_items',
  ];
  
  for (const key of keys) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        JSON.parse(data); // Validate JSON
      }
    } catch {
      console.warn(`Clearing corrupted localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  }
  
  // Initialize default users if not present
  if (!localStorage.getItem('shop_users')) {
    const defaultUsers = [
      { id: 1, name: 'Администратор', email: 'admin@shop.ru', password: 'admin123', role: 'admin' },
      { id: 2, name: 'Иван Петров', email: 'user@shop.ru', password: 'user123', role: 'user' },
    ];
    localStorage.setItem('shop_users', JSON.stringify(defaultUsers));
  }
}

validateLocalStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
