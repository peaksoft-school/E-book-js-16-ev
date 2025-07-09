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
import { Icons } from '../assets/icons'
import { styled } from '@mui/system'

const Slider = forwardRef(
   (
      {
         books,
         title = 'Бестселлеры',
         buttonText = 'Смотреть все',
         onButtonClick,
         cardWidth = '294px',
         cardHeight = '443px',
         cardScale = 1.1,
         ...rest
      },
      ref
   ) => {
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
                     {buttonText}
                  </StyledUnderlineButton>
               )}
            </StyledTitleBox>

            <StyledBookBox>
               <StyledBookDetails>
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
                  >
                     <StyledUnderlineButton>Подробнее</StyledUnderlineButton>
                     <StyledPriceTypography>
                        {books[index].price}
                     </StyledPriceTypography>
                  </Box>
               </StyledBookDetails>

               <StyledSliderBox>
                  {visibleBooks.map((book, i) => (
                     <StyledCardStyled
                        key={i}
                        isActive={i === 0}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                        cardScale={cardScale}
                     >
                        <StyledCardMedia
                           component="img"
                           image={book.img}
                           alt={book.title}
                        />
                     </StyledCardStyled>
                  ))}
               </StyledSliderBox>
            </StyledBookBox>

            <StyledIconBox>
               <StyledIconButton onClick={handlePrev}>
                  <img src={Icons.leftfill} alt="назад" />
               </StyledIconButton>
               <StyledIconButton onClick={handleNext}>
                  <img src={Icons.rightfill} alt="вперёд" />
               </StyledIconButton>
            </StyledIconBox>
         </StyledBox>
      )
   }
)

export default Slider

const GlobalFont = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
   body {
      font-family: 'Open Sans', sans-serif;
   }
`

const StyledBox = styled(Box)(({ theme }) => ({
   padding: theme.spacing(4),
   paddingLeft: '80px',
   marginRight: '0px',
}))

const StyledTitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingRight: '80px',
   marginBottom: '45px',
}))

const StyledBookBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(4),
   alignItems: 'flex-end',
}))

const StyledBookDetails = styled(Box)(({ theme }) => ({
   maxWidth: 492,
   height: '423px',
   marginRight: '94px',
}))

const StyledIconBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'end',
   marginRight: '80px',
   marginTop: '80px',
}))

const StyledBookTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: '50px',
   marginTop: '45px',
   color: '#222222',
   fontSize: '56px',
   height: '219px',
   width: '448px',
   fontFamily: 'Open Sans, sans-serif',
   marginRight: '10px',
   letterSpacing: '1px',
}))

const StyledText = styled(Typography)(({ theme }) => ({
   fontFamily: 'Open Sans',
   fontWeight: 600,
   fontSize: '24px',
   color: '#1C1C1C',
}))

const StyledPriceTypography = styled(Typography)(({ theme }) => ({
   color: 'orangered',
}))

const StyledSliderBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'flex-end',
   gap: '20px',
   overflow: 'hidden',
   width: 'calc(100% - 120px)',
   marginRight: 0,
   marginLeft: '100px',
}))

const StyledCardStyled = styled(Card)(
   ({ isActive, cardWidth, cardHeight, cardScale }) => ({
      width: isActive ? cardWidth : '220px',
      height: isActive ? cardHeight : '339px',
      transition: 'transform 0.3s',
      transform: isActive ? `scale(${cardScale})` : 'scale(1)',
      alignSelf: 'flex-end',
      transformOrigin: 'bottom center',
      marginRight: isActive ? '40px' : '20px',
   })
)

const StyledUnderlineButton = styled(Button)({
   color: 'orangered',
   textTransform: 'none',
   fontWeight: 400,
   padding: 0,
   minWidth: 'auto',
   lineHeight: 1,
   fontSize: '14px',
   borderRadius: 0,
   backgroundColor: 'transparent',
   borderBottom: '1px solid orangered',
   '&:hover': {
      borderBottom: '1px solid darkorange',
      backgroundColor: 'transparent',
   },
   '&:active': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      borderBottom: '1px solid orangered',
   },
   '&:focus': {
      outline: 'none',
      backgroundColor: 'transparent',
      borderBottom: '1px solid orangered',
   },
   '&:focus-visible': {
      outline: 'none',
   },
   '&:focus-visible:focus': {
      outline: 'none',
      boxShadow: 'none',
   },
})

const StyledIconButton = styled(IconButton)({
   boxShadow: 'none',
   backgroundColor: 'transparent',
   '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
   },
   '&:active': {
      backgroundColor: '#ffffff',
      boxShadow: 'none',
   },
   '&:focus': {
      outline: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
   },
   '&:focus-visible': {
      outline: 'none',
      boxShadow: 'none',
   },
})
const StyledCardMedia = styled(CardMedia)({
   height: '100%',
   width: '100%',
   objectFit: 'contain',
})
