import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-primary-400/30">
            ✨
          </div>
          <h1 className="text-3xl font-bold text-warm-900 mb-2">Добро пожаловать</h1>
          <p className="text-warm-500">Войдите в свой аккаунт</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl animate-fade-in">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-elegant"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-elegant pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600 transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-warm-100">
            <p className="text-xs text-warm-400 text-center mb-3">Демо-аккаунты</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setEmail('admin@shop.ru'); setPassword('admin123'); }}
                className="text-xs px-3 py-2 bg-warm-50 hover:bg-warm-100 rounded-lg text-warm-600 transition-colors"
              >
                👑 admin / admin123
              </button>
              <button
                onClick={() => { setEmail('user@shop.ru'); setPassword('user123'); }}
                className="text-xs px-3 py-2 bg-warm-50 hover:bg-warm-100 rounded-lg text-warm-600 transition-colors"
              >
                👤 user / user123
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-warm-500 text-sm mt-6">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
