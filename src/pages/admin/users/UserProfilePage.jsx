import { Box, Typography, styled, Tabs, Tab } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import Button from '../../../components/UI/buttons/Button'
import { toast } from 'react-toastify'
import {
   deleteUser,
   getClientById,
} from '../../../store/slices/admin/usersThunk'
import {
   getClientFavoriteHistoryAction,
   getClientPurchaseHistoryAction,
   getClinetBasketHistoryAction,
} from '../../../store/slices/admin/historyActionThunk'

const filterOptionPurchasedStyle = (activeFilter) => ({
   color: activeFilter === 'purchased' ? '#F34901' : 'inherit',
})

const filterOptionFavoriteStyle = (activeFilter) => ({
   color: activeFilter === 'favorite' ? '#F34901' : 'inherit',
})

const filterOptionBasketStyle = (activeFilter) => ({
   color: activeFilter === 'basket' ? '#F34901' : 'inherit',
})

const UserProfilePage = () => {
   const { id } = useParams()
   const [tabValue, setTabValue] = useState(0)
   const [activeFilter, setActiveFilter] = useState('purchased')
   const [loadingBooks, setLoadingBooks] = useState(true)
   const [isModalOpen, setIsModalOpen] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { selectedUser } = useSelector((state) => state.users)
   const {
      basketHistory = [],
      favoriteHistory = [],
      purchaseHistory = [],
   } = useSelector((state) => state.historyActions)

   useEffect(() => {
      if (id) {
         dispatch(getClientById({ clientId: id }))
      }
   }, [dispatch, id])

   useEffect(() => {
      const loadBooks = async () => {
         setLoadingBooks(true)
         if (activeFilter === 'purchased') {
            dispatch(
               getClientPurchaseHistoryAction({
                  userId: id,
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         } else if (activeFilter === 'favorite') {
            dispatch(
               getClientFavoriteHistoryAction({
                  userId: id,
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         } else if (activeFilter === 'basket') {
            dispatch(
               getClinetBasketHistoryAction({
                  userId: id,
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         }
         setLoadingBooks(false)
      }

      if (tabValue === 1 && id) {
         loadBooks()
      }
   }, [tabValue, activeFilter, dispatch, id])

   const books = (() => {
      if (activeFilter === 'purchased') return purchaseHistory || []
      if (activeFilter === 'favorite') return favoriteHistory || []
      if (activeFilter === 'basket') return basketHistory || []
      return []
   })()

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

   const handleConfirmDelete = () => {
      if (selectedUser && selectedUser.clientId) {
         dispatch(deleteUser({ clientId: selectedUser.clientId }))
         setIsModalOpen(false)
         navigate('/admin/users')
         toast.success('Успешно удалено')
      }
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

            <StyledTabs
               value={tabValue}
               onChange={handleTabChange}
               aria-label="profile and books tabs"
            >
               <Tab label="Профиль" />
               <Tab label="История операций" />
            </StyledTabs>

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
                           sx={filterOptionPurchasedStyle(activeFilter)}
                        >
                           <Typography variant="body2" fontWeight={500}>
                              Купленные ({purchaseHistory.length} книг)
                           </Typography>
                        </FilterOption>
                        <FilterOption
                           onClick={() => setActiveFilter('favorite')}
                           sx={filterOptionFavoriteStyle(activeFilter)}
                        >
                           <Typography variant="body2">
                              В избранном ({favoriteHistory.length} книг)
                           </Typography>
                        </FilterOption>
                        <FilterOption
                           onClick={() => setActiveFilter('basket')}
                           sx={filterOptionBasketStyle(activeFilter)}
                        >
                           <Typography variant="body2">
                              В корзине ({basketHistory.length} книг)
                           </Typography>
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
                              <BookImage src={book.image} alt={book.bookName} />
                              <BookDetails>
                                 <Typography variant="body1" fontWeight={500}>
                                    {book.bookName || '-'}
                                 </Typography>
                                 <Typography
                                    variant="body2"
                                    color="text.secondary"
                                 >
                                    {book.authorNames?.join(', ') || '-'}
                                 </Typography>
                              </BookDetails>
                              <Typography variant="body1">
                                 {book.countOfBook !== null &&
                                 book.countOfBook !== undefined
                                    ? `${book.countOfBook} шт.`
                                    : '-'}
                              </Typography>
                              <PriceDetails>
                                 <Typography variant="body1" fontWeight={500}>
                                    {book.price !== null &&
                                    book.price !== undefined
                                       ? `${book.price} с`
                                       : '-'}
                                 </Typography>
                              </PriceDetails>
                              <Typography variant="body1">
                                 {book.date || '-'}
                              </Typography>
                              <Typography variant="body1">
                                 {book.bookStatus || '-'}
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
   marginLeft: '-30px',
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
   borderLeft: '1px solid #e0e0e0',
   paddingLeft: '20px',
   overflowX: 'auto',
   boxSizing: 'border-box',
   width: '1181px',
})

const BookListHeader = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '70px 200px 90px 150px 130px 1fr',
   gap: '20px',
   padding: '10px 0',
   borderBottom: '1px solid #e0e0e0',
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
   gridTemplateColumns: '70px 200px 90px 150px 130px 1fr',
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
   flexDirection: 'row',
   justifyContent: 'flex-end',
   gap: '10px',
   marginTop: '20px',
   alignItems: 'center',
})

const StyledButton = styled(Button)({
   '& .MuiButtonBase-root': {
      marginTop: '100px',
   },
})
