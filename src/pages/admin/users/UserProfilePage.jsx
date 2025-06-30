import {
   Box,
   Typography,
   styled,
   Tabs,
   Tab,
   MenuItem,
   Menu,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

const SELLERS_DATA = [
   {
      id: '1',
      name: 'Мыктыбек Мыктыбеков',
      phone: '+996 500 345 678',
      email: 'myky@gmail.com',
      registrationDate: '21 мая 2019',
   },
   {
      id: '2',
      name: 'Айжан Асанова',
      phone: '+996 777 123 456',
      email: 'aijan@example.com',
      registrationDate: '10 апреля 2020',
   },
   {
      id: '3',
      name: 'Нурлан Кадыров',
      phone: '+996 555 987 654',
      email: 'nurlan@example.com',
      registrationDate: '05 марта 2021',
   },
]

// Mock API functions
const fetchPurchaseHistory = async () => {
   // Simulate API call
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               id: 'p1',
               title: 'Гарри Поттер и тайна...',
               author: 'Роулинг Джоан Кэтлин',
               image: 'https://i.ibb.co/L84Rgw0/harry-potter-min.png',
               quantity: 1,
               originalPrice: 545,
               discountedPrice: 345,
               date: '12.12.21',
               status: 'Завершен',
               hasPromo: true,
            },
            {
               id: 'p2',
               title: 'Гарри Поттер и тайна...',
               author: 'Роулинг Джоан Кэтлин',
               image: 'https://i.ibb.co/L84Rgw0/harry-potter-min.png',
               quantity: 1,
               originalPrice: 345,
               discountedPrice: null,
               date: '12.12.21',
               status: 'Завершен',
               hasPromo: false,
            },
         ])
      }, 500)
   })
}

const fetchFavoriteHistory = async () => {
   // Simulate API call
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               id: 'f1',
               title: 'Фантастические твари и где они обитают',
               author: 'Дж. К. Роулинг',
               image: 'https://via.placeholder.com/60x90?text=Favorite1',
               quantity: 1,
               originalPrice: 400,
               discountedPrice: null,
               date: '10.01.22',
               status: 'В избранном',
               hasPromo: false,
            },
            {
               id: 'f2',
               title: 'Мастер и Маргарита',
               author: 'Михаил Булгаков',
               image: 'https://via.placeholder.com/60x90?text=Favorite2',
               quantity: 1,
               originalPrice: 300,
               discountedPrice: null,
               date: '05.03.22',
               status: 'В избранном',
               hasPromo: false,
            },
            // Add 10 more to make 12 for demo
            ...Array(10)
               .fill(null)
               .map((_, i) => ({
                  id: `f${i + 3}`,
                  title: `Избранная книга ${i + 3}`,
                  author: `Автор ${i + 3}`,
                  image: `https://via.placeholder.com/60x90?text=Fav${i + 3}`,
                  quantity: 1,
                  originalPrice: 250,
                  discountedPrice: null,
                  date: '01.01.23',
                  status: 'В избранном',
                  hasPromo: false,
               })),
         ])
      }, 500)
   })
}

const fetchBasketHistory = async () => {
   // Simulate API call
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               id: 'b1',
               title: '1984',
               author: 'Джордж Оруэлл',
               image: 'https://via.placeholder.com/60x90?text=Basket1',
               quantity: 1,
               originalPrice: 280,
               discountedPrice: null,
               date: '15.02.22',
               status: 'В корзине',
               hasPromo: false,
            },
            {
               id: 'b2',
               title: 'Скотный двор',
               author: 'Джордж Оруэлл',
               image: 'https://via.placeholder.com/60x90?text=Basket2',
               quantity: 1,
               originalPrice: 150,
               discountedPrice: null,
               date: '20.02.22',
               status: 'В корзине',
               hasPromo: false,
            },
            {
               id: 'b3',
               title: 'О дивный новый мир',
               author: 'Олдос Хаксли',
               image: 'https://via.placeholder.com/60x90?text=Basket3',
               quantity: 1,
               originalPrice: 200,
               discountedPrice: null,
               date: '25.02.22',
               status: 'В корзине',
               hasPromo: false,
            },
         ])
      }, 500)
   })
}

