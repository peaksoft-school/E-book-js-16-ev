const CATEGORIES = [
   'Бизнес-литература',
   'Детские книги',
   'Хобби и досуг',
   'Публицистика',
   'Учебная литература',
   'Поэзия',
]

const NAV_LINKS = [
   { label: 'Электронные книги', to: '/ebooks' },
   { label: 'Audio books', to: '/audio' },
   { label: 'Промокоды', to: '/promo' },
   { label: 'Начать продавать на eBook', to: '/sell' },
]

const BOOK_FILTER = [
   { value: 'избранное', label: 'Избранное' },
   { value: 'корзина', label: 'В корзине' },
   { value: 'продано', label: 'Продано' },
   { value: 'со скидкой', label: 'Со скидкой' },
]
export { CATEGORIES, NAV_LINKS, BOOK_FILTER }
