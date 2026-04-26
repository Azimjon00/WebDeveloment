import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import EmptyState from '../components/EmptyState';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } = useCartStore();

  const deliveryFee = getTotal() >= 5000 ? 0 : 299;
  const total = getTotal() + deliveryFee;

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Корзина пуста"
        description="Добавьте товары из каталога"
        actionLabel="Перейти в каталог"
        actionLink="/catalog"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-900">Корзина</h1>
          <p className="text-warm-500 mt-1">{getItemCount()} товаров</p>
        </div>
        <button onClick={clearCart} className="text-sm text-warm-400 hover:text-red-500 transition-colors">
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => {
            const { product, size, color, quantity } = item;
            return (
              <div
                key={`${product.id}-${size}-${color}-${idx}`}
                className="bg-white rounded-2xl border border-warm-100 p-4 flex gap-4 shadow-sm animate-fade-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl bg-warm-100 flex-shrink-0 hover:opacity-90 transition-opacity"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="font-semibold text-warm-900 hover:text-primary-500 transition-colors truncate block"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs text-warm-400 mt-0.5">{product.brand}</p>
                  <p className="text-sm text-warm-500 mt-1">
                    {size} · {color}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-warm-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, size, color, quantity - 1)}
                        className="px-3 py-1.5 text-warm-500 hover:bg-warm-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-1.5 font-medium text-warm-800 min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, size, color, quantity + 1)}
                        className="px-3 py-1.5 text-warm-500 hover:bg-warm-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-warm-900">
                        {(product.price * quantity).toLocaleString('ru-RU')} ₽
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id, size, color)}
                        className="p-1.5 text-warm-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="bg-white rounded-2xl border border-warm-100 p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold text-warm-900 text-lg mb-4">Итого</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-warm-500">
                <span>Товары ({items.reduce((a, i) => a + i.quantity, 0)} шт.)</span>
                <span>{getTotal().toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-warm-500">
                <span>Доставка</span>
                <span className={deliveryFee === 0 ? 'text-emerald-500 font-medium' : ''}>
                  {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-warm-400">
                  До бесплатной доставки ещё {(5000 - getTotal()).toLocaleString('ru-RU')} ₽
                </p>
              )}
              <div className="border-t border-warm-100 pt-3">
                <div className="flex justify-between text-lg font-bold text-warm-900">
                  <span>К оплате</span>
                  <span className="text-primary-600">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
            <button className="w-full btn-primary mt-6">Оформить заказ</button>
            <Link to="/catalog" className="block text-center text-sm text-warm-500 hover:text-primary-500 mt-3 transition-colors">
              Продолжить покупки →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
