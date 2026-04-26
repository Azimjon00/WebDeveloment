import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      updateProfile({ ...user, ...formData });
      setEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль</h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.role === 'admin' ? '👑 Администратор' : '👤 Пользователь'}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя</label>
            {editing ? (
              <input name="name" value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            ) : (
              <p className="text-gray-900 py-3">{user.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            {editing ? (
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            ) : (
              <p className="text-gray-900 py-3">{user.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
            {editing ? (
              <input name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+7 (999) 123-45-67" />
            ) : (
              <p className="text-gray-900 py-3">{user.phone || 'Не указан'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Адрес доставки</label>
            {editing ? (
              <input name="address" value={formData.address} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="г. Москва, ул. Примерная, д. 1" />
            ) : (
              <p className="text-gray-900 py-3">{user.address || 'Не указан'}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {editing ? (
            <>
              <button onClick={handleSave}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
                Сохранить
              </button>
              <button onClick={() => { setEditing(false); setFormData({ name: user.name, email: user.email, phone: user.phone || '', address: user.address || '' }); }}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                Отмена
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
              Редактировать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
