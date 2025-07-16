import { Images } from '../../assets/images'

const BOOK_SLIDER = [
   {
      id: 1,
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      price: '450 с',
      image: Images.chamberOfSecrets,
   },

   {
      id: 2,
      title: 'Земля обетованная',
      author: 'Эрих Мария Ремарк',
      price: '400 с',
      image: Images.gelobtesLand,
   },

   {
      id: 3,
      title: 'История книги',
      author: 'Э. Эмэр, М. Бахтияров',
      price: '380 с',
      image: Images.historyOfBook,
   },

   {
      id: 4,
      title: 'История grt книги',
      author: 'М. Бахтияров',
      price: '304 с',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptcgd9s87CUvCdCeaU7FuaSiWbX4AO1qccg&s',
   },
]

const LATEST_PUBLICATIONS_BOOKS = [
   {
      image: 'https://books.google.kg/books/publisher/content?id=a1Z3CAAAQBAJ&hl=ru&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3meOhpXTCKeogyfU5QBiLldKln6Q&w=1280',
      title: 'Стив Джобс',
      description:
         'Стив Джобс — человек-легенда мира цифровых технологий, основатель компаний Apple и Next, глава студии Pixar. Он умел иначе смотреть на вещи и понимал, что будет нужно людям завтра. Именно эти качества позволили его компаниям начать отсчет «нового времени» в истории компьютерной отрасли.',
      price: 456,
      category: 'Бизнес-литература',
   },
   {
      image: 'https://loveread.me/img/photo_books/107727.jpg',
      title: 'Заколдованный портрет',
      description:
         '«Рекомендуем! Идеально для тех, кто хочет испугаться».Kirkus ReviewsКлассные страшные истории даже для тех, кто не любит читать!Будет интересно и девочкам, и мальчикам. И есть что обсудить после прочтения.20 рассказов-страшилок, каждый с крупной сюжетной иллюстрацией. Стильно и атмосферно!',
      price: 390,
      category: 'Детские книги',
   },
   {
      image: 'https://cdn.litres.ru/pub/c/cover_415/71388661.webp',
      title: 'Легкость Быт и Я. Как совмещать уборку и любовь к себе',
      description: 'Эксперт по клинингу № 1 в России с 20-летним опытом Аида Синицына, автор популярного блога aida_prodom, делится профессиональными советами, чтобы вы умели грамотно и не напрягаясь, при этом экологично вести быт. Вы узнаете максимум про бюджетные подручные средства...',
      price: 350,
      category: 'Хобби и досуг',
   },
   {
      image: 'https://cdn.litres.ru/pub/c/cover_415/48891443.webp',
      title: 'История твоего «я». Вся правда о deepfake',
      description:
         'Новый интеллектуальный бестселлер! Всю жизнь мы строили своё «Я» – от младенчества до школы, от пубертата до взрослости .Сначала возникло наше физическое «я» – для выживания. Затем – социальное, чтобы мы могли обнаружить себя в мире других людей. Наконец, их поглотило наше сознательное «я», заточившее нас в плен языка, личных мифов и общих для всех нас иллюзий.',
      price: 1200,
      category: 'Публицистика',
   },
   {
      image: 'https://cdn.litres.ru/pub/c/cover_415/72083335.webp',
      title: 'Большая советская экономика. 1917–1991',
      description: 'Труд экономиста и историка Алексея Сафронова – первая книга, вместившая под одной обложкой всю историю советской экономики, от военного коммунизма до перестройки. Вооружившись цифрами и источниками, автор хладнокровно исследует каждый из этапов существования СССР и отвечает...',
      price: 839,
      category: 'Учебная литература',
   },
   {
      image: 'https://loveread.me/img/photo_books/51123.jpg',
      title: 'Осторожно, триггеры',
      description:
         'Весь мир носит маски. Но вот они сорваны! Что скрывается за каждой из них? Философ, сказочник, литературный художник Нил Гейман погружает нас в свежесозданную фантастическую действительность. Отдергивая завесу мнимой реальности, писатель обнажает самые темные уголки человеческой души, препарируя страхи и сомнения, надежды и ожидания.',
      price: 501,
      category: 'Поэзия',
   },
]

