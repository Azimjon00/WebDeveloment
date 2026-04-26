import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { categories } from '../data/products';

const ListPage = () => {
  const { fetchProducts, filteredProducts, loading, error, searchQuery, selectedCategory, selectedSubcategory, sortOption, priceRange, setSearchQuery, setCategory, setSubcategory, setSortOption, setPriceRange, applyFilters, resetFilters, products } = useProductStore();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) { setCategory(category); applyFilters(); }
  }, [searchParams]);

  const subcategories = useMemo(() => {
    const filtered = selectedCategory && selectedCategory !== 'Все'
      ? products.filter(p => p.category === selectedCategory)
      : products;
    return [...new Set(filtered.map(p => p.subcategory))];
  }, [products, selectedCategory]);

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 15000), [products]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); applyFilters(); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-warm-900 mb-2">Каталог товаров</h1>
        <p className="text-warm-500">{filteredProducts.length} товаров</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant pl-11"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden px-4 py-3 border-2 border-warm-200 rounded-xl text-warm-600 font-medium hover:border-primary-300 transition-colors"
        >
          ⚙️ Фильтры
        </button>

        <select
          value={sortOption}
          onChange={(e) => { setSortOption(e.target.value as any); setTimeout(applyFilters, 0); }}
          className="select-elegant min-w-[200px]"
        >
          <option value="newest">Сначала новые</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="rating">По рейтингу</option>
          <option value="popular">По популярности</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
          <div className="bg-white rounded-2xl border border-warm-100 p-6 space-y-6 sticky top-24 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-warm-900">Фильтры</h3>
              <button onClick={resetFilters} className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                Сбросить
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-warm-700 mb-3">Категория</h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <label key={cat} className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-primary-50' : 'hover:bg-warm-50'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-primary-500 bg-primary-500' : 'border-warm-300'}`}>
                      {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm text-warm-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            {subcategories.length > 0 && selectedCategory !== 'Все' && (
              <div>
                <h4 className="text-sm font-medium text-warm-700 mb-3">Подкатегория</h4>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="subcategory" checked={selectedSubcategory === ''} onChange={() => { setSubcategory(''); setTimeout(applyFilters, 50); }} className="text-primary-500 focus:ring-primary-400" />
                    <span className="text-sm text-warm-600">Все</span>
                  </label>
                  {subcategories.map((sub) => (
                    <label key={sub} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="subcategory" checked={selectedSubcategory === sub} onChange={() => { setSubcategory(sub); setTimeout(applyFilters, 50); }} className="text-primary-500 focus:ring-primary-400" />
                      <span className="text-sm text-warm-600">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-medium text-warm-700 mb-3">Цена</h4>
              <div className="flex gap-2 mb-3">
                <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="input-elegant text-sm py-2" placeholder="От" />
                <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="input-elegant text-sm py-2" placeholder="До" />
              </div>
              <input type="range" min={0} max={maxPrice} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-primary-500" />
              <div className="flex justify-between text-xs text-warm-400 mt-1">
                <span>0 ₽</span>
                <span>{maxPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button onClick={applyFilters} className="w-full btn-primary">
              Применить
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <Loading text="Загрузка товаров..." />
          ) : error ? (
            <EmptyState icon="❌" title="Ошибка" description={error} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Ничего не найдено"
              description="Попробуйте изменить параметры поиска или фильтры"
              actionLabel="Сбросить фильтры"
              actionLink="#"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;
