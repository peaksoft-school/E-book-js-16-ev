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
      image: 'https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286',
      title: 'История книги',
      description:
         'Предлагаемый перевод является первой попыткой обращения к творчеству Павла Орозия — римского христианского историка начала V века...',
      price: 456,
      category: 'Бизнес-литература',
   },
   {
      image: 'https://example.com/otherbook.jpg',
      title: 'Детские книги 1',
      description: 'Описание книги для детей.',
      price: 350,
      category: 'Детские книги',
   },
   {
      image: 'https://example.com/otherbook2.jpg',
      title: 'Хобби и досуг',
      description: 'Описание книги о хобби.',
      price: 500,
      category: 'Хобби и досуг',
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
