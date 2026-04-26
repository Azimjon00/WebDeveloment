import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import Loading from '../components/Loading';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, fetchProducts, updateProduct, loading } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    oldPrice: '',
    category: 'Одежда',
    subcategory: '',
    brand: '',
    sizes: '',
    colors: '',
    image: '',
    stock: '',
    tags: '',
  });

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: String(product.price),
        oldPrice: product.oldPrice ? String(product.oldPrice) : '',
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        sizes: product.sizes.join(', '),
        colors: product.colors.join(', '),
        image: product.image,
        stock: String(product.stock),
        tags: product.tags?.join(', ') || '',
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const success = await updateProduct(product.id, {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory,
      brand: formData.brand,
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
      image: formData.image,
      images: [formData.image],
      stock: Number(formData.stock),
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    if (success) navigate('/my-items');
  };

  if (!product) return <Loading text="Загрузка товара..." />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Редактировать товар</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Название</label>
          <input name="title" value={formData.title} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Цена (₽)</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Старая цена (₽)</label>
            <input name="oldPrice" type="number" value={formData.oldPrice} onChange={handleChange} min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория</label>
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="Одежда">Одежда</option>
              <option value="Аксессуары">Аксессуары</option>
              <option value="Обувь">Обувь</option>
              <option value="Верхняя одежда">Верхняя одежда</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Подкатегория</label>
            <input name="subcategory" value={formData.subcategory} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Бренд</label>
          <input name="brand" value={formData.brand} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Размеры</label>
            <input name="sizes" value={formData.sizes} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Цвета</label>
            <input name="colors" value={formData.colors} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL изображения</label>
            <input name="image" value={formData.image} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Количество</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Теги</label>
          <input name="tags" value={formData.tags} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50">
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
          <button type="button" onClick={() => navigate('/my-items')}
            className="px-6 py-3.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
