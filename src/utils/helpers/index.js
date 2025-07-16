const CATEGORIES = [
   'Бизнес-литература',
   'Детские книги',
   'Хобби и досуг',
   'Публицистика',
   'Учебная литература',
   'Поэзия',
]

const NAV_LINKS = [
   {label: 'Все книги', to: '/sort'},
   { label: 'Промокоды', to: 'user/promo' },
   { label: 'Начать продавать на eBook', to: '/sell' },
]

const BOOK_FILTER = [
   { value: 'все', label: 'все' },
   { value: 'в избранном', label: 'в избранном' },
   { value: 'в корзине', label: 'в корзине' },
   { value: 'проданы', label: 'проданы' },
   { value: 'со скидками', label: 'со скидкой' },
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

const LANGUAGE = [
   { value: 'RUSSIAN', label: 'Русский' },
   { value: 'KYRGYZ', label: 'Кыргызский' },
   { value: 'ENGLISH', label: 'Английский' },
]

export { CATEGORIES, NAV_LINKS, GENRES, FORMATS, BOOK_FILTER, LANGUAGE }