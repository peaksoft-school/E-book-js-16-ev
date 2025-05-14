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



export { LATEST_PUBLICATIONS_BOOKS, BOOK_SLIDER, SELLERS }
