import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { products, fetchProducts, toggleFavorite, favorites } = useProductStore();
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('desc');
  const [added, setAdded] = useState(false);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const product = products.find((p) => p.id === productId);
  const isFav = product && favorites.includes(product.id);
  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product && !useProductStore.getState().loading) {
    return <EmptyState icon="😔" title="Товар не найден" actionLabel="Вернуться в каталог" actionLink="/catalog" />;
  }

  if (useProductStore.getState().loading) return <Loading text="Загрузка товара..." />;
  if (!product) return null;

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    const size = selectedSize || product?.sizes?.[0] || 'ONE SIZE';
    const color = selectedColor || product?.colors?.[0] || 'Стандарт';
    addToCart(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const colorMap: Record<string, string> = {
    'бел': '#FFFFFF', 'чёрн': '#1a1a1a', 'черн': '#1a1a1a',
    'сер': '#9CA3AF', 'син': '#1E3A5F', 'беж': '#D4B896',
    'зел': '#2D5A27', 'красн': '#DC2626', 'розов': '#EC4899',
    'голуб': '#60A5FA', 'жёлт': '#FBBF24', 'желт': '#FBBF24',
    'борд': '#7F1D1D', 'коричн': '#92400E', 'хаки': '#4B5320',
    'оливк': '#556B2F', 'тан': '#D2B48C', 'серебр': '#C0C0C0',
    'золот': '#FFD700', 'фиолет': '#7C3AED', 'лаванд': '#A78BFA',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-warm-500 mb-6">
        <Link to="/" className="hover:text-primary-500 transition-colors">Главная</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-primary-500 transition-colors">Каталог</Link>
        <span>/</span>
        <span className="text-warm-800">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-warm-100 aspect-[3/4]">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
            {product.isSale && discount > 0 && <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">−{discount}%</span>}
          </div>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
          >
            <svg className={`w-5 h-5 transition-colors ${isFav ? 'text-primary-500 fill-primary-500' : 'text-warm-400'}`} viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="animate-fade-up">
          <p className="text-sm text-warm-400 uppercase tracking-widest mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-warm-900 mb-4">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-5 h-5 ${star <= Math.round(product.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-warm-300'}`} viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" strokeWidth="1">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-warm-600 font-medium">{product.rating}</span>
            <span className="text-warm-400">({product.reviews} отзывов)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-warm-50 rounded-xl">
            <span className="text-3xl font-bold text-warm-900">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <>
                <span className="text-xl text-warm-400 line-through">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
                <span className="badge badge-error text-sm">−{discount}%</span>
              </>
            )}
          </div>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-warm-700 mb-3">Размер</h4>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ['ONE SIZE']).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-600'
                        : 'border-warm-200 text-warm-600 hover:border-warm-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-warm-700 mb-3">Цвет</h4>
              <div className="flex flex-wrap gap-2">
                {(product.colors || ['Стандарт']).map((color) => {
                  let bg = '#E5E7EB';
                  const lowerColor = color.toLowerCase();
                  for (const [key, val] of Object.entries(colorMap)) {
                    if (lowerColor.includes(key)) { bg = val; break; }
                  }
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all border-2 ${
                        isSelected ? 'border-primary-500 bg-primary-50' : 'border-warm-200 hover:border-warm-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-warm-300 shadow-sm" style={{ backgroundColor: bg }} />
                      <span className={isSelected ? 'text-primary-600 font-medium' : 'text-warm-600'}>{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center border-2 border-warm-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-warm-500 hover:bg-warm-100 transition-colors text-lg">−</button>
              <span className="px-5 py-3 font-semibold text-warm-800 min-w-[50px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-warm-500 hover:bg-warm-100 transition-colors text-lg">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-warm-900 text-white hover:bg-warm-800 active:scale-[0.98]'
              }`}
            >
              {added ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🚚', text: 'Бесплатная доставка' },
              { icon: '↩️', text: 'Возврат 30 дней' },
              { icon: '💳', text: 'Безопасная оплата' },
              { icon: '✅', text: 'Оригинальный товар' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2 text-sm text-warm-600 bg-warm-50 rounded-xl p-3">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex gap-1 border-b border-warm-200 mb-6">
          {[
            { key: 'desc', label: 'Описание' },
            { key: 'specs', label: 'Характеристики' },
            { key: 'reviews', label: `Отзывы (${product.reviews})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-warm-500 hover:text-warm-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {activeTab === 'desc' && (
            <div className="prose max-w-none text-warm-600 leading-relaxed">
              <p>{product.description || 'Описание товара скоро будет добавлено.'}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="space-y-3">
              {[
                ['Бренд', product.brand],
                ['Категория', product.category],
                ['Подкатегория', product.subcategory],
                ['Размеры', product.sizes.join(', ')],
                ['Цвета', product.colors.join(', ')],
                ['Остаток', `${product.stock} шт.`, product.stock < 5 ? 'text-red-500' : ''],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-3 border-b border-warm-100">
                  <span className="text-warm-500">{label}</span>
                  <span className={`font-medium ${i === 5 && product.stock < 5 ? 'text-red-500' : 'text-warm-800'}`}>{String(value)}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-12 text-warm-500">
              <span className="text-4xl mb-3 block">💬</span>
              <p>Отзывы появятся после первых покупок</p>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-warm-900 mb-6">Вам может понравиться</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default DetailsPage;
