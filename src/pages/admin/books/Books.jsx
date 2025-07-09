import { useEffect, useState } from 'react'
import {
   Box,
   Typography,
   Select,
   MenuItem,
   FormControl,
   styled,
   Pagination,
   useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
   setGenre,
   setPageNumber,
   setFormat,
} from '../../../store/admin/books/booksSlice'
import ApplicationCard from '../../../components/UI/cards/ApplicationCard'
import { Icons } from '../../../assets/icons/index'
import Button from '../../../components/UI/buttons/Button'
import { useNavigate, useSearchParams } from 'react-router'
import { FORMATS, GENRES } from '../../../utils/helpers'
import { fetchBooksByGenreAndType } from '../../../store/admin/books/booksThunk'

const BookFilterPage = () => {
   const dispatch = useDispatch()
   const [searchParams, setSearchParams] = useSearchParams()
   const currentPage = Number(searchParams.get('page')) || 1

   const genre = useSelector((state) => state.allBooks.selectedGenre)
   const format = useSelector((state) => state.allBooks.selectedFormat)
   const allBooks = useSelector((state) => state.allBooks.allBooks) || []
   const isLoading = useSelector((state) => state.allBooks.loading)
   const total = useSelector((state) => state.allBooks.totalElements)

   const pageSize = 8
   const totalPages = Math.ceil(total / pageSize)
   const theme = useTheme()
   const navigate = useNavigate()
   const [openGenre, setOpenGenre] = useState(false)
   const [openFormat, setOpenFormat] = useState(false)

   useEffect(() => {
      dispatch(setPageNumber(currentPage))
      dispatch(
         fetchBooksByGenreAndType({
            genre: genre || null,
            type: format || null,
            pageNumber: currentPage,
            pageSize,
         })
      )
   }, [format, genre, currentPage, dispatch])

   const handleGenreChange = (event) => {
      const value = event.target.value
      dispatch(setGenre(value))
      setSearchParams({
         page: 1,
         genre: value,
         type: format || '',
      })
   }

   const handleFormatChange = (event) => {
      const value = event.target.value
      dispatch(setFormat(value))
      setSearchParams({
         page: 1,
         genre: genre || '',
         type: value,
      })
   }

   const handlePageChange = (event, value) => {
      setSearchParams({ page: value.toString() })
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   const getLabelByValue = (arr, val) => {
      const found = arr.find((item) => item.value === val)
      return found ? found.label : ''
   }

   const handleClick = () => {
      navigate(`/admin/books/addbook`)
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
      <Box>
         <StyledBox>
            <Box className="pops">
               <NoBorderFormControl>
                  <CustomSelect
                     value={genre || ''}
                     onChange={handleGenreChange}
                     displayEmpty
                     IconComponent={openGenre ? UpIcon : DownIcon}
                     onOpen={() => setOpenGenre(true)}
                     onClose={() => setOpenGenre(false)}
                     renderValue={(selected) =>
                        selected ? getLabelByValue(GENRES, selected) : 'Жанры'
                     }
                  >
                     <MenuItem className="popText" value="">
                        Жанры
                     </MenuItem>
                     {GENRES.map((g) => (
                        <MenuItem key={g.value} value={g.value}>
                           {g.label}
                        </MenuItem>
                     ))}
                  </CustomSelect>
               </NoBorderFormControl>

               <NoBorderFormControl>
                  <CustomSelect
                     value={format || ''}
                     onChange={handleFormatChange}
                     displayEmpty
                     IconComponent={openFormat ? UpIcon : DownIcon}
                     onOpen={() => setOpenFormat(true)}
                     onClose={() => setOpenFormat(false)}
                     renderValue={(selected) =>
                        selected ? getLabelByValue(FORMATS, selected) : 'Тип'
                     }
                  >
                     <MenuItem className="popText" value="">
                        Тип
                     </MenuItem>
                     {FORMATS.map((f) => (
                        <MenuItem key={f.value} value={f.value}>
                           {f.label}
                        </MenuItem>
                     ))}
                  </CustomSelect>
               </NoBorderFormControl>
            </Box>
            <Button variant="add" onClick={handleClick} icon>
               Добавить книгу
            </Button>
         </StyledBox>

         <StyledTotal>Всего: {total}</StyledTotal>

         <StyledCardBox>
            {isLoading ? (
               <Typography>Загрузка...</Typography>
            ) : allBooks.length === 0 ? (
               <Typography>Нет книг по выбранному фильтру</Typography>
            ) : (
               allBooks.map((book) => (
                  <ApplicationCard key={book.bookItemId} book={book} micon />
               ))
            )}
         </StyledCardBox>
         {totalPages > 1 && !isLoading && (
            <PaginationWrapper>
               <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
               />
            </PaginationWrapper>
         )}
      </Box>
   )
}

export default BookFilterPage

const StyledTotal = styled(Typography)(({ theme }) => ({
   marginBottom: 25,
   color: theme.palette.primary.darkGray,
}))

const StyledBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 10,

   '& .pops': {
      display: 'flex',
      gap: 50,
   },
}))

const StyledCardBox = styled(Box)({
   display: 'flex',
   flexWrap: 'wrap',
   gap: 30,
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
}))

const PaginationWrapper = styled(Box)({
   marginTop: '2rem',
   display: 'flex',
   justifyContent: 'center',
})
