import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

const FavoritesPage = () => {
  const { products, favorites } = useProductStore();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        icon="❤️"
        title="Нет избранных товаров"
        description="Нажмите на сердечко у товара, чтобы добавить его в избранное"
        actionLabel="Перейти в каталог"
        actionLink="/catalog"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-warm-900 mb-2">Избранное</h1>
      <p className="text-warm-500 mb-8">{favoriteProducts.length} товаров</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
