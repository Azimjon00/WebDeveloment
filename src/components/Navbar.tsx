import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = getItemCount();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/favorites', label: 'Избранное' },
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-warm-800 text-warm-200 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Бесплатная доставка от 5 000 ₽</span>
          <div className="hidden sm:flex gap-4">
            <span>📞 +7 (999) 123-45-67</span>
            <span>✉️ info@stylebeauty.ru</span>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-lg shadow-lg shadow-primary-400/30 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <div>
                <span className="text-xl font-bold text-warm-800 tracking-tight">
                  Style<span className="text-gradient">Beauty</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-warm-600 hover:text-primary-500 hover:bg-warm-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        isActive('/admin')
                          ? 'bg-accent-50 text-accent-600'
                          : 'text-warm-600 hover:text-accent-500 hover:bg-warm-50'
                      }`}
                    >
                      ⚙️ Админ
                    </Link>
                  )}
                  <Link
                    to="/my-items"
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      isActive('/my-items')
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-warm-600 hover:text-primary-500 hover:bg-warm-50'
                    }`}
                  >
                    Мои товары
                  </Link>
                </>
              )}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 text-warm-500 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-warm-200">
                  <Link to="/profile" className="group flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-shadow">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-warm-400 hover:text-primary-500 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-warm-200">
                  <Link
                    to="/login"
                    className="text-sm text-warm-600 hover:text-primary-500 font-medium transition-colors px-3 py-2"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm bg-primary-500 text-white px-5 py-2.5 rounded-full hover:bg-primary-600 transition-all font-medium shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
                  >
                    Регистрация
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-warm-600 hover:bg-warm-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-warm-100 space-y-1 animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-warm-600 hover:bg-warm-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm text-warm-600 hover:bg-warm-50 rounded-xl"
              >
                🛒 Корзина ({cartCount})
              </Link>
              {isAuthenticated && (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm text-warm-600 hover:bg-warm-50 rounded-xl">
                      ⚙️ Админ-панель
                    </Link>
                  )}
                  <Link to="/my-items" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm text-warm-600 hover:bg-warm-50 rounded-xl">
                    Мои товары
                  </Link>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm text-warm-600 hover:bg-warm-50 rounded-xl">
                    Профиль
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl font-medium">
                    Выйти
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-3 px-4">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm text-warm-600 font-medium py-2.5 border-2 border-warm-200 rounded-full">
                    Войти
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm bg-primary-500 text-white py-2.5 rounded-full font-medium">
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
