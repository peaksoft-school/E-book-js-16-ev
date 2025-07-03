import { useParams, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   Typography,
   styled,
   Tabs,
   Tab,
   MenuItem,
   Pagination,
   Select,
   FormControl,
   useMediaQuery,
   useTheme,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Modal from '../../../components/UI/Modal'
import Button from '../../../components/UI/buttons/Button'
import SmallBasketCard from '../../../components/UI/cards/SmallBasketCard'
import notify from '../../../utils/helpers/notify'
import {
   deleteVendor,
   findVendorById,
   getAllVendorBooks,
} from '../../../store/admin/vendors/vendorThunk'
import { useEffect, useState } from 'react'
import { BOOK_FILTER } from '../../../utils/helpers/index'
import { Icons } from '../../../assets/icons/index'

const VendorsDetailtPage = () => {
   const [tabValue, setTabValue] = useState(0)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [currentBookPage, setCurrentBookPage] = useState(1)
   const [booksPerPage] = useState(8)
   const [openFilterSelect, setOpenFilterSelect] = useState(false)
   const [selectedBookFilter, setSelectedBookFilter] = useState('все')

   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const theme = useTheme()
   const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
   const isMedium = useMediaQuery(theme.breakpoints.down('md'))

   const { selectedVendor, isLoading, vendorBooks } = useSelector(
      (state) => state.vendor
   )

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
               filterType:
                  selectedBookFilter !== 'все' ? selectedBookFilter : '',
            })
         )
      }
   }, [
      dispatch,
      id,
      tabValue,
      currentBookPage,
      booksPerPage,
      selectedBookFilter,
   ])

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
      if (newValue === 1) {
         setCurrentBookPage(1)
         setSelectedBookFilter('все')
      }
   }

   const handleDeleteProfileClick = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const handleConfirmDelete = () => {
      dispatch(deleteVendor({ vendorId: selectedVendor.vendorId })).then(() => {
         setIsModalOpen(false)
         navigate('/admin/vendors')
         notify({ message: 'Успешно удалено' })
      })
   }

   const handleBookPageChange = (event, value) => {
      setCurrentBookPage(value)
   }

   const handleBookFilterChange = (event) => {
      const value = event.target.value
      setSelectedBookFilter(value)
      setCurrentBookPage(1)
      dispatch(
         getAllVendorBooks({
            vendorId: id,
            pageNumber: 1,
            pageSize: booksPerPage,
            filterType: value !== 'все' ? value : '',
         })
      )
   }

   const DownIcon = () => (
      <img
         src={Icons.down}
         alt="down arrow"
         style={{ width: 16, height: 16 }}
      />
   )

   const UpIcon = () => (
      <img src={Icons.up} alt="up arrow" style={{ width: 16, height: 16 }} />
   )

   return (
      <PageWrapper>
         <ContentBox>
            <Breadcrumbs>
               <Typography variant="body2" color="text.secondary">
                  Продавцы /
               </Typography>
               <Typography variant="body2" fontWeight={500}>
                  {isLoading
                     ? 'Загрузка...'
                     : selectedVendor
                       ? `${selectedVendor.firstName} ${selectedVendor.lastName}`
                       : 'Не найден'}
               </Typography>
            </Breadcrumbs>

            <StyledTabs
               value={tabValue}
               onChange={handleTabChange}
               variant={isSmall ? 'fullWidth' : 'standard'}
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
                           {selectedVendor?.firstName}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Фамилия
                        </Typography>
                        <Typography variant="body1">
                           {selectedVendor?.lastName}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Номер телефона
                        </Typography>
                        <Typography variant="body1">
                           {selectedVendor?.phoneNumber}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Email
                        </Typography>
                        <Typography variant="body1">
                           {selectedVendor?.email}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Дата регистрации
                        </Typography>
                        <Typography variant="body1">
                           {selectedVendor?.dateOfRegistration}
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
                           value={selectedBookFilter}
                           onChange={handleBookFilterChange}
                           displayEmpty
                           onOpen={() => setOpenFilterSelect(true)}
                           onClose={() => setOpenFilterSelect(false)}
                           IconComponent={openFilterSelect ? UpIcon : DownIcon}
                           renderValue={(selected) => {
                              if (selected === '') return <>Все</>
                              const found = BOOK_FILTER.find(
                                 (f) => f.value === selected
                              )
                              return found ? found.label : 'Все'
                           }}
                        >
                           {BOOK_FILTER.map((f) => (
                              <MenuItem
                                 key={f.value}
                                 value={f.value}
                                 sx={{ pl: 3 }}
                              >
                                 {f.label}
                              </MenuItem>
                           ))}
                        </CustomSelect>
                     </NoBorderFormControl>
                     <MoreVertIcon />
                  </BooksHeader>
                  <BookGrid isSmall={isSmall} isMedium={isMedium}>
                     {vendorBooks?.content?.map((book) => (
                        <SmallBasketCard key={book.bookItemId} book={book} />
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
                  <DeleteProfileText onClick={handleDeleteProfileClick}>
                     Удалить профиль
                  </DeleteProfileText>
               </BooksTabContentWrapper>
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
      paddingRight: '7px !important',
      fontSize: 18,
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
   marginRight: -600,
}))
