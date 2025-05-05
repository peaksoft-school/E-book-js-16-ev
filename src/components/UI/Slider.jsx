import { forwardRef, useState } from 'react'
import {
   Box,
   Typography,
   Button,
   Card,
   CardMedia,
   IconButton,
   styled,
} from '@mui/material'
import { Icons } from '../../assets/icons'

const Slider = forwardRef(
   ({ books, onButtonClick, title = 'Бестселлеры', ...rest }, ref) => {
      const [index, setIndex] = useState(0)

      const handlePrev = () =>
         setIndex((prev) => (prev > 0 ? prev - 1 : books.length - 1))

      const handleNext = () =>
         setIndex((prev) => (prev < books.length - 1 ? prev + 1 : 0))

      const visibleBooks = [
         books[index],
         books[(index + 1) % books.length],
         books[(index + 2) % books.length],
      ]

      return (
         <StyledBox ref={ref} {...rest}>
            <StyledTitleBox>
               <StyledText>{title}</StyledText>
               {onButtonClick && (
                  <StyledUnderlineButton onClick={onButtonClick}>
                     Смотреть все
                  </StyledUnderlineButton>
               )}
            </StyledTitleBox>

            <StyledMainBox>
               <StyledBookBox>
                  <StyledBookTitle variant="h4" gutterBottom>
                     {books[index].title}
                  </StyledBookTitle>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                     {books[index].description}
                  </Typography>
                  <StyledInfoBox>
                     <StyledUnderlineButton>Подробнее</StyledUnderlineButton>
                     <StyledPriceTypography>
                        {books[index].price}
                     </StyledPriceTypography>
                  </StyledInfoBox>
               </StyledBookBox>

               <StyledSliderBox>
                  {visibleBooks.map((book, i) => (
                     <StyledCard key={i} isactive={i === 0 ? 1 : 0}>
                        <StyledCardMedia
                           component="img"
                           image={book.img}
                           alt={book.title}
                        />
                     </StyledCard>
                  ))}
               </StyledSliderBox>

               <StyledIconProgressBox>
                  <StyledIconButton onClick={handlePrev}>
                     <img src={Icons.leftfill} alt="Назад" />
                  </StyledIconButton>

                  <StyledIconButton onClick={handleNext}>
                     <img src={Icons.rightfill} alt="Вперёд" />
                  </StyledIconButton>
                  <StyledProgressLine
                     progress={((index + 1) / books.length) * 100}
                     lineWidth={694}
                  />
               </StyledIconProgressBox>
            </StyledMainBox>
         </StyledBox>
      )
   }
)

export default Slider

const StyledBox = styled(Box)({
   width: '100%',
   padding: '2.5rem 1.25rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const StyledTitleBox = styled(Box)({
   width: '100%',
   maxWidth: '75rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '2.8rem',
})

const StyledProgressLine = styled(Box)(({ progress, lineWidth }) => ({
   width: `${lineWidth / 16}rem`,
   height: '0.0625rem',
   backgroundColor: '#e0e0e0',
   borderRadius: '0px',
   overflow: 'hidden',
   '&::after': {
      content: '""',
      display: 'block',
      width: `${progress}%`,
      height: '100%',
      backgroundColor: '#FF4C00',
      transition: 'width 0.3s ease',
   },
}))

const StyledBookBox = styled(Box)({
   maxWidth: '30.75rem',
   display: 'flex',
   flexDirection: 'column',
   marginBottom: '5rem',
})

const StyledSliderBox = styled(Box)({
   display: 'flex',
   gap: '2.5rem',
   overflow: 'hidden',
   marginBottom: '5rem',
   marginRight: '-1.25rem',
})

const StyledBookTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '3.5rem',
   color: '#222',
   marginBottom: '3.125rem',
})

const StyledText = styled(Typography)({
   fontSize: '1.5rem',
   fontWeight: 600,
   color: '#1C1C1C',
})

const StyledPriceTypography = styled(Typography)({
   fontSize: '1.125rem',
   fontWeight: 700,
   color: 'orangered',
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

const StyledMainBox = styled(Box)({
   width: '100%',
   maxWidth: '85rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'flex-end',
   gap: '2.5rem',
   paddingBottom: '3.75rem',
   position: 'relative',
   marginRight: 0,
})

const StyledIconProgressBox = styled(Box)({
   display: 'flex',
   gap: '1.25rem',
   alignItems: 'center',
   position: 'absolute',
   bottom: '1.25rem',
   right: '1.25rem',
   marginTop: '5rem',
})

const StyledIconButton = styled(IconButton)({
   backgroundColor: 'transparent',
   '&:hover': { backgroundColor: 'transparent' },
})

const StyledCard = styled(Card)(({ isactive }) => ({
   width: isactive ? '18.375rem' : '13.75rem',
   height: isactive ? '27.7rem' : '21.2rem',
   transition: 'transform 0.3s ease',
   transform: isactive ? 'scale(1.1)' : 'scale(1)',
   alignSelf: 'flex-end',

   '@media (max-width: 1200px)': {
      width: isactive ? '15.625rem' : '11.875rem',
      height: isactive ? '23.125rem' : '18.125rem',
   },

   '@media (max-width: 800px)': {
      width: isactive ? '12.5rem' : '10rem',
      height: isactive ? '18.75rem' : '15.625rem',
   },

   '@media (max-width: 480px)': {
      width: isactive ? '11.25rem' : '8.75rem',
      height: isactive ? '17.4375rem' : '14.375rem',
   },
}))

const StyledCardMedia = styled(CardMedia)({
   width: '100%',
   height: '100%',
   objectFit: 'contain',
})

const StyledInfoBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginTop: '2rem', // 32px
})
