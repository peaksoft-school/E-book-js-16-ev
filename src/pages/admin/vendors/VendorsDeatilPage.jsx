import { useParams, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   Typography,
   styled,
   Tabs,
   Tab,
   MenuItem,
   Menu,
   Pagination,
   Select,
   FormControl,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Modal from '../../../components/UI/Modal'
import Button from '../../../components/UI/buttons/Button'
import SmallBasketCard from '../../../components/UI/cards/SmallBasketCard'
import notify from '../../../utils/helpers/notify'
import Loading from '../../../components/UI/Loading'
import { Icons } from '../../../assets/icons/index'
import {
   deleteVendor,
   findVendorById,
   getAllVendorBooks,
} from '../../../store/admin/vendors/vendorThunk'
import { useEffect, useState } from 'react'
import { BOOK_FILTER } from '../../../utils/helpers/index'

const VendorsDetailtPage = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { selectedVendor, isLoading, error, vendorBooks } = useSelector(
      (state) => state.vendor
   )

   const [tabValue, setTabValue] = useState(0)
   const [anchorEl, setAnchorEl] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [currentBookPage, setCurrentBookPage] = useState(1)
   const [booksPerPage] = useState(8)
   const [openFormat, setOpenFormat] = useState(false)
   const [format, setFormat] = useState('')

   useEffect(() => {
      if (id) {
         dispatch(findVendorById({ vendorId: id }))
      }
   }, [dispatch, id])

   useEffect(() => {
      if (tabValue === 1 && id) {
         dispatch(
            getAllVendorBooks({
               vendorId: id,
               pageNumber: currentBookPage,
               pageSize: booksPerPage,
            })
         )
      }
   }, [dispatch, id, tabValue, currentBookPage, booksPerPage])

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
      if (newValue === 1) {
         setCurrentBookPage(1)
      }
   }

   const handleFilterMenuClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleFilterMenuClose = () => {
      setAnchorEl(null)
   }

   const handleDeleteProfileClick = (vendorId) => {
      dispatch(deleteVendor({ vendorId: selectedVendor.vendorId }))
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const handleConfirmDelete = () => {
      setIsModalOpen(false)
      navigate('/admin/vendors')
      notify({ message: 'Успешно удалено' })
   }

   const handleBookPageChange = (event, value) => {
      setCurrentBookPage(value)
   }
   const handleFormatChange = (event) => {
      const value = event.target.value
      setFormat(value)

      dispatch(
         getAllVendorBooks({
            vendorId: id,
            pageNumber: 1,
            pageSize: booksPerPage,
            type: value || undefined,
         })
      )
   }

   return (
      <PageWrapper>
         <ContentBox>
            <Breadcrumbs>
               <Typography variant="body2" color="text.secondary">
                  Продавцы /{' '}
               </Typography>
               <Typography variant="body2" fontWeight={500}>
                  {isLoading
                     ? 'Загрузка...'
                     : selectedVendor
                       ? `${selectedVendor.firstName} ${selectedVendor.lastName}`
                       : 'Не найден'}{' '}
               </Typography>
            </Breadcrumbs>

            {isLoading && tabValue === 0 && (
               <LoadingContainer>
                  <Loading />
                  <Typography>Загрузка данных профиля...</Typography>
               </LoadingContainer>
            )}
            {error && tabValue === 0 && (
               <ErrorContainer>
                  <Typography>Ошибка при загрузке профиля: {error}</Typography>
               </ErrorContainer>
            )}

            {!isLoading && !error && !selectedVendor && (
               <NoDataContainer>
                  <Typography>Продавец с ID {id} не найден.</Typography>
               </NoDataContainer>
            )}

            {!isLoading && !error && selectedVendor && (
               <>
                  <StyledTabs
                     value={tabValue}
                     onChange={handleTabChange}
                     aria-label="profile and books tabs"
                  >
                     <Tab label="Профиль" />
                     <Tab label="Книги" />
                  </StyledTabs>

                  {tabValue === 0 && (
                     <ProfileContentWrapper>
                        <ProfileDetailsGrid>
                           <ProfileRow>
                              <Typography variant="body1" fontWeight={500}>
                                 Имя
                              </Typography>
                              <Typography variant="body1">
                                 {selectedVendor.firstName}
                              </Typography>
                           </ProfileRow>
                           <ProfileRow>
                              <Typography variant="body1" fontWeight={500}>
                                 Фамилия
                              </Typography>
                              <Typography variant="body1">
                                 {selectedVendor.lastName}
                              </Typography>
                           </ProfileRow>
                           <ProfileRow>
                              <Typography variant="body1" fontWeight={500}>
                                 Номер телефона
                              </Typography>
                              <Typography variant="body1">
                                 {selectedVendor.phoneNumber}
                              </Typography>
                           </ProfileRow>
                           <ProfileRow>
                              <Typography variant="body1" fontWeight={500}>
                                 Email
                              </Typography>
                              <Typography variant="body1">
                                 {selectedVendor.email}
                              </Typography>
                           </ProfileRow>
                           <ProfileRow>
                              <Typography variant="body1" fontWeight={500}>
                                 Дата регистрации
                              </Typography>
                              <Typography variant="body1">
                                 {selectedVendor.dateOfRegistration}
                              </Typography>
                           </ProfileRow>
                        </ProfileDetailsGrid>

                        <DeleteProfileText onClick={handleDeleteProfileClick}>
                           Удалить профиль
                        </DeleteProfileText>
                     </ProfileContentWrapper>
                  )}

                  {tabValue === 1 && (
                     <BooksTabContentWrapper>
                        <BooksHeader>
                           <StyledTypography variant="body1" fontWeight={500}>
                              Всего {vendorBooks?.totalElements || 0} книг
                           </StyledTypography>
                           <NoBorderFormControl>
                              <CustomSelect
                                 value={format}
                                 onChange={handleFormatChange}
                                 displayEmpty
                                 onOpen={() => setOpenFormat(true)}
                                 onClose={() => setOpenFormat(false)}
                                 renderValue={(selected) => {
                                    if (selected === '') return <>Все</>
                                    const found = BOOK_FILTER.find(
                                       (f) => f.value === selected
                                    )
                                    return found ? found.label : 'Тип'
                                 }}
                              >
                                 <MenuItem value="">Все</MenuItem>
                                 {BOOK_FILTER.map((f) => (
                                    <MenuItem key={f.value} value={f.value}>
                                       {f.label}
                                    </MenuItem>
                                 ))}
                              </CustomSelect>
                           </NoBorderFormControl>

                           <MoreVertIcon />
                        </BooksHeader>

                        {vendorBooks?.isLoading ? (
                           <LoadingContainer>
                              <Loading />
                              <Typography>Загрузка книг...</Typography>
                           </LoadingContainer>
                        ) : vendorBooks?.error ? (
                           <ErrorContainer>
                              <Typography>
                                 Ошибка при загрузке книг: {vendorBooks?.error}
                              </Typography>
                           </ErrorContainer>
                        ) : vendorBooks?.content?.length === 0 ? (
                           <NoDataContainer>
                              <Typography>
                                 У этого продавца пока нет книг.
                              </Typography>
                           </NoDataContainer>
                        ) : (
                           <>
                              <BookGrid>
                                 {vendorBooks?.content?.map((book) => (
                                    <SmallBasketCard
                                       key={book.bookItemId}
                                       book={book}
                                    />
                                 ))}
                              </BookGrid>
                              {vendorBooks?.totalPages > 1 && (
                                 <PaginationContainer>
                                    <Pagination
                                       count={vendorBooks?.totalPages || 1}
                                       page={currentBookPage}
                                       onChange={handleBookPageChange}
                                       color="primary"
                                       size="large"
                                       showFirstButton
                                       showLastButton
                                    />
                                 </PaginationContainer>
                              )}
                           </>
                        )}
                        <DeleteProfileText onClick={handleDeleteProfileClick}>
                           Удалить профиль
                        </DeleteProfileText>
                     </BooksTabContentWrapper>
                  )}
               </>
            )}

            <Modal open={isModalOpen} handleClose={handleCloseModal}>
               <ModalContentWrapper>
                  <Typography sx={{ mt: 2 }}>
                     Вы уверены, что хотите удалить профиль?
                  </Typography>
                  <ModalActions>
                     <StyledButton onClick={handleCloseModal}>
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

export default VendorsDetailtPage

const PageWrapper = styled(Box)({
   display: 'flex',
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   margin: 0,
   padding: 0,
   boxSizing: 'border-box',
})

const StyledTypography = styled(Typography)({
   color: 'gray',
   fontSize: '16px',
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
   paddingBottom: '20px',
   marginLeft: '-20px',
})

const ProfileDetailsGrid = styled(Box)({
   display: 'grid',
   gridTemplateColumns: 'auto 1fr 1fr',
   gap: '45px 140px',
   maxWidth: '600px',
   padding: '10px 0',
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
   marginTop: '30px',
})

const BooksTabContentWrapper = styled(Box)({
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: '20px',
   marginLeft: '-21px',
})

const BooksHeader = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '20px',
   backgroundColor: 'red',
})

