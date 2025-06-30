import { Box, Typography, styled, Tabs, Tab } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../../store/slices/admin/userProfileThunk'
import Modal from '../../../components/UI/Modal'
import Button from '../../../components/UI/buttons/Button'
import { toast } from 'react-toastify'
import { deleteUser } from '../../../store/slices/admin/usersThunk'

const fetchPurchaseHistory = async () => {
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
            {
               id: 'p3',
               title: 'Очень длинное название книги, которое должно переноситься на новую строку, чтобы не обрезаться.',
               author:
                  'Автор с очень длинным именем и фамилией, которое также должно переноситься.',
               image: 'https://i.ibb.co/L84Rgw0/harry-potter-min.png',
               quantity: 2,
               originalPrice: 1200,
               discountedPrice: 1000,
               date: '01.01.23',
               status: 'Отменен',
               hasPromo: true,
            },
         ])
      }, 500)
   })
}

const fetchFavoriteHistory = async () => {
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
   const [currentUser, setCurrentUser] = useState(null)
   const [activeFilter, setActiveFilter] = useState('purchased')
   const [books, setBooks] = useState([])
   const [loadingBooks, setLoadingBooks] = useState(true)
   const [isModalOpen, setIsModalOpen] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { selectedUser, error, isLoading } = useSelector(
      (state) => state.userProfil
   )
   useEffect(() => {
      if (id) {
         dispatch(getUserById({ clientId: id }))
      }
   }, [dispatch, id])

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
         loadBooks()
      }
   }, [tabValue, activeFilter])

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   const handleClearHistory = () => {
      console.log('Очистить историю clicked for:', activeFilter)
   }
   const handleDeleteProfileClick = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const handleConfirmDelete = (id) => {
      dispatch(deleteUser({ id }))
      setIsModalOpen(false)
      navigate('/admin/users')
      toast.success('Успешно удалено', {})
   }

   return (
      <PageWrapper>
         <ContentBox>
            <Breadcrumbs>
               <Typography variant="body2" color="text.secondary">
                  Пользователи /{' '}
               </Typography>
               <Typography variant="body2" fontWeight={500}>
                  {selectedUser
                     ? selectedUser.firstName.split(' ')[0]
                     : 'Загрузка...'}{' '}
               </Typography>
            </Breadcrumbs>

            <>
               <StyledTabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="profile and books tabs"
               >
                  <Tab label="Профиль" />
                  <Tab label="История операций" />
               </StyledTabs>
            </>

            {tabValue === 0 && selectedUser && (
               <ProfileContentWrapper>
                  <ProfileDetailsGrid>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Имя
                        </Typography>
                        <Typography variant="body1">
                           {selectedUser.firstName.split(' ')[0]}
                        </Typography>
                     </ProfileRow>

                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Email
                        </Typography>
                        <Typography variant="body1">
                           {selectedUser.email}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Дата регистрации
                        </Typography>
                        <Typography variant="body1">
                           {selectedUser.registrationDate}
                        </Typography>
                     </ProfileRow>
                  </ProfileDetailsGrid>
                  <DeleteProfileText onClick={handleDeleteProfileClick}>
                     Удалить профиль
                  </DeleteProfileText>
               </ProfileContentWrapper>
            )}
            {tabValue === 0 && !selectedUser && (
               <Typography>Загрузка данных профиля...</Typography>
            )}

            {tabValue === 1 && (
               <OperationsContentWrapper>
                  <LeftPanel>
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
            <Modal open={isModalOpen} handleClose={handleCloseModal}>
               <ModalContentWrapper>
                  <Typography sx={{ mt: 2 }}>
                     Вы уверены, что хотите удалить профиль?
                  </Typography>
                  <ModalActions>
                     <StyledButton variant="notbor" onClick={handleCloseModal}>
                        Отмена
                     </StyledButton>
                     <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                     >
                        Удалить
                     </Button>
                  </ModalActions>
               </ModalContentWrapper>
            </Modal>
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
   marginLeft: '-20px',
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

const StyledTabs = styled(Tabs)({
   marginBottom: '20px',
   marginLeft: '400px',

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
   gridTemplateColumns: ' 1fr 1fr',
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

const OperationsContentWrapper = styled(Box)({
   display: 'flex',
   flexGrow: 1,
   paddingBottom: '20px',
})

const LeftPanel = styled(Box)({
   width: '150px',
   paddingRight: '20px',
   display: 'flex',
   flexDirection: 'column',
})

const ClearHistoryText = styled(Typography)({
   color: '#A0A0A0',
   fontWeight: 500,
   cursor: 'pointer',
   marginBottom: '20px',
   '&:hover': {
      color: '#F34901',
   },
   fontSize: 13,
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
   marginLeft: '10px',
   borderTop: '1px solid #e0e0e0',
   overflowX: 'auto',
   boxSizing: 'border-box',
   width: '1191px',
})

const BookListHeader = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '70px 300px 90px 150px 150px 1fr',
   gap: '20px',
   padding: '10px 0',
   '& > *': {
      fontWeight: 500,
      color: '#A0A0A0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
})

const BookItem = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '70px 300px 100px 150px 150px 1fr',
   gap: '20px',
   padding: '15px 0',
   borderBottom: '1px solid #e0e0e0',
   alignItems: 'center',
   '& > *': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
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
   '& .MuiTypography-body1, & .MuiTypography-body2': {
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'clip',
   },
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
const ModalContentWrapper = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
})

const ModalActions = styled(Box)({
   display: 'flex',
   flexDirection: 'row', // Explicitly set to row, though it's the default
   justifyContent: 'flex-end', // Aligns buttons to the right side of the modal
   gap: '10px', // Provides spacing between the "Отмена" and "Удалить" buttons
   marginTop: '20px',
   alignItems: 'center', // Vertically centers the buttons if they have different heights (though usually they're the same)
})
const StyledButton = styled(Button)({
   '& .MuiButtonBase-root': {
      marginTop: '100px',
   },
})