const UserProfilePage = () => {
   const { id } = useParams()
   const [tabValue, setTabValue] = useState(0)
   const [anchorEl, setAnchorEl] = useState(null)
   const [currentUser, setCurrentUser] = useState(null)
   const [activeFilter, setActiveFilter] = useState('purchased') // 'purchased', 'favorite', 'basket'
   const [books, setBooks] = useState([])
   const [loadingBooks, setLoadingBooks] = useState(true)

   useEffect(() => {
      const foundSeller = SELLERS_DATA.find((seller) => seller.id === id)
      if (foundSeller) {
         setCurrentUser(foundSeller)
      } else {
         console.warn(`Продавец с ID ${id} не найден.`)
      }
   }, [id])

   useEffect(() => {
      const loadBooks = async () => {
         setLoadingBooks(true)
         let fetchedBooks = []
         if (activeFilter === 'purchased') {
            fetchedBooks = await fetchPurchaseHistory()
         } else if (activeFilter === 'favorite') {
            fetchedBooks = await fetchFavoriteHistory()
         } else if (activeFilter === 'basket') {
            fetchedBooks = await fetchBasketHistory()
         }
         setBooks(fetchedBooks)
         setLoadingBooks(false)
      }

      if (tabValue === 1) {
         // Only load books if "История операций" tab is active
         loadBooks()
      }
   }, [tabValue, activeFilter]) // Re-fetch when tab or filter changes

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   const handleClearHistory = () => {
      // Implement logic to clear history based on activeFilter or a general clear
      console.log('Очистить историю clicked for:', activeFilter)
      // You might want to make an API call here to clear history
      // e.g., /api/historyAction/clearPurchaseHistoryAction
   }

   return (
      <PageWrapper>
         <ContentBox>
            <Breadcrumbs>
               <Typography variant="body2" color="text.secondary">
                  Пользователи /{' '}
               </Typography>
               <Typography variant="body2" fontWeight={500}>
                  {currentUser
                     ? currentUser.name.split(' ')[0]
                     : 'Загрузка...'}{' '}
               </Typography>
            </Breadcrumbs>

            <TabsContainer>
               <StyledTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="profile and books tabs"
               >
                  <Tab label="Профиль" />
                  <Tab label="История операций" />
               </StyledTabs>
            </TabsContainer>

            {tabValue === 0 && currentUser && (
               <ProfileContentWrapper>
                  <ProfileDetailsGrid>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Имя
                        </Typography>
                        <Typography variant="body1">
                           {currentUser.name.split(' ')[0]}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Фамилия
                        </Typography>
                        <Typography variant="body1">
                           {currentUser.name.split(' ')[1]}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Номер телефона
                        </Typography>
                        <Typography variant="body1">
                           {currentUser.phone}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Email
                        </Typography>
                        <Typography variant="body1">
                           {currentUser.email}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Дата регистрации
                        </Typography>
                        <Typography variant="body1">
                           {currentUser.registrationDate}
                        </Typography>
                     </ProfileRow>
                  </ProfileDetailsGrid>
                  <DeleteProfileText>Удалить профиль</DeleteProfileText>
               </ProfileContentWrapper>
            )}
            {tabValue === 0 && !currentUser && (
               <Typography>Загрузка данных профиля...</Typography>
            )}

            {tabValue === 1 && (
               <OperationsContentWrapper>
                  <LeftPanel>
                     {' '}
                     {/* New wrapper for left side */}
                     <ClearHistoryText onClick={handleClearHistory}>
                        Очистить историю
                     </ClearHistoryText>
                     <FilterSidebar>
                        <FilterOption
                           onClick={() => setActiveFilter('purchased')}
                           sx={{
                              color:
                                 activeFilter === 'purchased'
                                    ? '#F34901'
                                    : 'inherit',
                           }}
                        >
                           <Typography variant="body2" fontWeight={500}>
                              Купленные ({books.length} книг)
                           </Typography>
                        </FilterOption>
                        <FilterOption
                           onClick={() => setActiveFilter('favorite')}
                           sx={{
                              color:
                                 activeFilter === 'favorite'
                                    ? '#F34901'
                                    : 'inherit',
                           }}
                        >
                           <Typography variant="body2">
                              В избранном (12 книг)
                           </Typography>{' '}
                           {/* Update this count from API */}
                        </FilterOption>
                        <FilterOption
                           onClick={() => setActiveFilter('basket')}
                           sx={{
                              color:
                                 activeFilter === 'basket'
                                    ? '#F34901'
                                    : 'inherit',
                           }}
                        >
                           <Typography variant="body2">
                              В корзине (3 книг)
                           </Typography>{' '}
                           {/* Update this count from API */}
                        </FilterOption>
                     </FilterSidebar>
                  </LeftPanel>

                  <BookListContainer>
                     <BookListHeader>
                        <Typography variant="body2">Фото</Typography>
                        <Typography variant="body2">Название/Автор</Typography>
                        <Typography variant="body2">Кол-во</Typography>
                        <Typography variant="body2">Цена</Typography>
                        <Typography variant="body2">Дата</Typography>
                        <Typography variant="body2">Состояние</Typography>
                     </BookListHeader>

                     {loadingBooks ? (
                        <Typography sx={{ marginTop: '20px' }}>
                           Загрузка истории...
                        </Typography>
                     ) : (
                        books.map((book) => (
                           <BookItem key={book.id}>
                              <BookImage src={book.image} alt={book.title} />
                              <BookDetails>
                                 <Typography variant="body1" fontWeight={500}>
                                    {book.title}
                                 </Typography>
                                 <Typography
                                    variant="body2"
                                    color="text.secondary"
                                 >
                                    {book.author}
                                 </Typography>
                              </BookDetails>
                              <Typography variant="body1">
                                 {book.quantity} шт.
                              </Typography>
                              <PriceDetails>
                                 {book.hasPromo && (
                                    <Typography
                                       variant="body2"
                                       color="error"
                                       className="promo-text"
                                    >
                                       Промокод 20%
                                    </Typography>
                                 )}
                                 {book.originalPrice && book.hasPromo && (
                                    <OriginalPrice variant="body2">
                                       {book.originalPrice} с
                                    </OriginalPrice>
                                 )}
                                 <Typography variant="body1" fontWeight={500}>
                                    {book.discountedPrice || book.originalPrice}{' '}
                                    с
                                 </Typography>
                              </PriceDetails>
                              <Typography variant="body1">
                                 {book.date}
                              </Typography>
                              <Typography variant="body1">
                                 {book.status}
                              </Typography>
                           </BookItem>
                        ))
                     )}
                  </BookListContainer>
               </OperationsContentWrapper>
            )}
         </ContentBox>
      </PageWrapper>
   )
}

