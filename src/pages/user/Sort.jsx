import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   Breadcrumbs,
   FormControl,
   MenuItem,
   Select,
   Typography,
   styled,
} from '@mui/material'
import { Link } from 'react-router'
import {
   fetchAllSortBooks,
   fetchBestsellers,
} from '../../store/user/userSortThunk'
import FilterPanel from '../../components/Filter'
import BookCard from '../../components/UI/cards/BookCard'
import { Icons } from '../../assets/icons'
import Button from '../../components/UI/buttons/Button'
import Chip from '../../components/UI/Chip'

const SORT = [
   { label: 'Новинки', value: false },
   { label: 'Бестселлеры', value: true },
]

const ITEMS_PER_PAGE = 12

const initialFilterParams = {
   types: [],
   languages: [],
   genres: [],
   startPrice: 1,
   endPrice: 10000,
}

const Sort = () => {
   const dispatch = useDispatch()
   const { books } = useSelector((state) => state.sortBooks)
   const [sort, setSort] = useState('')
   const [openSort, setOpenSort] = useState(false)
   const [visiblePage, setVisiblePage] = useState(1)
   const [activeSort, setActiveSort] = useState('filter')

   const [filterParams, setFilterParams] = useState(initialFilterParams)

   useEffect(() => {
      if (activeSort === 'filter') {
         fetchBooks(filterParams)
      }
   }, [filterParams, activeSort])

   const fetchBooks = (filters) => {
      if (activeSort !== 'filter') return

      const body = {
         types: filters.types,
         languages: filters.languages,
         genres: filters.genres,
         startPrice: filters.startPrice,
         endPrice: filters.endPrice,
      }

      dispatch(fetchAllSortBooks({ body, pageNumber: 1, pageSize: 100 }))
      setVisiblePage(1)
   }

   const visibleBooks = books.slice(0, visiblePage * ITEMS_PER_PAGE)

   const handleShowMore = () => {
      setVisiblePage((prev) => prev + 1)
   }

   const getLabelByValue = (arr, value) =>
      arr.find((item) => item.value === value)?.label || ''

   const DownIcon = () => (
      <img
         src={Icons.down}
         alt="down arrow"
         style={{ width: 16, height: 16, objectFit: 'contain' }}
      />
   )

   const UpIcon = () => (
      <img
         src={Icons.up}
         alt="up arrow"
         style={{ width: 16, height: 16, objectFit: 'contain' }}
      />
   )

   const handleSortChange = (event) => {
      const value = event.target.value
      setSort(value)
      setActiveSort('bestseller')
      setFilterParams(initialFilterParams)
      dispatch(
         fetchBestsellers({
            isBestseller: value,
            pageNumber: 1,
            pageSize: 100,
         })
      )
   }

   const handleFilterChange = (filters) => {
      setActiveSort('filter')
      setFilterParams(filters)
      setSort('')
   }

   const handleDeleteFilter = (field, value) => {
      const updatedParams = {
         ...filterParams,
         [field]: filterParams[field].filter((item) =>
            typeof item === 'object' ? item.id !== value.id : item !== value
         ),
      }

      setFilterParams(updatedParams)
      handleFilterChange(updatedParams)
   }

   return (
      <StyledSortBox>
         <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className="bredC">
               Главная
            </Link>
            <Typography color="text.primary">Фильтрация</Typography>
         </Breadcrumbs>

         <StyledSecondBox>
            <Typography variant="body1" sx={{ color: 'lightGrey' }}>
               Найдены {books?.length || 0} книг
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
               {filterParams.genres.map((genres) => (
                  <Chip
                     key={genres.id || genres}
                     label={genres.name || genres}
                     onDelete={() => handleDeleteFilter('genres', genres)}
                  />
               ))}

               {filterParams.types.map((type) => (
                  <Chip
                     key={type.id || type}
                     label={type.name || type}
                     onDelete={() => handleDeleteFilter('types', type)}
                  />
               ))}

               {filterParams.languages.map((lang) => (
                  <Chip
                     key={lang.id || lang}
                     label={lang.name || lang}
                     onDelete={() => handleDeleteFilter('languages', lang)}
                  />
               ))}
            </Box>

            <NoBorderFormControl>
               <CustomSelect
                  value={sort}
                  onChange={handleSortChange}
                  displayEmpty
                  MenuProps={{ disableScrollLock: true }}
                  IconComponent={openSort ? UpIcon : DownIcon}
                  onOpen={() => setOpenSort(true)}
                  onClose={() => setOpenSort(false)}
                  renderValue={(selected) =>
                     getLabelByValue(SORT, selected) || 'Сортировать'
                  }
               >
                  <MenuItem value="">Сортировать</MenuItem>
                  {SORT.map((g) => (
                     <MenuItem key={g.value} value={g.value}>
                        {g.label}
                     </MenuItem>
                  ))}
               </CustomSelect>
            </NoBorderFormControl>
         </StyledSecondBox>

         <StyledFilterCardBox>
            <FilterPanel
               filterParams={filterParams}
               setFilterParams={setFilterParams}
               onFilterChange={handleFilterChange}
            />

            <Box>
               <StyledCardBox>
                  {visibleBooks.map((book) => (
                     <BookCard key={book.bookItemId} book={book} />
                  ))}
               </StyledCardBox>

               {books.length > 12 && (
                  <Box
                     mt={4}
                     display="flex"
                     width="960px"
                     justifyContent="center"
                  >
                     {visibleBooks.length < books.length ? (
                        <Button variant="large" onClick={handleShowMore}>
                           Смотреть больше
                        </Button>
                     ) : (
                        <Button
                           variant="large"
                           onClick={() => setVisiblePage(1)}
                        >
                           Смотреть меньше
                        </Button>
                     )}
                  </Box>
               )}
            </Box>
         </StyledFilterCardBox>
      </StyledSortBox>
   )
}

export default Sort

const CustomSelect = styled(Select)(() => ({
   width: 150,
   height: 40,
   '&.MuiInputBase-root': {
      border: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      position: 'relative',
   },
   '& .MuiSelect-select': {
      paddingRight: '7px !important',
      fontSize: 18,
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
   minWidth: 150,
   height: 40,
   borderBottom: 'none',
}))

const StyledSortBox = styled(Box)({
   paddingRight: 80,
   paddingLeft: 80,
   gap: 30,
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   marginBottom: 50,
   '& .bredC': {
      color: 'lightGrey',
      borderBottom: 'none',
      textDecoration: 'none',
   },
})

const StyledFilterCardBox = styled(Box)({
   display: 'flex',
   gap: 50,
})
const StyledCardBox = styled(Box)(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   gap: '30px',
   maxWidth: '960px',
}))

const StyledSecondBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})
