import { Product } from '../types';

export const categories = [
  'Все', 'Одежда', 'Аксессуары', 'Обувь', 'Верхняя одежда'
];

export const products: Product[] = [
  {
    id: 1,
    title: 'Классическая белая футболка',
    description: 'Базовая белая футболка из 100% хлопка. Идеально подходит для повседневного образа. Мягкая ткань, удобный крой, круглый вырез. Подходит для любого сезона.',
    price: 1490,
    oldPrice: 1990,
    category: 'Одежда',
    subcategory: 'Футболки',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Белый', 'Чёрный', 'Серый'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stock: 45,
    brand: 'BasicWear',
    isNew: true,
    isSale: true,
    tags: ['базовый', 'хлопок', 'повседневный']
  },
  {
    id: 2,
    title: 'Джинсы Slim Fit',
    description: 'Стильные джинсы зауженного кроя из плотного денима. Классический синий цвет, высокая посадка. Подходят для офиса и прогулок.',
    price: 4990,
    category: 'Одежда',
    subcategory: 'Джинсы',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Синий', 'Тёмно-синий', 'Чёрный'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    stock: 30,
    brand: 'DenimCo',
    tags: ['джинсы', 'деним', 'классика']
  },
  {
    id: 3,
    title: 'Кожаная сумка-тоут',
    description: 'Элегантная кожаная сумка из натуральной кожи. Вместительная, с внутренними карманами. Идеальна для работы и повседневного использования.',
    price: 7990,
    oldPrice: 9990,
    category: 'Аксессуары',
    subcategory: 'Сумки',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=750&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: ['Чёрный', 'Коричневый', 'Бежевый'],
    rating: 4.9,
    reviews: 56,
    inStock: true,
    stock: 15,
    brand: 'LeatherLux',
    isSale: true,
    tags: ['кожа', 'сумка', 'элегантный']
  },
  {
    id: 4,
    title: 'Кроссовки Urban Runner',
    description: 'Лёгкие кроссовки для города с амортизирующей подошвой. Дышащий верх, стильный дизайн. Подходят для бега и повседневной носки.',
    price: 6490,
    category: 'Обувь',
    subcategory: 'Кроссовки',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=750&fit=crop'
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['Белый/Чёрный', 'Серый', 'Красный'],
    rating: 4.7,
    reviews: 201,
    inStock: true,
    stock: 55,
    brand: 'SportStep',
    isNew: true,
    tags: ['кроссовки', 'спорт', 'бег']
  },
  {
    id: 5,
    title: 'Зимний пуховик',
    description: 'Тёплый зимний пуховик с натуральным наполнителем. Водоотталкивающая ткань, капюшон с меховой отделкой. Защита до -30°C.',
    price: 12990,
    oldPrice: 15990,
    category: 'Верхняя одежда',
    subcategory: 'Пуховики',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd270cb?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd270cb?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Чёрный', 'Тёмно-синий', 'Оливковый'],
    rating: 4.5,
    reviews: 78,
    inStock: true,
    stock: 20,
    brand: 'WinterGuard',
    isSale: true,
    tags: ['зима', 'пуховик', 'тёплый']
  },
  {
    id: 6,
    title: 'Солнцезащитные очки Aviator',
    description: 'Классические очки-авиаторы с поляризованными линзами. Металлическая оправа, защита UV400. Универсальный стильный аксессуар.',
    price: 3490,
    category: 'Аксессуары',
    subcategory: 'Очки',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: ['Золотой', 'Серебряный', 'Чёрный'],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    stock: 40,
    brand: 'SunStyle',
    isNew: true,
    tags: ['очки', 'авиаторы', 'UV защита']
  },
  {
    id: 7,
    title: 'Шерстяной свитер оверсайз',
    description: 'Мягкий шерстяной свитер свободного кроя. Идеален для холодных дней. Высокое качество шерсти, не колется.',
    price: 5490,
    category: 'Одежда',
    subcategory: 'Свитеры',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=600&h=750&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Бежевый', 'Серый', 'Тёмно-зелёный'],
    rating: 4.7,
    reviews: 93,
    inStock: true,
    stock: 25,
    brand: 'WoolCraft',
    tags: ['шерсть', 'свитер', 'осень']
  },
  {
    id: 8,
    title: 'Кожаный ремень Classic',
    description: 'Классический кожаный ремень из натуральной кожи. Надёжная пряжка из нержавеющей стали. Ширина 3.5 см.',
    price: 2490,
    category: 'Аксессуары',
    subcategory: 'Ремни',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=750&fit=crop'
    ],
    sizes: ['85', '90', '95', '100', '105'],
    colors: ['Чёрный', 'Коричневый'],
    rating: 4.3,
    reviews: 45,
    inStock: true,
    stock: 60,
    brand: 'BeltMaster',
    tags: ['ремень', 'кожа', 'классика']
  },
  {
    id: 9,
    title: 'Летнее платье миди',
    description: 'Лёгкое летнее платье длиной миди с цветочным принтом. Воздушная ткань, свободный крой. Идеально для жарких дней.',
    price: 3990,
    oldPrice: 4990,
    category: 'Одежда',
    subcategory: 'Платья',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Розовый', 'Голубой', 'Жёлтый'],
    rating: 4.8,
    reviews: 112,
    inStock: true,
    stock: 18,
    brand: 'SummerVibe',
    isSale: true,
    isNew: true,
    tags: ['платье', 'лето', 'цветочный']
  },
  {
    id: 10,
    title: 'Спортивные штаны Tech',
    description: 'Спортивные штаны из технологичной ткани с влагоотведением. Эластичный пояс, карманы на молнии. Для тренировок и отдыха.',
    price: 3490,
    category: 'Одежда',
    subcategory: 'Штаны',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Чёрный', 'Серый', 'Тёмно-синий'],
    rating: 4.5,
    reviews: 87,
    inStock: true,
    stock: 35,
    brand: 'ActiveFit',
    tags: ['спорт', 'штаны', 'тренировка']
  },
  {
    id: 11,
    title: 'Наручные часы Minimal',
    description: 'Элегантные наручные часы в минималистичном дизайне. Японский механизм, сапфировое стекло, водозащита 50м.',
    price: 8990,
    oldPrice: 11990,
    category: 'Аксессуары',
    subcategory: 'Часы',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=750&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: ['Серебряный', 'Золотой', 'Розовое золото'],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    stock: 12,
    brand: 'TimePiece',
    isSale: true,
    tags: ['часы', 'минимализм', 'элегантный']
  },
  {
    id: 12,
    title: 'Бомбер Urban Style',
    description: 'Стильный бомбер из нейлона с подкладкой. Классический силуэт, рёбристые манжеты. Универсальная модель на каждый день.',
    price: 5990,
    category: 'Верхняя одежда',
    subcategory: 'Бомберы',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Чёрный', 'Хаки', 'Тёмно-синий'],
    rating: 4.6,
    reviews: 73,
    inStock: true,
    stock: 22,
    brand: 'StreetWear',
    isNew: true,
    tags: ['бомбер', 'улица', 'стиль']
  },
  {
    id: 13,
    title: 'Кеды Classic White',
    description: 'Белые кожаные кеды — универсальная классика. Натуральная кожа, резиновая подошва. Подходят ко всему.',
    price: 4490,
    category: 'Обувь',
    subcategory: 'Кеды',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=750&fit=crop'
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    colors: ['Белый', 'Белый/Чёрный', 'Белый/Красный'],
    rating: 4.7,
    reviews: 189,
    inStock: true,
    stock: 50,
    brand: 'ClassicStep',
    tags: ['кеды', 'кожа', 'классика']
  },
  {
    id: 14,
    title: 'Шарф кашемировый',
    description: 'Мягкий кашемировый шарф премиум-качества. Тёплый и приятный на ощупь. Идеальный подарок.',
    price: 4990,
    category: 'Аксессуары',
    subcategory: 'Шарфы',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1601924921557-45e8e0750524?w=600&h=750&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: ['Серый', 'Бежевый', 'Бордовый', 'Чёрный'],
    rating: 4.8,
    reviews: 41,
    inStock: true,
    stock: 28,
    brand: 'CashmereTouch',
    tags: ['шарф', 'кашемир', 'зима']
  },
  {
    id: 15,
    title: 'Рубашка Oxford',
    description: 'Классическая рубашка из ткани Оксфорд. Приталенный крой, пуговицы из натурального перламутра. Для офиса и особых случаев.',
    price: 3790,
    category: 'Одежда',
    subcategory: 'Рубашки',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Белый', 'Голубой', 'Розовый'],
    rating: 4.5,
    reviews: 62,
    inStock: true,
    stock: 33,
    brand: 'OxfordClassics',
    tags: ['рубашка', 'офис', 'классика']
  },
  {
    id: 16,
    title: 'Рюкзак City Explorer',
    description: 'Городской рюкзак с отделением для ноутбука 15". Водоотталкивающая ткань, эргономичная спинка. Для работы и путешествий.',
    price: 4990,
    oldPrice: 6490,
    category: 'Аксессуары',
    subcategory: 'Рюкзаки',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=750&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: ['Чёрный', 'Серый', 'Тёмно-синий'],
    rating: 4.6,
    reviews: 98,
    inStock: true,
    stock: 24,
    brand: 'TravelMate',
    isSale: true,
    tags: ['рюкзак', 'город', 'ноутбук']
  },
  {
    id: 17,
    title: 'Кожаные ботинки Chelsea',
    description: 'Элегантные ботинки Челси из натуральной кожи. Резиновые вставки, удобная колодка. Классика на все времена.',
    price: 8990,
    category: 'Обувь',
    subcategory: 'Ботинки',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=750&fit=crop'
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Чёрный', 'Коричневый', 'Тан'],
    rating: 4.7,
    reviews: 54,
    inStock: true,
    stock: 16,
    brand: 'BootCraft',
    isNew: true,
    tags: ['ботинки', 'челси', 'кожа']
  },
  {
    id: 18,
    title: 'Худи Oversized Premium',
    description: 'Худи оверсайз из плотного хлопка с начёсом. Большой капюшон, карман-кенгуру. Максимальный комфорт.',
    price: 4290,
    category: 'Одежда',
    subcategory: 'Худи',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1578768079470-c7e4d3bfa187?w=600&h=750&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Чёрный', 'Серый', 'Бежевый', 'Тёмно-зелёный'],
    rating: 4.9,
    reviews: 234,
    inStock: true,
    stock: 42,
    brand: 'ComfyWear',
    isNew: true,
    tags: ['худи', 'оверсайз', 'комфорт']
  },
  {
    id: 19,
    title: 'Серебряный браслет Chain',
    description: 'Элегантный серебряный браслет из стерлингового серебра 925 пробы. Цепочное плетение, надёжный замок.',
    price: 2990,
    category: 'Аксессуары',
    subcategory: 'Украшения',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=750&fit=crop'
    ],
    sizes: ['16 см', '18 см', '20 см'],
    colors: ['Серебро', 'Золото'],
    rating: 4.4,
    reviews: 37,
    inStock: true,
    stock: 30,
    brand: 'SilverCraft',
    tags: ['браслет', 'серебро', 'украшения']
  },
  {
    id: 20,
    title: 'Тренч классический',
    description: 'Классический тренч из водонепроницаемой ткани. Двубортный, с поясом. Элегантная верхняя одежда для межсезонья.',
    price: 9990,
    oldPrice: 13990,
    category: 'Верхняя одежда',
    subcategory: 'Тренчи',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=75',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=75',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Бежевый', 'Чёрный', 'Оливковый'],
    rating: 4.8,
    reviews: 86,
    inStock: true,
    stock: 14,
    brand: 'ClassicCoat',
    isSale: true,
    tags: ['тренч', 'классика', 'весна']
  }
];
