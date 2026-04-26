import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const favorites = useProductStore((s) => s.favorites);
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const isFav = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes?.[0] || 'ONE SIZE';
    const color = product.colors?.[0] || 'Стандарт';
    addToCart(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden card-hover border border-warm-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-warm-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
              NEW
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="bg-primary-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
              −{discount}%
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={handleToggleFav}
          className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm"
        >
          <svg className={`w-5 h-5 transition-colors ${isFav ? 'text-primary-500 fill-primary-500' : 'text-warm-400'}`} viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg backdrop-blur-sm ${
              added
                ? 'bg-emerald-500/90 text-white'
                : 'bg-warm-900/80 text-white hover:bg-warm-900'
            }`}
          >
            {added ? '✓ Добавлено' : 'В корзину'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] text-warm-400 uppercase tracking-widest mb-1.5">{product.brand}</p>
        <h3 className="font-medium text-warm-800 text-sm leading-snug mb-2.5 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-sm text-warm-600 font-medium">{product.rating}</span>
          <span className="text-xs text-warm-400">({product.reviews} отзывов)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-lg font-bold text-warm-900">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.oldPrice && (
            <span className="text-sm text-warm-400 line-through">
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-1.5">
          {product.colors.slice(0, 4).map((color, i) => {
            const colorMap: Record<string, string> = {
              'бел': '#FFFFFF', 'чёрн': '#1a1a1a', 'черн': '#1a1a1a',
              'сер': '#9CA3AF', 'син': '#1E3A5F', 'беж': '#D4B896',
              'зел': '#2D5A27', 'красн': '#DC2626', 'розов': '#EC4899',
              'голуб': '#60A5FA', 'жёлт': '#FBBF24', 'желт': '#FBBF24',
              'борд': '#7F1D1D', 'коричн': '#92400E', 'хаки': '#4B5320',
              'оливк': '#556B2F', 'тан': '#D2B48C', 'серебр': '#C0C0C0',
              'золот': '#FFD700', 'фиолет': '#7C3AED', 'лаванд': '#A78BFA',
            };
            let bgColor = '#E5E7EB';
            const lowerColor = color.toLowerCase();
            for (const [key, val] of Object.entries(colorMap)) {
              if (lowerColor.includes(key)) {
                bgColor = val;
                break;
              }
            }
            return (
              <span
                key={i}
                className="w-4 h-4 rounded-full border-2 border-warm-200 shadow-sm"
                style={{ backgroundColor: bgColor }}
                title={color}
              />
            );
          })}
          {product.colors.length > 4 && (
            <span className="text-xs text-warm-400 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
