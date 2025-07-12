import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
   Typography,
   Box,
   styled,
   Button,
   Tabs,
   Tab,
   useMediaQuery,
   useTheme,
} from '@mui/material'
import { VALIDATION_SCHEMA_UPDATE_PROFILE_CLIENT } from '../../utils/helpers/validate'
import {
   deleteProfileByClient,
   getClientProfile,
   updateClientProfile,
   updatePasswordForClient,
} from '../../store/user/profile/profileThunk'
import {
   getClientFavoriteHistoryAction,
   getClientPurchaseHistoryAction,
   getClinetBasketHistoryAction,
} from '../../store/user/profile/historyActionClientThunk'
import { CLIENT_PROFILE_ACTION } from '../../store/user/profile/profileSlice'
import { AUTH_ACTION } from '../../store/slices/authSlice'
import RoleBreadcrumbs from '../../components/UI/innerpagecoms/RoleBreadCrums'
import Input from '../../components/UI/Input'
import notify from '../../utils/helpers/notify'
import Modal from '../../components/UI/Modal'

const ClientProfile = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [currentPassword, setCurrentPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [tabValue, setTabValue] = useState(0)
   const [activeFilter, setActiveFilter] = useState('purchased')
   const [validationErrors, setValidationErrors] = useState({})
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [loadingBooks, setLoadingBooks] = useState(true)

   const theme = useTheme()
   const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
   const isMedium = useMediaQuery(theme.breakpoints.down('md'))

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { error, successMessage, isLoading, profile } = useSelector(
      (state) => state.clientProfile
   )
   const {
      basketHistory = [],
      favoriteHistory = [],
      purchaseHistory = [],
   } = useSelector((state) => state.historyActionsClient)

   useEffect(() => {
      dispatch(getClientProfile())
      return () => {
         dispatch(CLIENT_PROFILE_ACTION.clearClientMessages())
      }
   }, [dispatch])

   useEffect(() => {
      if (profile) {
         setName(profile.name || '')

         setEmail(profile.email || '')
      }
   }, [profile])

   useEffect(() => {
      if (successMessage) {
         notify({ message: successMessage, type: 'success' })
         dispatch(CLIENT_PROFILE_ACTION.clearClientMessages())
      }
      if (error) {
         notify({ message: error, type: 'error' })
         dispatch(CLIENT_PROFILE_ACTION.clearClientMessages())
      }
   }, [successMessage, error, dispatch])

   useEffect(() => {
      const loadBooks = async () => {
         setLoadingBooks(true)
         if (activeFilter === 'purchased') {
            dispatch(
               getClientPurchaseHistoryAction({
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         } else if (activeFilter === 'favorite') {
            dispatch(
               getClientFavoriteHistoryAction({
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         } else if (activeFilter === 'basket') {
            dispatch(
               getClinetBasketHistoryAction({
                  pageNumber: 1,
                  pageSize: 10,
               })
            )
         }
         setLoadingBooks(false)
      }

      if (tabValue === 1) {
         loadBooks()
      }
   }, [tabValue, activeFilter, dispatch])

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
      if (newValue === 1) {
      }
   }

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         setValidationErrors({})

         const isProfileInfoChanged =
            name !== (profile?.name || '') || email !== (profile?.email || '')

         const isPasswordChangeAttempted =
            currentPassword || newPassword || confirmPassword

         if (!isProfileInfoChanged && !isPasswordChangeAttempted) {
            notify({
               message: 'Нет изменений для сохранения.',
               type: 'info',
            })
            return
         }

         VALIDATION_SCHEMA_UPDATE_PROFILE_CLIENT.validate(
            {
               name,
               email,
               currentPassword,
               newPassword,
               confirmPassword,
            },
            { abortEarly: false }
         )
            .then(() => {
               if (isProfileInfoChanged) {
                  dispatch(
                     updateClientProfile({
                        name,
                        email,
                     })
                  )
               }

               if (currentPassword && newPassword && confirmPassword) {
                  dispatch(
                     updatePasswordForClient({
                        currentPassword,
                        newPassword,
                        confirmPassword,
                     })
                  )
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
               }
            })
            .catch((validationErr) => {
               const errors = {}
               if (validationErr.inner) {
                  validationErr.inner.forEach((err) => {
                     errors[err.path] = err.message
                  })
               }
               setValidationErrors(errors)
            })
      },
      [
         name,
         email,
         currentPassword,
         newPassword,
         confirmPassword,
         profile,
         dispatch,
      ]
   )
   const books = (() => {
      if (activeFilter === 'purchased') return purchaseHistory || []
      if (activeFilter === 'favorite') return favoriteHistory || []
      if (activeFilter === 'basket') return basketHistory || []
      return []
   })()

   const filterOptionPurchasedStyle = (activeFilter) => ({
      color: activeFilter === 'purchased' ? '#F34901' : 'inherit',
   })

   const filterOptionFavoriteStyle = (activeFilter) => ({
      color: activeFilter === 'favorite' ? '#F34901' : 'inherit',
   })

   const filterOptionBasketStyle = (activeFilter) => ({
      color: activeFilter === 'basket' ? '#F34901' : 'inherit',
   })

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
      dispatch(deleteProfileByClient())
      setIsModalOpen(false)
      navigate('/')
      dispatch(AUTH_ACTION.logOut())
   }

   return (
      <Box>
         <RoleBreadcrumbs role="client" bookName="Профиль" />

         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               margin: '0 auto',
               minHeight: '80vh',
            }}
         >
            <StyledTabs
               value={tabValue}
               onChange={handleTabChange}
               variant={isSmall ? 'fullWidth' : 'standard'}
               aria-label="profile and books tabs"
            >
               <Tab label="Личная информация" />
               <Tab label="История операций" />
            </StyledTabs>

            {tabValue === 0 && (
               <StyledForm onSubmit={handleSubmit}>
                  <FormWrapper>
                     <StyledLeftForm>
                        <StyledText>Личная информация</StyledText>
                        <Input
                           type="info"
                           placeholder="Напишите ваше имя"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           label="Ваше имя"
                           error={Boolean(validationErrors.name)}
                           helperText={validationErrors.name}
                        />
                        <Input
                           type="info"
                           placeholder="Напишите email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           label="Email"
                           error={Boolean(validationErrors.email)}
                           helperText={validationErrors.email}
                        />
                        <StyledDeleteText onClick={handleDeleteProfileClick}>
                           Удалить профиль?
                        </StyledDeleteText>
                     </StyledLeftForm>

                     <StyledRightForm>
                        <StyledText>Изменить пароль</StyledText>
                        <Input
                           type="password"
                           placeholder="Напишите текущий пароль"
                           value={currentPassword}
                           onChange={(e) => setCurrentPassword(e.target.value)}
                           label="Текущий пароль"
                           error={Boolean(validationErrors.currentPassword)}
                           helperText={validationErrors.currentPassword}
                        />
                        <Input
                           type="password"
                           placeholder="Напишите новый пароль"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           label="Новый пароль"
                           error={Boolean(validationErrors.newPassword)}
                           helperText={validationErrors.newPassword}
                        />
                        <Input
                           type="password"
                           placeholder="Подтвердите пароль"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           label="Подтвердите пароль*"
                           InputLabelProps={{ sx: { color: '#ca3c3c' } }}
                           error={Boolean(validationErrors.confirmPassword)}
                           helperText={validationErrors.confirmPassword}
                        />
                     </StyledRightForm>
                  </FormWrapper>

                  <ButtonWrapper>
                     <StyledCencelButton
                        variant="outlined"
                        onClick={() => navigate(-1)}
                     >
                        Отменить
                     </StyledCencelButton>
                     <StyledSaveButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                     >
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                     </StyledSaveButton>
                  </ButtonWrapper>

                  <Modal open={isModalOpen} handleClose={handleCloseModal}>
                     <ModalContentWrapper>
                        <Typography sx={{ mt: 2 }}>
                           Вы уверены, что хотите удалить профиль?
                        </Typography>
                        <ModalActions>
                           <StyledButton
                              onClick={handleCloseModal}
                              disabled={isLoading}
                           >
                              Отмена
                           </StyledButton>
                           <StyledSaveButton
                              onClick={handleConfirmDelete}
                              variant="contained"
                              disabled={isLoading}
                           >
                              {isLoading ? 'Удаление...' : 'Удалить'}
                           </StyledSaveButton>
                        </ModalActions>
                     </ModalContentWrapper>
                  </Modal>
               </StyledForm>
            )}
            {tabValue === 1 && (
               <OperationsContentWrapper>
                  <LeftPanel>
                     <ClearHistoryText
                        onClick={handleClearHistory}
                     ></ClearHistoryText>
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
         </Box>
      </Box>
   )
}

export default ClientProfile

const StyledForm = styled('form')({
   width: '100%',
   maxWidth: '1250px',
   backgroundColor: '#fff',
   padding: '32px',
   borderRadius: '8px',
   boxShadow: 'none',
})

const StyledRightForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const StyledLeftForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const FormWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   gap: '160px',
   margin: '60px auto',
})

const ButtonWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '10px',
   marginTop: '20px',
})

const StyledText = styled(Typography)({
   fontSize: '18px',
   fontWeight: 600,
   marginBottom: '40px',
})

const StyledDeleteText = styled(Typography)({
   marginBottom: '40px',
   color: 'red',
   marginTop: '30px',
   cursor: 'pointer',
})

const StyledSaveButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
})
const StyledCencelButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
   border: 'none',
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
   backgroundColor: 'white !important',
   color: '#afafaf !important',
   boxShadow: 'none',
})

const StyledTabs = styled(Tabs)({
   marginBottom: '20px',
   margin: '0 auto',

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

const OperationsContentWrapper = styled(Box)({
   display: 'flex',
   flexGrow: 1,
   paddingBottom: '20px',
   width: '100%',
   marginLeft: '100px',
})

const BookListContainer = styled(Box)({
   marginLeft: '10px',
   borderLeft: '1px solid #e0e0e0',
   paddingLeft: '20px',
   overflowX: 'auto',
   boxSizing: 'border-box',
   width: '1181px',
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

const BookListHeader = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '100px 200px 90px 150px 130px 1fr',
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
   gridTemplateColumns: '100px 200px 90px 150px 130px 1fr',
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
const LeftPanel = styled(Box)({
   width: '170px',
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
