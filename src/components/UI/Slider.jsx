import { forwardRef, useState } from 'react'
import {
   Box,
   Typography,
   Button,
   Card,
   CardMedia,
   IconButton,
} from '@mui/material'
import { createGlobalStyle } from 'styled-components'
import { Icons } from '../../assets/icons'
import { styled } from '@mui/system'

const Slider = forwardRef(
   ({ books, onButtonClick, title = 'Бестселлеры', ...rest }, ref) => {
      const [index, setIndex] = useState(0)

      const handlePrev = () => {
         setIndex((prev) => (prev > 0 ? prev - 1 : books.length - 1))
      }

      const handleNext = () => {
         setIndex((prev) => (prev < books.length - 1 ? prev + 1 : 0))
      }

      const visibleBooks = [
         books[index],
         books[(index + 1) % books.length],
         books[(index + 2) % books.length],
      ]

      return (
         <StyledBox ref={ref} {...rest}>
            <GlobalFont />
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
                  <Box
                     display="flex"
                     justifyContent="space-between"
                     alignItems="center"
                     mt={4}
                  >
                     <StyledUnderlineButton>Подробнее</StyledUnderlineButton>
                     <StyledPriceTypography>
                        {books[index].price}
                     </StyledPriceTypography>
                  </Box>
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

               <StyledIconBox>
                  <StyledIconButton onClick={handlePrev}>
                     <img src={Icons.leftfill} alt="Назад" />
                  </StyledIconButton>
                  <StyledIconButton onClick={handleNext}>
                     <img src={Icons.rightfill} alt="Вперёд" />
                  </StyledIconButton>
               </StyledIconBox>
            </StyledMainBox>
         </StyledBox>
      )
   }
)

export default Slider

const StyledBox = styled(Box)({
   width: '100%',
   padding: '40px 20px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const StyledTitleBox = styled(Box)({
   width: '100%',
   maxWidth: '1200px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '45px',
})

const StyledBookBox = styled(Box)({
   maxWidth: '492px',
   display: 'flex',
   flexDirection: 'column',
   marginBottom: '81px',
})

const StyledSliderBox = styled(Box)({
   display: 'flex',
   gap: '40px',
   overflow: 'hidden',
   marginBottom: '80px',
})

const StyledBookTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '56px',
   color: '#222',
   marginBottom: '50px',
})

const StyledText = styled(Typography)({
   fontSize: '24px',
   fontWeight: 600,
   color: '#1C1C1C',
})

const StyledPriceTypography = styled(Typography)({
   fontSize: '18px',
   fontWeight: 700,
   color: 'orangered',
})

const StyledUnderlineButton = styled(Button)({
   color: 'orangered',
   textTransform: 'none',
   fontWeight: 400,
   padding: 0,
   fontSize: '14px',
   borderRadius: 0,
   borderBottom: '1px solid orangered',
   '&:hover': { borderBottom: '1px solid darkorange' },
})

const StyledMainBox = styled(Box)({
   width: '100%',
   maxWidth: '1200px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'flex-end',
   gap: '40px',
   paddingBottom: '60px',
   position: 'relative',
})

const StyledIconBox = styled(Box)({
   display: 'flex',
   gap: '20px',
   justifyContent: 'flex-end',
   alignItems: 'flex-end',
   position: 'absolute',
   bottom: '20px',
   right: '20px',
   zIndex: 1,
   marginTop: '81px',
})

const StyledIconButton = styled(IconButton)({
   backgroundColor: 'transparent',
   '&:hover': { backgroundColor: 'transparent' },
})

const StyledCard = styled(Card)(({ isactive }) => ({
   width: isactive ? '294px' : '220px',
   height: isactive ? '443px' : '339px',
   transition: 'transform 0.3s ease',
   transform: isactive ? 'scale(1.1)' : 'scale(1)',
   alignSelf: 'flex-end',

   '@media (max-width: 1200px)': {
      width: isactive ? '250px' : '190px',
      height: isactive ? '370px' : '290px',
   },

   '@media (max-width: 800px)': {
      width: isactive ? '200px' : '160px',
      height: isactive ? '300px' : '250px',
   },

   '@media (max-width: 480px)': {
      width: isactive ? '180px' : '140px',
      height: isactive ? '280px' : '230px',
   },
}))
const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
  body { font-family: 'Open Sans', sans-serif; }
`
const StyledCardMedia = styled(CardMedia)({
   width: '100%',
   height: '100%',
   objectFit: 'contain',
})