export default UserProfilePage

const PageWrapper = styled(Box)({
   display: 'flex',
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   margin: 0,
   padding: 0,
   boxSizing: 'border-box',
})

const ContentBox = styled(Box)({
   marginLeft: '0px',
   width: '100%',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   padding: '20px',
   boxSizing: 'border-box',
   overflowY: 'auto',
})

const Breadcrumbs = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '4px',
   marginBottom: '20px',
})

const TabsContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center', // Center the tabs
   width: '100%',
   marginBottom: '20px',
})

const StyledTabs = styled(Tabs)({
   '& .MuiTabs-indicator': {
      backgroundColor: '#F34901',
   },
   '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: 500,
      color: '#777',
      '&.Mui-selected': {
         color: '#F34901',
      },
   },
})

const ProfileContentWrapper = styled(Box)({
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   paddingBottom: '20px',
})

const ProfileDetailsGrid = styled(Box)({
   display: 'grid',
   gridTemplateColumns: 'auto 1fr 1fr',
   gap: '45px 140px',
   maxWidth: '600px',
   padding: '20px 0',
})

const ProfileRow = styled(Box)({
   width: '150px',
   fontSize: '16px',
   '& > *:first-of-type': {
      textAlign: 'left',
      color: '#A0A0A0',
   },
   '& > *:last-of-type': {
      textAlign: 'left',
   },
})

const DeleteProfileText = styled(Typography)({
   alignItems: 'end',
   color: '#FF0000',
   fontWeight: 500,
   cursor: 'pointer',
   marginTop: 'auto',
})

// New and updated styled components for the "История операций" tab

const OperationsContentWrapper = styled(Box)({
   display: 'flex',
   flexGrow: 1,
   paddingBottom: '20px',
})

const LeftPanel = styled(Box)({
   width: '200px', // Adjust width as needed for the sidebar
   paddingRight: '20px',
   display: 'flex',
   flexDirection: 'column',
   // Removed borderRight here
})

const ClearHistoryText = styled(Typography)({
   color: '#A0A0A0',
   fontWeight: 500,
   cursor: 'pointer',
   marginBottom: '20px', // Space between "Clear History" and filters
   '&:hover': {
      color: '#F34901',
   },
})

const FilterSidebar = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
   paddingTop: '10px',
})

const FilterOption = styled(Box)({
   cursor: 'pointer',
   '&:hover .MuiTypography-root': {
      color: '#F34901',
   },
   '& .MuiTypography-root': {
      fontWeight: 500,
   },
})

const BookListContainer = styled(Box)({
   flexGrow: 1,
   marginLeft: '20px', // Space between sidebar and book list
   borderTop: '1px solid #e0e0e0',
})

const BookListHeader = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '70px 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr', // Removed the first '120px' column
   gap: '20px',
   padding: '10px 0',
   '& > *': {
      fontWeight: 500,
      color: '#A0A0A0',
   },
})

const BookItem = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '70px 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr', // Removed the first '120px' column
   gap: '20px',
   padding: '15px 0',
   borderBottom: '1px solid #e0e0e0',
   alignItems: 'center',
})

const BookImage = styled('img')({
   width: '60px',
   height: '90px',
   objectFit: 'cover',
   borderRadius: '4px',
})

const BookDetails = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
})

const PriceDetails = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   '& .promo-text': {
      color: '#F34901',
      fontSize: '0.75rem',
      fontWeight: 500,
   },
})

const OriginalPrice = styled(Typography)({
   textDecoration: 'line-through',
   color: '#A0A0A0',
   fontSize: '0.85rem',
})