const BookGrid = styled(Box)({
   display: 'grid',
   gridTemplateColumns: 'auto auto auto auto ',
   gap: '20px',
   justifyContent: 'start',
})

const LoadingContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   gap: '10px',
   color: '#1976d2',
})

const ErrorContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   color: 'red',
   fontSize: '1.2rem',
   fontWeight: 'bold',
})

const NoDataContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   minHeight: '200px',
   color: '#757575',
   fontSize: '1.2rem',
   marginLeft: '400px',
})

const PaginationContainer = styled(Box)({
   marginTop: '20px',
   display: 'flex',
   justifyContent: 'center',
   paddingBottom: '20px',
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
const CustomSelect = styled(Select)(() => ({
   '&.MuiInputBase-root': {
      border: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      position: 'relative',
   },
   '& .MuiSelect-select': {
      paddingRight: '9px !important',
      fontSize: 16,
      width: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 500,
   },
   '& fieldset': {
      border: 'none',
   },
   '&:hover fieldset': {
      border: 'none',
   },
   '&.Mui-focused fieldset': {
      border: 'none',
   },
   '& svg': {
      color: '#000',
      position: 'absolute',
   },
}))

const NoBorderFormControl = styled(FormControl)(() => ({
   minWidth: 100,
   borderBottom: 'none',
}))
