import { useEffect, useState, useCallback } from 'react';
import { useProductStore } from '../store/productStore';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/Loading';

type Tab = 'overview' | 'products' | 'orders' | 'users' | 'settings';
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface AdminOrder {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  orders: number;
  totalSpent: number;
  registered: string;
  blocked: boolean;
  avatar: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Мини-график — столбчатая диаграмма на CSS
const BarChart = ({ data, color = 'indigo' }: { data: number[]; color?: string }) => {
  const max = Math.max(...data, 1);
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-500',
    green: 'bg-emerald-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="flex items-end gap-1.5 h-32 w-full">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[9px] text-gray-400">{val > 0 ? val + 'k' : ''}</span>
          <div
            className={`w-full rounded-t ${colors[color] || 'bg-indigo-500'} transition-all duration-500`}
            style={{ height: `${Math.max((val / max) * 100, 4)}%` }}
            title={`${months[i]}: ${val}k ₽`}
          />
          <span className="text-[9px] text-gray-400 leading-none">{months[i]}</span>
        </div>
      ))}
    </div>
  );
};

// Кольцевая диаграмма
const DonutChart = ({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {segments.map((seg, i) => {
          const dashLength = (seg.value / total) * circumference;
          const dashOffset = -offset;
          offset += dashLength;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-700"
            />
          );
        })}
        <text x="50" y="48" textAnchor="middle" className="text-[10px] font-bold fill-gray-700" style={{ fontSize: '10px' }}>
          {total}
        </text>
        <text x="50" y="60" textAnchor="middle" className="text-[7px] fill-gray-400" style={{ fontSize: '7px' }}>
          всего
        </text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-600">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-800">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminPanelPage = () => {
  const { user } = useAuthStore();
  const { products, fetchProducts, loading, deleteProduct, updateProduct } = useProductStore();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Products
  const [productSearch, setProductSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Все');
  const [sortField, setSortField] = useState<'price' | 'stock' | 'rating' | 'title'>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ price: '', stock: '' });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [productPage, setProductPage] = useState(1);
  const productsPerPage = 8;

  // Orders
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');

  // Users
  const [userSearch, setUserSearch] = useState('');

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setOrders([
      { id: 1001, userId: 2, userName: 'Иван Петров', userEmail: 'ivan@mail.ru', total: 12480, status: 'pending', date: '2024-01-15', items: 3 },
      { id: 1002, userId: 3, userName: 'Мария Козлова', userEmail: 'maria@gmail.com', total: 4990, status: 'shipped', date: '2024-01-14', items: 1 },
      { id: 1003, userId: 4, userName: 'Дмитрий Сидоров', userEmail: 'dmitry@ya.ru', total: 8990, status: 'delivered', date: '2024-01-13', items: 2 },
      { id: 1004, userId: 5, userName: 'Анна Волкова', userEmail: 'anna@mail.ru', total: 3490, status: 'processing', date: '2024-01-12', items: 1 },
      { id: 1005, userId: 2, userName: 'Иван Петров', userEmail: 'ivan@mail.ru', total: 15980, status: 'cancelled', date: '2024-01-11', items: 4 },
      { id: 1006, userId: 6, userName: 'Сергей Новиков', userEmail: 'sergey@gmail.com', total: 7450, status: 'pending', date: '2024-01-10', items: 2 },
      { id: 1007, userId: 7, userName: 'Елена Морозова', userEmail: 'elena@mail.ru', total: 2190, status: 'delivered', date: '2024-01-09', items: 1 },
      { id: 1008, userId: 3, userName: 'Мария Козлова', userEmail: 'maria@gmail.com', total: 32500, status: 'shipped', date: '2024-01-08', items: 5 },
    ]);

    setUsers([
      { id: 1, name: 'Администратор', email: 'admin@shop.ru', role: 'admin', orders: 0, totalSpent: 0, registered: '2023-01-01', blocked: false, avatar: '👑' },
      { id: 2, name: 'Иван Петров', email: 'ivan@mail.ru', role: 'user', orders: 3, totalSpent: 28460, registered: '2023-06-15', blocked: false, avatar: '👤' },
      { id: 3, name: 'Мария Козлова', email: 'maria@gmail.com', role: 'user', orders: 2, totalSpent: 37490, registered: '2023-08-20', blocked: false, avatar: '👤' },
      { id: 4, name: 'Дмитрий Сидоров', email: 'dmitry@ya.ru', role: 'user', orders: 1, totalSpent: 8990, registered: '2023-09-10', blocked: false, avatar: '👤' },
      { id: 5, name: 'Анна Волкова', email: 'anna@mail.ru', role: 'user', orders: 1, totalSpent: 3490, registered: '2023-11-05', blocked: false, avatar: '👤' },
      { id: 6, name: 'Сергей Новиков', email: 'sergey@gmail.com', role: 'user', orders: 1, totalSpent: 7450, registered: '2023-12-01', blocked: true, avatar: '👤' },
      { id: 7, name: 'Елена Морозова', email: 'elena@mail.ru', role: 'user', orders: 1, totalSpent: 2190, registered: '2024-01-02', blocked: false, avatar: '👤' },
    ]);
  }, []);

  // Stats
  const totalRevenue = orders.reduce((s, o) => s + (o.status !== 'cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const activeUsers = users.filter((u) => !u.blocked).length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.filter((o) => o.status !== 'cancelled').length) : 0;
  const lowStock = products.filter((p) => p.stock < 10).length;

  const salesData = [12, 19, 8, 15, 22, 18, 25, 30, 27, 35, 28, 42];
  const visitorsData = [45, 52, 38, 65, 70, 58, 82, 90, 75, 95, 88, 110];

  const statusSegments = [
    { value: orders.filter((o) => o.status === 'delivered').length, color: '#22c55e', label: 'Доставлены' },
    { value: orders.filter((o) => o.status === 'shipped').length, color: '#a855f7', label: 'Отправлены' },
    { value: orders.filter((o) => o.status === 'processing').length, color: '#3b82f6', label: 'Обработка' },
    { value: orders.filter((o) => o.status === 'pending').length, color: '#eab308', label: 'Ожидают' },
    { value: orders.filter((o) => o.status === 'cancelled').length, color: '#ef4444', label: 'Отменены' },
  ];

  const categorySegments = [
    { value: products.filter((p) => p.category === 'Одежда').length, color: '#6366f1', label: 'Одежда' },
    { value: products.filter((p) => p.category === 'Аксессуары').length, color: '#ec4899', label: 'Аксессуары' },
    { value: products.filter((p) => p.category === 'Обувь').length, color: '#f97316', label: 'Обувь' },
    { value: products.filter((p) => p.category === 'Верхняя одежда').length, color: '#14b8a6', label: 'Верхняя одежда' },
  ];

  // Filtered & sorted products
  let filteredProducts = [...products];
  if (filterCategory !== 'Все') filteredProducts = filteredProducts.filter((p) => p.category === filterCategory);
  if (productSearch) {
    const q = productSearch.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }
  filteredProducts.sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortField === 'price') return (a.price - b.price) * mul;
    if (sortField === 'stock') return (a.stock - b.stock) * mul;
    if (sortField === 'rating') return (a.rating - b.rating) * mul;
    return a.title.localeCompare(b.title) * mul;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((productPage - 1) * productsPerPage, productPage * productsPerPage);

  // Handlers
  const handleDeleteProduct = async (id: number) => {
    const ok = await deleteProduct(id);
    if (ok) {
      addToast('Товар удалён', 'success');
    } else {
      addToast('Ошибка удаления', 'error');
    }
    setConfirmDelete(null);
  };

  const handleSaveProduct = async (id: number) => {
    const updates: Record<string, number> = {};
    if (editForm.price) updates.price = Number(editForm.price);
    if (editForm.stock) updates.stock = Number(editForm.stock);
    const ok = await updateProduct(id, updates);
    if (ok) {
      addToast('Товар обновлён', 'success');
    } else {
      addToast('Ошибка обновления', 'error');
    }
    setEditingProduct(null);
  };

  const handleOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    addToast(`Статус заказа #${orderId} обновлён`, 'info');
  };

  const handleToggleBlock = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, blocked: !u.blocked } : u
      )
    );
    const target = users.find((u) => u.id === userId);
    addToast(target?.blocked ? 'Пользователь разблокирован' : 'Пользователь заблокирован', 'info');
  };

  const handleRoleChange = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' as const } : u
      )
    );
    addToast('Роль пользователя изменена', 'info');
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-100 text-blue-700 border-blue-200',
    shipped: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };
  const statusLabels: Record<string, string> = {
    pending: 'Ожидает',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменён',
  };

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter((o) => o.status === orderFilter);
  const filteredUsers = userSearch
    ? users.filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
    : users;

  if (loading && products.length === 0) return <Loading text="Загрузка админ-панели..." />;

  const navItems = [
    { key: 'overview' as Tab, icon: '📊', label: 'Обзор' },
    { key: 'products' as Tab, icon: '📦', label: 'Товары' },
    { key: 'orders' as Tab, icon: '🛒', label: 'Заказы' },
    { key: 'users' as Tab, icon: '👥', label: 'Пользователи' },
    { key: 'settings' as Tab, icon: '⚙️', label: 'Настройки' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-slide-in flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.message}
          </div>
        ))}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <div>
              <h2 className="font-bold text-gray-900">Админ</h2>
              <p className="text-xs text-gray-400">Управление магазином</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.key
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              А
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Админ'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@shop.ru'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden text-xl p-1"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {navItems.find((n) => n.key === activeTab)?.icon}{' '}
              {navItems.find((n) => n.key === activeTab)?.label}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">Добро пожаловать, {user?.name || 'Администратор'}</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ====== OVERVIEW TAB ====== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">💰</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">+12%</span>
                  </div>
                  <p className="text-2xl font-bold">{totalRevenue.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-indigo-200 text-sm mt-1">Выручка</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">🛒</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{orders.length}</span>
                  </div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-emerald-200 text-sm mt-1">Заказов</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">👥</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">+3</span>
                  </div>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                  <p className="text-amber-200 text-sm mt-1">Пользователей</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">📦</span>
                    {lowStock > 0 && (
                      <span className="text-xs bg-red-400 px-2 py-0.5 rounded-full">⚠️ {lowStock}</span>
                    )}
                  </div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-purple-200 text-sm mt-1">Товаров</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">📈 Продажи по месяцам (2024)</h3>
                  <BarChart data={salesData} color="indigo" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">👁️ Посетители по месяцам</h3>
                  <BarChart data={visitorsData} color="green" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">📋 Статусы заказов</h3>
                  <DonutChart segments={statusSegments} />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">🏷️ Товары по категориям</h3>
                  <DonutChart segments={categorySegments} />
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-sm text-gray-500">Средний чек</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{avgOrderValue.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-sm text-gray-500">Ожидают обработки</p>
                  <p className="text-2xl font-bold text-yellow-500 mt-1">{pendingOrders}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-sm text-gray-500">Мало на складе</p>
                  <p className="text-2xl font-bold text-red-500 mt-1">{lowStock}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">🕐 Последние заказы</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Все заказы →
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm">🛒</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">#{order.id} — {order.userName}</p>
                        <p className="text-xs text-gray-400">{order.date} · {order.items} товар(ов)</p>
                      </div>
                      <p className="font-semibold text-sm">{order.total.toLocaleString('ru-RU')} ₽</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====== PRODUCTS TAB ====== */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Поиск по названию или бренду..."
                      value={productSearch}
                      onChange={(e) => { setProductSearch(e.target.value); setProductPage(1); }}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => { setFilterCategory(e.target.value); setProductPage(1); }}
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Все">Все категории</option>
                    <option value="Одежда">Одежда</option>
                    <option value="Аксессуары">Аксессуары</option>
                    <option value="Обувь">Обувь</option>
                    <option value="Верхняя одежда">Верхняя одежда</option>
                  </select>
                  <select
                    value={`${sortField}-${sortDir}`}
                    onChange={(e) => { const [f, d] = e.target.value.split('-'); setSortField(f as any); setSortDir(d as any); }}
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="title-asc">Название А-Я</option>
                    <option value="title-desc">Название Я-А</option>
                    <option value="price-asc">Цена ↑</option>
                    <option value="price-desc">Цена ↓</option>
                    <option value="stock-asc">Остаток ↑</option>
                    <option value="stock-desc">Остаток ↓</option>
                    <option value="rating-desc">Рейтинг ↓</option>
                    <option value="rating-asc">Рейтинг ↑</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/80">
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Товар</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Категория</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Цена</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Остаток</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Рейтинг</th>
                        <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginatedProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.title} className="w-11 h-11 rounded-lg object-cover ring-1 ring-gray-100" />
                              <div className="min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate max-w-[180px]">{product.title}</p>
                                <p className="text-xs text-gray-400">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {editingProduct === product.id ? (
                              <input
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                className="w-24 px-2 py-1.5 border border-indigo-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                autoFocus
                              />
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">{product.price.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {editingProduct === product.id ? (
                              <input
                                type="number"
                                value={editForm.stock}
                                onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                                className="w-20 px-2 py-1.5 border border-indigo-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                                product.stock < 10 ? 'text-red-500' : 'text-gray-700'
                              }`}>
                                {product.stock < 10 && '⚠️'} {product.stock}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">⭐ {product.rating}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              {editingProduct === product.id ? (
                                <>
                                  <button onClick={() => handleSaveProduct(product.id)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" title="Сохранить">
                                    ✅
                                  </button>
                                  <button onClick={() => setEditingProduct(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors" title="Отмена">
                                    ❌
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => { setEditingProduct(product.id); setEditForm({ price: String(product.price), stock: String(product.stock) }); }}
                                  className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                                  title="Редактировать"
                                >
                                  ✏️
                                </button>
                              )}
                              {confirmDelete === product.id ? (
                                <div className="flex items-center gap-1">
                                  <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-xs font-bold" title="Подтвердить">
                                    ✓
                                  </button>
                                  <button onClick={() => setConfirmDelete(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors text-xs font-bold" title="Отмена">
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => setConfirmDelete(product.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Удалить">
                                  🗑️
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {paginatedProducts.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-400">
                            <p className="text-3xl mb-2">📦</p>
                            <p>Товары не найдены</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {((productPage - 1) * productsPerPage) + 1}–{Math.min(productPage * productsPerPage, filteredProducts.length)} из {filteredProducts.length}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        disabled={productPage === 1}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                      >
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setProductPage(page)}
                          className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors ${
                            page === productPage ? 'bg-indigo-600 text-white' : 'border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                        disabled={productPage === totalPages}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====== ORDERS TAB ====== */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex flex-wrap gap-2">
                {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      orderFilter === status
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {status === 'all' ? `Все (${orders.length})` : `${statusLabels[status]} (${orders.filter((o) => o.status === status).length})`}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/80">
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">№ Заказа</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Клиент</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Дата</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Сумма</th>
                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Статус</th>
                        <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-mono text-sm font-semibold text-indigo-600">#{order.id}</span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-gray-900">{order.userName}</p>
                            <p className="text-xs text-gray-400">{order.userEmail}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                          <td className="px-4 py-3 text-sm font-semibold">{order.total.toLocaleString('ru-RU')} ₽</td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatus(order.id, e.target.value as OrderStatus)}
                              className={`px-2.5 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${statusColors[order.status]}`}
                            >
                              <option value="pending">⏳ Ожидает</option>
                              <option value="processing">🔄 В обработке</option>
                              <option value="shipped">📦 Отправлен</option>
                              <option value="delivered">✅ Доставлен</option>
                              <option value="cancelled">❌ Отменён</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-xs text-gray-400">{order.items} товар(ов)</span>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-400">
                            <p className="text-3xl mb-2">🛒</p>
                            <p>Заказы не найдены</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====== USERS TAB ====== */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Search */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Users Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredUsers.map((u) => (
                  <div key={u.id} className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${u.blocked ? 'border-red-200 bg-red-50/30' : 'border-gray-100'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        u.role === 'admin'
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                          : 'bg-gradient-to-br from-indigo-400 to-purple-500'
                      }`}>
                        {u.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 truncate">{u.name}</h3>
                          {u.blocked && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">🚫</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Регистрация: {u.registered}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-900">{u.orders}</p>
                        <p className="text-[10px] text-gray-400 uppercase">Заказов</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-900">{u.totalSpent > 0 ? u.totalSpent.toLocaleString('ru-RU') : '0'} ₽</p>
                        <p className="text-[10px] text-gray-400 uppercase">Потрачено</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role === 'admin' ? '👑 Админ' : '👤 Пользователь'}
                      </span>
                      {u.blocked && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">🚫 Заблокирован</span>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleToggleBlock(u.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                          u.blocked
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {u.blocked ? '🔓 Разблокировать' : '🔒 Заблокировать'}
                      </button>
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleRoleChange(u.id)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                        >
                          👑 Назначить админом
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-3xl mb-2">👥</p>
                  <p>Пользователи не найдены</p>
                </div>
              )}
            </div>
          )}

          {/* ====== SETTINGS TAB ====== */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Настройки магазина</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название магазина</label>
                    <input
                      type="text"
                      defaultValue="StyleShop — Магазин одежды"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email поддержки</label>
                    <input
                      type="email"
                      defaultValue="support@styleshop.ru"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон поддержки</label>
                    <input
                      type="tel"
                      defaultValue="+7 (800) 555-35-35"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Бесплатная доставка от</label>
                    <input
                      type="number"
                      defaultValue={5000}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Toggle settings */}
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Режим обслуживания</p>
                      <p className="text-xs text-gray-400">Закрыть магазин для посетителей</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Уведомления о заказах</p>
                      <p className="text-xs text-gray-400">Получать email при новом заказе</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Автоматическое подтверждение</p>
                      <p className="text-xs text-gray-400">Автоматически подтверждать заказы</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => addToast('Настройки сохранены!', 'success')}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    💾 Сохранить
                  </button>
                  <button className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Отмена
                  </button>
                </div>
              </div>

              {/* System Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🖥️ Системная информация</h3>
                <div className="space-y-3">
                  {[
                    ['Версия', '2.1.0'],
                    ['Последнее обновление', '15.01.2024'],
                    ['Размер базы', '12.4 MB'],
                    ['Активных сессий', '3'],
                    ['Время отклика API', '45ms'],
                    ['Uptime', '99.8%'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
