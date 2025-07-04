import React from 'react'
import { styled } from '@mui/material/styles'
import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   Grid,
   Box,
   Button,
} from '@mui/material'

// Импорт изображения для ленточки "Новинка"
// ВАЖНО: Убедитесь, что файл 'novinka_ribbon.svg' существует по этому пути.
// Если он находится в другом месте, измените путь соответственно.
// Например, если он в src/components/UI/, то './novinka_ribbon.svg'
// Если он в src/assets/icons/, то '../../assets/icons/novinka_ribbon.svg'

const audiobooks = [
   {
      title: 'НИ СЫ',
      author: 'Джен Синсеро',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      // Используем URL из вашего последнего предоставленного кода
      image: 'https://knews.kg/wp-content/uploads/2017/03/knigi.jpg',
   },
   {
      title: 'ЗЕЛЕНЫЙ СВЕТ',
      author: 'Мэттью Макконахи',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      // Используем URL из вашего последнего предоставленного кода
      image: 'https://knews.kg/wp-content/uploads/2017/03/knigi.jpg',
      isNew: true,
   },
   {
      title: 'ИМПЕРИЯ МЛЕЧНОГО ПУТИ',
      author: 'Книга 3. Пилигрим',
      duration: '19 ч. 44 мин. 19 сек.',
      price: '234 с',
      // Используем URL из вашего последнего предоставленного кода
      image: 'https://knews.kg/wp-content/uploads/2017/03/knigi.jpg',
   },
]

// Стилизованные компоненты
const StyledCard = styled(Card)(({ theme }) => ({
   width: '309px',
   borderRadius: '0px',
   position: 'relative',
   overflow: 'hidden',
   boxShadow: 'none',
   transition:
      'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, z-index 0.3s ease-in-out',
   '&:hover': {
      transform: 'scale(1.08)',
      boxShadow: 'none', // Возвращен более видимый box-shadow на hover
      zIndex: 2,
   },
   marginRight: '70px',
}))

const StyledCardMedia = styled(CardMedia)({
   height: '309px',
   width: '100%',
   objectFit: 'cover',
   transition: 'height 0.3s ease-in-out',
})

const NewRibbon = styled('img')({
   position: 'absolute',
   top: '0px',
   right: '0px',
   width: '120px',
   height: '120px',
   objectFit: 'contain',
   zIndex: 3,
   transform: 'rotate(45deg) translate(25%, -25%)',
   transformOrigin: 'top right',
})

const CardContentWrapper = styled(CardContent)({
   padding: '10px',
   transition: 'padding 0.2s ease-in-out',
})

const BookTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '14px',
   marginBottom: '4px',
   textTransform: 'uppercase',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})

const BookAuthor = styled(Typography)({
   color: '#757575',
   fontSize: '14px',
   marginBottom: '4px',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})

const BookInfo = styled(Typography)({
   color: '#212121',
   fontSize: '14px',
   marginBottom: '4px',
})

const StyledTitleBox = styled(Box)({
   width: '100%',
   maxWidth: '75rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '2.8rem',
})
const StyledText = styled(Typography)({
   fontSize: '1.5rem',
   fontWeight: 600,
   color: '#1C1C1C',
})
const StyledUnderlineButton = styled(Button)({
   color: 'orangered',
   textTransform: 'none',
   fontWeight: 400,
   padding: 0,
   fontSize: '0.875rem',
   borderRadius: 0,
   borderBottom: '0.0625rem solid orangered',
   '&:hover': { borderBottom: '0.0625rem solid darkorange' },
})
const BookPrice = styled(Typography)({
   fontWeight: 'bold',
   fontSize: '16px',
   marginTop: '4px',
})

// Новые стилизованные компоненты для выноса инлайн-стилей
const StyledAudiobookCardBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const MainContainer = styled(Box)({
   height: 'auto',
   width: '100%',
   maxWidth: '1280px',
   margin: '0 auto',
   padding: '20px',
})

const HeaderBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'baseline',
   marginBottom: '20px',
})

const HeaderTitle = styled(Typography)({
   fontWeight: 'bold',
})

const ViewAllLink = styled(Typography)({
   cursor: 'pointer',
   color: '#1976d2',
})

const StyledGridContainer = styled(Grid)({
   // Добавляем верхний отступ к контейнеру Grid, чтобы компенсировать отрицательные отступы карточек
   marginTop: '300px', // Увеличьте это значение, если карточки все еще перекрываются
   marginLeft: '50px',
})

const StyledGridItem = styled(Grid)(({ index, totalBooks }) => ({
   display: 'flex',
   justifyContent: 'center',
   // Добавляем отрицательный отступ сверху для эффекта "лестницы"
   marginTop: `${index * -120}px`, // Каждая последующая карточка поднимается на 50px
   // Устанавливаем z-index, чтобы последние карточки были выше
   zIndex: totalBooks - index,
   position: 'relative', // Необходимо для работы z-index
   // Увеличиваем размер средней карточки (индекс 1)
   transform: index === 1 ? 'scale(1.15)' : 'none', // Увеличиваем среднюю карточку на 15%
   transition: 'transform 0.3s ease-in-out', // Добавляем плавный переход для transform
}))

const AudiobookCard = ({ book }) => (
   <StyledCard>
      <StyledCardMedia image={book.image} title={book.title} />
      {/* Используем URL из вашего последнего предоставленного кода для ленточки */}
      {book.isNew && (
         <NewRibbon
            src="https://knews.kg/wp-content/uploads/2017/03/knigi.jpg" // Используем URL из вашего последнего кода
            alt="Новинка"
         />
      )}

      <CardContentWrapper>
         <BookTitle>{book.title}</BookTitle>
         <BookAuthor>{book.author}</BookAuthor>
         <StyledAudiobookCardBox>
            <BookInfo>{book.duration}</BookInfo>
            <BookPrice>{book.price}</BookPrice>
         </StyledAudiobookCardBox>
      </CardContentWrapper>
   </StyledCard>
)

const AudiobooksGrid = ({ onButtonClick }) => {
   return (
      <MainContainer>
         <StyledTitleBox>
            <StyledText>cvhgb</StyledText>
            {onButtonClick && (
               <StyledUnderlineButton>Смотреть все</StyledUnderlineButton>
            )}
         </StyledTitleBox>
         <StyledGridContainer container spacing={3}>
            {audiobooks.map((book, index) => (
               <StyledGridItem
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  index={index} // Передаем index в стилизованный компонент
                  totalBooks={audiobooks.length} // Передаем общее количество книг
               >
                  <AudiobookCard book={book} />
               </StyledGridItem>
            ))}
         </StyledGridContainer>
      </MainContainer>
   )
}

export default AudiobooksGrid
