import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (form.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch {
      setError('Пользователь с таким email уже существует');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (pw: string): { level: number; label: string; color: string } => {
    let level = 0;
    if (pw.length >= 6) level++;
    if (pw.length >= 10) level++;
    if (/[A-Z]/.test(pw)) level++;
    if (/[0-9]/.test(pw)) level++;
    if (/[^a-zA-Z0-9]/.test(pw)) level++;
    if (level <= 1) return { level, label: 'Слабый', color: 'bg-red-500' };
    if (level <= 2) return { level, label: 'Средний', color: 'bg-amber-500' };
    if (level <= 3) return { level, label: 'Хороший', color: 'bg-blue-500' };
    return { level, label: 'Сильный', color: 'bg-emerald-500' };
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-primary-400/30">
            ✨
          </div>
          <h1 className="text-3xl font-bold text-warm-900 mb-2">Создать аккаунт</h1>
          <p className="text-warm-500">Присоединяйтесь к нам</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl animate-fade-in">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Имя</label>
              <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="input-elegant" placeholder="Ваше имя" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Email</label>
              <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="input-elegant" placeholder="your@email.com" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Пароль</label>
              <input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} className="input-elegant" placeholder="Минимум 6 символов" required />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength.level ? strength.color : 'bg-warm-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-warm-500">{strength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Подтверждение пароля</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} className="input-elegant" placeholder="Повторите пароль" required />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Пароли не совпадают</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>

        <p className="text-center text-warm-500 text-sm mt-6">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
