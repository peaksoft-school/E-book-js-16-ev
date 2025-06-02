import {
   Box,
   Typography,
   styled,
   Tabs,
   Tab,
   MenuItem,
   Menu,
} from '@mui/material'
import BasketCard from '../../components/UI/cards/BasketCard'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

const books = [
   {
      id: 1,
      title: 'ИСТОРИЯ КНИГИ',
      authors: 'Э. Эггер, А. Бахтияров',
      price: 549,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDA4JqVRTiUVQJk_xKNB5EiAodQVSkWdKpNw&s',
      type: 'audio',
      discount: 10,
      date: '20 февраля 2021',
   },
   {
      id: 2,
      title: 'ДРУГАЯ КНИГА',
      authors: 'И. Автор',
      price: 450,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDA4JqVRTiUVQJk_xKNB5EiAodQVSkWdKpNw&s',
      type: 'text',
      discount: 20,
      date: '25 марта 2021',
   },
   {
      id: 3,
      title: 'ДРУГАЯ КНИГА',
      authors: 'И. Автор',
      price: 450,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDA4JqVRTiUVQJk_xKNB5EiAodQVSkWdKpNw&s',
      type: 'text',
      discount: 20,
      date: '25 марта 2021',
   },
   {
      id: 4,
      title: 'ДРУГАЯ КНИГА',
      authors: 'И. Автор',
      price: 450,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDA4JqVRTiUVQJk_xKNB5EiAodQVSkWdKpNw&s',
      type: 'text',
      discount: 20,
      date: '25 марта 2021',
   },
]

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

const VendorsDetailtPage = () => {
   const { id } = useParams()
   const [tabValue, setTabValue] = useState(0)
   const [anchorEl, setAnchorEl] = useState(null)
   const [currentSeller, setCurrentSeller] = useState(null)

   useEffect(() => {
      const foundSeller = SELLERS_DATA.find((seller) => seller.id === id)
      if (foundSeller) {
         setCurrentSeller(foundSeller)
      } else {
         console.warn(`Продавец с ID ${id} не найден.`)
      }
   }, [id])
   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   const handleFilterMenuClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleFilterMenuClose = () => {
      setAnchorEl(null)
   }

   return (
      <PageWrapper>
         <ContentBox>
            <Breadcrumbs>
               <Typography variant="body2" color="text.secondary">
                  Продавцы /{' '}
               </Typography>
               <Typography variant="body2" fontWeight={500}>
                  {currentSeller ? currentSeller.name : 'Загрузка...'}{' '}
               </Typography>
            </Breadcrumbs>

            <StyledTabs
               value={tabValue}
               onChange={handleTabChange}
               aria-label="profile and books tabs"
            >
               <Tab label="Профиль" />
               <Tab label="Книги" />
            </StyledTabs>

            {tabValue === 0 && currentSeller && (
               <ProfileContentWrapper>
                  <ProfileDetailsGrid>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Имя
                        </Typography>
                        <Typography variant="body1">
                           {currentSeller.name.split(' ')[0]}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Фамилия
                        </Typography>
                        <Typography variant="body1">
                           {currentSeller.name.split(' ')[1]}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Номер телефона
                        </Typography>
                        <Typography variant="body1">
                           {currentSeller.phone}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Email
                        </Typography>
                        <Typography variant="body1">
                           {currentSeller.email}
                        </Typography>
                     </ProfileRow>
                     <ProfileRow>
                        <Typography variant="body1" fontWeight={500}>
                           Дата регистрации
                        </Typography>
                        <Typography variant="body1">
                           {currentSeller.registrationDate}
                        </Typography>
                     </ProfileRow>
                  </ProfileDetailsGrid>
                  <DeleteProfileText>Удалить профиль</DeleteProfileText>

                  <DeleteProfileText>Удалить</DeleteProfileText>
               </ProfileContentWrapper>
            )}
            {tabValue === 0 && !currentSeller && (
               <Typography>Загрузка данных профиля...</Typography>
            )}

            {tabValue === 1 && (
               <BooksTabContentWrapper>
                  <BooksHeader>
                     <Typography variant="body1" fontWeight={500}>
                        Всего {books.length} книг
                     </Typography>
                     <FilterButton onClick={handleFilterMenuClick}>
                        <Typography variant="body1" fontWeight={500}>
                           Все
                        </Typography>
                        <MoreVertIcon />
                     </FilterButton>
                     <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleFilterMenuClose}
                        PaperProps={{
                           style: {
                              maxHeight: 48 * 4.5,
                              width: '20ch',
                           },
                        }}
                     >
                        <MenuItem onClick={handleFilterMenuClose}>
                           Опубликовано
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuClose}>
                           В черновике
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuClose}>
                           На модерации
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuClose}>
                           Отклонено
                        </MenuItem>
                     </Menu>
                  </BooksHeader>

                  <BookGrid>
                     {books.map((book) => (
                        <BasketCard key={book.id} book={book} />
                     ))}
                  </BookGrid>
               </BooksTabContentWrapper>
            )}
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

const BooksTabContentWrapper = styled(Box)({
   flexGrow: 1,
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: '20px',
})

const BooksHeader = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '20px',
})

const FilterButton = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '4px',
   cursor: 'pointer',
   padding: '4px 8px',
   borderRadius: '4px',
   border: '1px solid #e0e0e0',
   '&:hover': {
      backgroundColor: '#f5f5f5',
   },
})

const BookGrid = styled(Box)({
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',

   gap: '20px',
   justifyContent: 'start',
})
