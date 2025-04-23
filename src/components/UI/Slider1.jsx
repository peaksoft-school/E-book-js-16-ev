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
            <TitleBox>
               <StyledText>{title}</StyledText>
               {onButtonClick && (
                  <UnderlineButton onClick={onButtonClick}>
                     {buttonText}
                  </UnderlineButton>
               )}
            </TitleBox>

            <BookBox>
               <BookDetails>
                  <BookTitle variant="h4" gutterBottom>
                     {books[index].title}
                  </BookTitle>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                     {books[index].description}
                  </Typography>
                  <Box
                     display="flex"
                     justifyContent="space-between"
                     alignItems="center"
                  >
                     <UnderlineButton>Подробнее</UnderlineButton>
                     <PriceTypography>{books[index].price}</PriceTypography>
                  </Box>
               </BookDetails>

               <SliderBox>
                  {visibleBooks.map((book, i) => (
                     <CardStyled
                        key={i}
                        isActive={i === 0}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                        cardScale={cardScale}
                     >
                        <CardMedia
                           component="img"
                           image={book.img}
                           alt={book.title}
                           sx={{
                              height: '100%',
                              objectFit: 'cover',
                           }}
                        />
                     </CardStyled>
                  ))}
               </SliderBox>
            </BookBox>

            <StyledIconBox>
               <IconButton onClick={handlePrev}>
                  <img src={Icons.leftfill} alt="назад" />
               </IconButton>
               <IconButton onClick={handleNext}>
                  <img src={Icons.rightfill} alt="вперёд" />
               </IconButton>
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

const TitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingRight: '80px',
   marginBottom: theme.spacing(2),
   marginBottom: '45px',
}))

const BookBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(4),
   alignItems: 'flex-end',
}))

const BookDetails = styled(Box)(({ theme }) => ({
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

const BookTitle = styled(Typography)(({ theme }) => ({
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

const PriceTypography = styled(Typography)(({ theme }) => ({
   color: 'orangered',
}))

const SliderBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'flex-end',
   gap: '20px',
   overflow: 'hidden',
   width: 'calc(100% - 120px)',
   marginRight: 0,
   marginLeft: '100px',
}))

const CardStyled = styled(Card)(
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

const UnderlineButton = styled(Button)({
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
