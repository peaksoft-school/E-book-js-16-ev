import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   Typography,
   styled,
   MenuItem,
   Pagination,
   Select,
   FormControl,
   Menu,
} from '@mui/material'
import { Icons } from '../../assets/icons/index'
import { BOOK_FILTER } from '../../utils/helpers'
import BasketCard from '../../components/UI/cards/BasketCard'
import {
   deleteBookItemVendor,
   getAllVendorBooks,
   sortVendorBooks,
} from '../../store/vendor/allBooksThunk'

const BooksPage = () => {
   const [openFilterSelect, setOpenFilterSelect] = useState(false)
   const [selectedBookFilter, setSelectedBookFilter] = useState('все')
   const [anchorEl, setAnchorEl] = useState(null)
   const [selectedBookIdForMenu, setSelectedBookIdForMenu] = useState(null)

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {
      books,
      totalElements,
      totalPages,
      pageNumber,
      pageSize,
      isLoading,
      error,
   } = useSelector((state) => state.allVendorBooks)

   const openMenu = Boolean(anchorEl)

   const handleMenuOpen = (event, bookId) => {
      setAnchorEl(event.currentTarget)
      setSelectedBookIdForMenu(bookId)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
      setSelectedBookIdForMenu(null)
   }

   const handleEdit = () => {
      handleMenuClose()
      if (selectedBookIdForMenu) {
         navigate(`/vendor/allBook/innerpagevendor/${selectedBookIdForMenu}`)
      }
   }

   const handleDelete = async () => {
      handleMenuClose()
      if (selectedBookIdForMenu) {
         await dispatch(
            deleteBookItemVendor({ bookItemId: selectedBookIdForMenu })
         )
         const action =
            selectedBookFilter === 'все' ? getAllVendorBooks : sortVendorBooks

         dispatch(
            action({
               value: selectedBookFilter,
               pageNumber,
               pageSize,
            })
         )
      }
   }

   const handleBookPageChange = (event, value) => {
      const action =
         selectedBookFilter === 'все' ? getAllVendorBooks : sortVendorBooks

      dispatch(
         action({
            value: selectedBookFilter,
            pageNumber: value,
            pageSize,
         })
      )
   }

   const handleBookFilterChange = (event) => {
      const value = event.target.value
      setSelectedBookFilter(value)

      const action = value === 'все' ? getAllVendorBooks : sortVendorBooks

      dispatch(
         action({
            value,
            pageNumber: 1,
            pageSize,
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

   useEffect(() => {
      const action =
         selectedBookFilter === 'все' ? getAllVendorBooks : sortVendorBooks

      dispatch(
         action({
            value: selectedBookFilter,
            pageNumber,
            pageSize,
         })
      )
   }, [dispatch, pageNumber, pageSize, selectedBookFilter])

   return (
      <PageWrapper>
         <ContentBox>
            <BooksTabContentWrapper>
               <BooksHeader>
                  <StyledTypography variant="body1" fontWeight={500}>
                     Всего {totalElements || 0} книг
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
                           if (selected === 'все') return <>Все</>
                           const found = BOOK_FILTER.find(
                              (f) => f.value === selected
                           )
                           return found ? found.label : 'Все'
                        }}
                     >
                        {BOOK_FILTER.map((f) => (
                           <MenuItem key={f.value} value={f.value}>
                              {f.label}
                           </MenuItem>
                        ))}
                     </CustomSelect>
                  </NoBorderFormControl>
               </BooksHeader>

               <Box>
                  {isLoading && <Typography>Загрузка книг...</Typography>}
                  {error && (
                     <Typography color="error">Ошибка: {error}</Typography>
                  )}
                  {!isLoading && !error && books.length === 0 && (
                     <Typography>Книг не найдено.</Typography>
                  )}
                  {!isLoading && !error && books.length > 0 && (
                     <BooksGrid>
                        {books.map((book) => (
                           <BasketCard
                              key={book.bookItemId}
                              title={book.name}
                              image={book.image}
                              price={book.price}
                              year={book.year}
                              basketCount={book.basketCount}
                              likes={book.likes}
                              onclickOption={(e) =>
                                 handleMenuOpen(e, book.bookItemId)
                              }
                           />
                        ))}
                     </BooksGrid>
                  )}
               </Box>

               <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
               >
                  <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
                  <MenuItem onClick={handleDelete}>Удалить</MenuItem>
               </Menu>

               {totalPages > 1 && (
                  <PaginationContainer>
                     <Pagination
                        count={totalPages || 1}
                        page={pageNumber}
                        onChange={handleBookPageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                     />
                  </PaginationContainer>
               )}
            </BooksTabContentWrapper>
         </ContentBox>
      </PageWrapper>
   )
}

export default BooksPage

const PageWrapper = styled(Box)({
   display: 'flex',
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
})

const StyledTypography = styled(Typography)({
   color: 'gray',
   fontSize: '16px',
})

const ContentBox = styled(Box)({
   width: '100%',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   padding: '20px',
   overflowY: 'auto',
})

const BooksTabContentWrapper = styled(Box)({
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: '20px',
   marginLeft: '0px',
})

const BooksHeader = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '20px',
   flexWrap: 'wrap',
}))

const NoBorderFormControl = styled(FormControl)(({ theme }) => ({
   minWidth: 120,
   marginRight: '100px',
   borderBottom: 'none',
   [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      marginTop: '10px',
   },
}))
const CustomSelect = styled(Select)({
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
})

const BooksGrid = styled(Box)(({ theme }) => ({
   paddingRight: '20px',
   display: 'grid',
   rowGap: '6px',
   columnGap: '6px',
   gridTemplateColumns: 'repeat(auto-fill, minmax(329px, 1fr))',
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
   },
}))

const PaginationContainer = styled(Box)({
   marginTop: '20px',
   display: 'flex',
   justifyContent: 'center',
   paddingBottom: '20px',
})
