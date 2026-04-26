import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useAuthStore } from '../store/authStore';

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createProduct, loading, error } = useProductStore();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = await createProduct({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory || 'Другое',
      image: formData.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=750&fit=crop',
      images: [formData.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=750&fit=crop'],
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
      rating: 0,
      reviews: 0,
      inStock: true,
      stock: Number(formData.stock) || 0,
      brand: formData.brand,
      owner: user?.id,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    if (newProduct) {
      navigate('/my-items');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Добавить товар</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Название *</label>
          <input name="title" value={formData.title} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Классическая футболка" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Подробное описание товара..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Цена (₽) *</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="2990" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Старая цена (₽)</label>
            <input name="oldPrice" type="number" value={formData.oldPrice} onChange={handleChange} min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="3990" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория *</label>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Футболки" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Бренд *</label>
          <input name="brand" value={formData.brand} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="MyBrand" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Размеры (через запятую)</label>
            <input name="sizes" value={formData.sizes} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="S, M, L, XL" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Цвета (через запятую)</label>
            <input name="colors" value={formData.colors} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Чёрный, Белый" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL изображения</label>
            <input name="image" value={formData.image} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Количество</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} min={0}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="50" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Теги (через запятую)</label>
          <input name="tags" value={formData.tags} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="мода, стиль, лето" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-3.5 rounded-xl hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50">
          {loading ? 'Создание...' : 'Создать товар'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
