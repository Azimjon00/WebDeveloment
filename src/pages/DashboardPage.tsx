import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useProductStore as useFavStore } from '../store/productStore';
import { useEffect } from 'react';
import Loading from '../components/Loading';

const DashboardPage = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const { getItemCount } = useCartStore();
  const { favorites } = useFavStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <Loading text="Загрузка дашборда..." />;

  const totalProducts = products.length;
  const avgPrice = totalProducts > 0 ? Math.round(products.reduce((s, p) => s + p.price, 0) / totalProducts) : 0;
  const avgRating = totalProducts > 0 ? (products.reduce((s, p) => s + p.rating, 0) / totalProducts).toFixed(1) : '0';
  const inStockCount = products.filter((p) => p.inStock).length;

  const categoryStats = ['Одежда', 'Аксессуары', 'Обувь', 'Верхняя одежда'].map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
    percentage: totalProducts > 0 ? Math.round((products.filter((p) => p.category === cat).length / totalProducts) * 100) : 0,
  }));

  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Дашборд</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Всего товаров', value: totalProducts, icon: '📦', color: 'from-blue-500 to-blue-600' },
          { label: 'В наличии', value: inStockCount, icon: '✅', color: 'from-green-500 to-green-600' },
          { label: 'Средняя цена', value: `${avgPrice.toLocaleString('ru-RU')} ₽`, icon: '💰', color: 'from-yellow-500 to-yellow-600' },
          { label: 'Средний рейтинг', value: avgRating, icon: '⭐', color: 'from-purple-500 to-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Распределение по категориям</h3>
          <div className="space-y-4">
            {categoryStats.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{cat.name}</span>
                  <span className="text-gray-500">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/catalog" className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-xl text-center transition-colors">
              <span className="text-2xl block mb-2">🛍️</span>
              <span className="text-sm font-medium">Каталог</span>
            </Link>
            <Link to="/create" className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-xl text-center transition-colors">
              <span className="text-2xl block mb-2">➕</span>
              <span className="text-sm font-medium">Добавить</span>
            </Link>
            <Link to="/favorites" className="bg-red-50 hover:bg-red-100 text-red-700 p-4 rounded-xl text-center transition-colors">
              <span className="text-2xl block mb-2">❤️</span>
              <span className="text-sm font-medium">Избранное ({favorites.length})</span>
            </Link>
            <Link to="/cart" className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-xl text-center transition-colors">
              <span className="text-2xl block mb-2">🛒</span>
              <span className="text-sm font-medium">Корзина ({getItemCount()})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mt-8">
        <h3 className="font-semibold text-gray-900 mb-6">Популярные товары</h3>
        <div className="space-y-3">
          {topProducts.map((product, idx) => (
            <Link key={product.id} to={`/product/${product.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-lg font-bold text-gray-300 w-8">{idx + 1}</span>
              <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{product.title}</p>
                <p className="text-xs text-gray-500">{product.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{product.price.toLocaleString('ru-RU')} ₽</p>
                <p className="text-xs text-gray-500">{product.reviews} отзывов</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
