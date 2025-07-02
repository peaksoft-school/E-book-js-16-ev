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
const GENRES = [
   { label: 'Художественная литература', value: 'FICTION' },
   { label: 'Детские книги', value: 'CHILDRENS' },
   { label: 'Наука и технологии', value: 'SCIENCE_AND_TECHNOLOGY' },
   { label: 'Общество', value: 'SOCIETY' },
   { label: 'Бизнес', value: 'BUSINESS' },
   { label: 'Здоровье и спорт', value: 'HEALTH_BEAUTY_SPORT' },
   { label: 'Хобби', value: 'HOBBIES' },
   { label: 'Психология', value: 'PSYCHOLOGY' },
   { label: 'Учебная литература', value: 'EDUCATION' },
]

const FORMATS = [
   { label: 'Аудио', value: 'AUDIO' },
   { label: 'Бумажные', value: 'PAPER' },
   { label: 'Электронные', value: 'ELECTRONIC' },
]

export { CATEGORIES, NAV_LINKS, GENRES, FORMATS, BOOK_FILTER }
