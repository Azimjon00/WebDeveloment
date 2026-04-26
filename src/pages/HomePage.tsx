import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { categories } from '../data/products';

const HomePage = () => {
  const { fetchProducts, products, loading } = useProductStore();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((i) => (i + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: 'Новая коллекция',
      subtitle: 'Откройте для себя стильные образы на каждый день',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=700&fit=crop',
      accent: 'from-primary-500 to-accent-500',
    },
    {
      title: 'Скидки до 40%',
      subtitle: 'Успейте приобрести лучшие товары по выгодным ценам',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=700&fit=crop',
      accent: 'from-accent-500 to-primary-500',
    },
    {
      title: 'Аксессуары и украшения',
      subtitle: 'Дополните свой образ стильными деталями',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=700&fit=crop',
      accent: 'from-primary-600 to-accent-400',
    },
  ];

  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const saleProducts = products.filter((p) => p.isSale).slice(0, 4);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const categoryIcons: Record<string, string> = {
    'Одежда': '👗',
    'Аксессуары': '💍',
    'Обувь': '👠',
    'Верхняя одежда': '🧥',
  };

  const categoryGradients: Record<string, string> = {
    'Одежда': 'from-rose-100 to-pink-50',
    'Аксессуары': 'from-amber-100 to-yellow-50',
    'Обувь': 'from-violet-100 to-purple-50',
    'Верхняя одежда': 'from-sky-100 to-blue-50',
  };

  if (loading) return <Loading text="Загрузка каталога..." />;

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-900/80 via-warm-900/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl animate-fade-up">
                  <span className={`inline-block bg-gradient-to-r ${slide.accent} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider`}>
                    STYLEBEAUTY
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/80 mb-8">{slide.subtitle}</p>
                  <div className="flex gap-3">
                    <Link
                      to="/catalog"
                      className="bg-white text-warm-900 px-8 py-3.5 rounded-full hover:bg-warm-100 transition-all font-semibold shadow-xl hover:shadow-2xl active:scale-95"
                    >
                      Смотреть каталог
                    </Link>
                    <Link
                      to="/catalog"
                      className="border-2 border-white/50 text-white px-8 py-3.5 rounded-full hover:bg-white/10 transition-all font-semibold backdrop-blur-sm"
                    >
                      Акции
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === heroIndex ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-2">Категории</h2>
          <p className="text-warm-500">Выберите интересующую категорию</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.filter((c) => c !== 'Все').map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <Link
                key={cat}
                to={`/catalog?category=${cat}`}
                className={`group bg-gradient-to-br ${categoryGradients[cat] || 'from-warm-100 to-warm-50'} rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-warm-100/50`}
              >
                <span className="text-4xl md:text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[cat] || '📦'}
                </span>
                <h3 className="font-semibold text-warm-900 group-hover:text-primary-500 transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-warm-500 mt-1">{count} товаров</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-warm-900">Новинки</h2>
              <p className="text-warm-500 mt-1">Свежие поступления</p>
            </div>
            <Link to="/catalog" className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
              Смотреть все →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Sale Banner */}
      <section className="my-16 mx-4 md:mx-auto max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🔥 Распродажа сезона
              </h2>
              <p className="text-white/80 text-lg">Лучшие предложения этой недели</p>
            </div>
            <Link
              to="/catalog"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-warm-50 transition-all shadow-xl hover:shadow-2xl active:scale-95 whitespace-nowrap"
            >
              Смотреть все акции →
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated */}
      <section className="bg-warm-100/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900">Лучший рейтинг</h2>
            <p className="text-warm-500 mt-1">Выбор наших покупателей</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 border-t border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Бесплатная доставка', desc: 'При заказе от 5 000 ₽' },
              { icon: '↩️', title: 'Возврат 30 дней', desc: 'Лёгкий возврат товара' },
              { icon: '💳', title: 'Безопасная оплата', desc: 'Защита ваших данных' },
              { icon: '💬', title: 'Поддержка 24/7', desc: 'Всегда на связи' },
            ].map((feature) => (
              <div key={feature.title} className="group">
                <span className="text-3xl mb-3 block group-hover:scale-125 transition-transform">{feature.icon}</span>
                <h4 className="font-semibold text-warm-900">{feature.title}</h4>
                <p className="text-sm text-warm-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
