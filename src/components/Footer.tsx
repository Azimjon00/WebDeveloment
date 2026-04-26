import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-warm-900 text-warm-400 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-lg">
              ✨
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Style<span className="text-primary-400">Beauty</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            Интернет-магазин модной одежды и аксессуаров. Качественные бренды, быстрая доставка, удобный возврат.
          </p>
          <div className="flex gap-3">
            {['📸', '💬', '🐦', '📘'].map((icon, i) => (
              <button key={i} className="w-9 h-9 bg-warm-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors text-sm">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog */}
        <div>
          <h4 className="text-white font-semibold mb-4">Каталог</h4>
          <ul className="space-y-3 text-sm">
            {['Одежда', 'Аксессуары', 'Обувь', 'Верхняя одежда'].map((item) => (
              <li key={item}>
                <Link to="/catalog" className="hover:text-primary-400 transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Информация</h4>
          <ul className="space-y-3 text-sm">
            {['О нас', 'Доставка и оплата', 'Возврат', 'Политика конфиденциальности', 'Контакты'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-primary-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+79991234567" className="hover:text-primary-400 transition-colors">+7 (999) 123-45-67</a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:info@stylebeauty.ru" className="hover:text-primary-400 transition-colors">info@stylebeauty.ru</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>Москва, ул. Модная, 1</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🕐</span>
              <span>Пн–Вс: 9:00–21:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-warm-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>© 2024 StyleBeauty. Все права защищены.</p>
        <div className="flex gap-4">
          <span>💳 Visa</span>
          <span>💳 MasterCard</span>
          <span>💳 МИР</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