const SELLERS = [
   {
      id: 1,
      name: 'Мыктыбек Мыктыбеков',
      phone: '+996 500 123 123',
      email: 'myktybek@gmail.com',
      books: 34,
   },
   {
      id: 2,
      name: 'Мыктыбек Мыктыбеков',
      phone: '+996 500 123 123',
      email: 'myktybek@gmail.com',
      books: 34,
   },
   {
      id: 3,
      name: 'Мыктыбек Мыктыбеков',
      phone: '+996 500 123 123',
      email: 'myktybek@gmail.com',
      books: 34,
   },
]

const VENDORCARDS = [
   {
      img: 'https://cdnn21.img.ria.ru/images/07e5/09/01/1748162077_0:363:2995:2048_1920x1080_80_0_0_abb49dc1d41603260adb27215853058a.jpg',
      text: 'Зарегистрируйтесь как продавец, добавьте информацию о себе и загрузите ваши первые книги в личном кабинете.',
   },
   {
      img: 'https://cdn-1.aki.kg/cdn-st-0/qdP/1/2035429.30191d9f76a927ebb37af9670c2492e5.jpg',
      text: 'Установите цены, напишите привлекательные описания и оформите обложки, чтобы привлечь внимание покупателей.',
   },
   {
      img: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2025-05/LS106504-138%20copy.jpg?itok=aDwRdYAp',
      text: 'Продвигайте свои книги с помощью социальных сетей и специальных акций для увеличения продаж.',
   },
]
const VENDORCARDS2 = [
   {
      img: 'https://www.zakon.kz/pbi/WEBP/2023-12-25/file-144ccacf-11c2-4d97-9ed4-dd67997aa4eb/800x450.webp',
      text: 'Мы удерживаем небольшую комиссию с каждой продажи, а выплаты производятся ежемесячно.',
   },
   {
      img: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2023-09/AP20319639050538.jpg?itok=hSnfLxTK',
      text: 'Вы сами устанавливаете цены на свои книги и можете изменять их в любое время.',
   },
   {
      img: 'https://i.ytimg.com/vi/Y8Q-LfatV0Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYcPOtIuKV-AOmx7nEUHarYBkAUA',
      text: 'Запрещено публиковать контент, нарушающий авторские права или законодательство.',
   },
]
const SLIDER_BOOKS = [
   {
      title: 'Сила настоящего',
      description: 'Путеводитель к духовному просветлению от Экхарта Толле.',
      price: '950 сом',
      img: Images.chamberOfSecrets,
   },
   {
      title: 'Атлант расправил плечи',
      description: 'Философский роман Айн Рэнд о свободе и разуме.',
      price: '1200 сом',
      img: Images.gelobtesLand,
   },
   {
      title: '1984',
      description:
         'Антиутопия Джорджа Оруэлла о тоталитаризме и свободе мысли.',
      price: '800 сом',
      img: Images.historyOfBook,
   },
   {
      title: 'Вино из одуванчиков',
      description:
         'Ностальгическое произведение Рэя Брэдбери о детстве и лете.',
      price: '700 сом',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptcgd9s87CUvCdCeaU7FuaSiWbX4AO1qccg&s',
   },
   {
      title: 'Человек в поисках смысла',
      description: 'Автобиография и логотерапия Виктора Франкла.',
      price: '850 сом',
      img: 'https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286',
   },
]

const AUDIO_BOOKS = [
   {
      title: 'НИ СЫ',
      author: 'Джен Синсеро',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      image: 'https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286',
   },
   {
      title: 'ЗЕЛЕНЫЙ СВЕТ',
      author: 'Мэттью Макконахи',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptcgd9s87CUvCdCeaU7FuaSiWbX4AO1qccg&s',
      isNew: true,
   },
   {
      title: 'ИМПЕРИЯ МЛЕЧНОГО ПУТИ',
      author: 'Книга 3. Пилигрим',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      image: Images.historyOfBook,
   },
]

export {
   LATEST_PUBLICATIONS_BOOKS,
   BOOK_SLIDER,
   SELLERS,
   VENDORCARDS,
   VENDORCARDS2,
   SLIDER_BOOKS,
   AUDIO_BOOKS,
}
