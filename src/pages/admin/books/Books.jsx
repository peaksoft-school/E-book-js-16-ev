import { useEffect, useState } from 'react'
import {
   Box,
   Typography,
   Select,
   MenuItem,
   FormControl,
   styled,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBooks } from '../../../store/admin/books/cardAllBooksThunk'
import {
   setGenre,
   setFormat,
   setPageNumber,
} from '../../../store/admin/books/cardAllBooksSlice'
import ApplicationCard from '../../../components/UI/cards/ApplicationCard'
import { Icons } from '../../../assets/icons/index'
import Button from '../../../components/UI/buttons/Button'

const GENRES = [
   { label: 'Художественная литература', value: 'FICTION' },
   { label: 'Детские книги', value: 'CHILDRENS' },
   { label: 'Наука и технологии', value: 'SCIENCE_AND_TECHNOLOGY' },
   { label: 'Общество', value: 'SOCIETY' },
   { label: 'Бизнес', value: 'BUSINESS' },
   { label: 'Здоровье и спорт', value: 'HEALTH_BEAUTY_SPORT' },
   { label: 'Хобби', value: 'HOBBIES' },
   { label: 'Психология', value: 'PSYCHOLOGY' },
   { label: 'Учебная литература', value: 'EDUCATION' },
]

const FORMATS = [
   { label: 'Аудио', value: 'AUDIO' },
   { label: 'Бумажные', value: 'PAPER' },
   { label: 'Электронные', value: 'ELECTRONIC' },
]

const BookFilterPage = () => {
   const dispatch = useDispatch()
   const format = useSelector((state) => state.allBooks.selectedFormat)
   const genre = useSelector((state) => state.allBooks.selectedGenre)
   const allBooks = useSelector((state) => state.allBooks.allBooks) || []
   const isLoading = useSelector((state) => state.allBooks.loading)
   const total = useSelector((state) => state.allBooks.totalElements)

   const [openGenre, setOpenGenre] = useState(false)
   const [openFormat, setOpenFormat] = useState(false)

   const pageNumber = useSelector((state) => state.allBooks.pageNumber)
const pageSize = 8
const totalPages = Math.ceil(total / pageSize)

useEffect(() => {
   dispatch(
      fetchAllBooks({
         type: format && format !== '' ? format : null,
         genre: genre && genre !== '' ? genre : null,
         pageNumber,
         pageSize,
      })
   )
}, [genre, format, pageNumber, dispatch])

   const getLabelByValue = (arr, val) => {
      const found = arr.find((item) => item.value === val)
      return found ? found.label : ''
   }

   const handleGenreChange = (event) => {
      dispatch(setGenre(event.target.value))
   }

   const handleFormatChange = (event) => {
      dispatch(setFormat(event.target.value))
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
            <Box className='pops'>
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
            <Button variant="add" icon>
               Добавить книгу
            </Button>
         </StyledBox>
         <Box>
          <Typography>
            Всего: {total}
          </Typography>
         </Box>

         <StyledCardBox>
            {isLoading ? (
               <Typography>Загрузка...</Typography>
            ) : !Array.isArray(allBooks) || allBooks.length === 0 ? (
               <Typography>Нет книг по выбранному фильтру</Typography>
            ) : (
               allBooks.map((book) => (
                  <ApplicationCard key={book.bookItemId} book={book} micon={true}/>
               ))
            )}
         </StyledCardBox>
         <Box mt={4} display="flex" justifyContent="center" gap={2}>
   <Button
      variant="outlined"
      disabled={pageNumber === 1}
      onClick={() => dispatch(setPageNumber(pageNumber - 1))}
   >
      Назад
   </Button>
   <Typography>
      Страница {pageNumber} из {totalPages}
   </Typography>
   <Button
      variant="outlined"
      disabled={pageNumber === totalPages}
      onClick={() => dispatch(setPageNumber(pageNumber + 1))}
   >
      Вперёд
   </Button>
</Box>

      </Box>
   )
}

export default BookFilterPage

const StyledBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 10,
   '& .pops' : {
    display: 'flex',
    gap: 50,
   }
})

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
