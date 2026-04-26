import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const MyItemsPage = () => {
  const { user } = useAuthStore();
  const { products, fetchProducts, loading, deleteProduct } = useProductStore();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const myProducts = products.filter((p) => p.owner === user?.id);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setDeleteId(null);
  };

  if (loading) return <Loading text="Загрузка товаров..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мои товары</h1>
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          + Добавить товар
        </Link>
      </div>

      {myProducts.length === 0 ? (
        <EmptyState
          icon="📦"
          title="У вас пока нет товаров"
          description="Создайте свой первый товар"
          actionLabel="Создать товар"
          actionLink="/create"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Товар</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Категория</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Цена</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Остаток</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock} шт.</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                          ✏️ Изменить
                        </Link>
                        {deleteId === product.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(product.id)} className="text-red-600 text-xs font-medium">
                              Да
                            </button>
                            <button onClick={() => setDeleteId(null)} className="text-gray-400 text-xs">
                              Нет
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteId(product.id)} className="text-red-400 hover:text-red-600 text-sm">
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItemsPage;
