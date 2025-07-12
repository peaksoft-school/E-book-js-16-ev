import { useState, forwardRef } from 'react'
import {
   Card as MuiCard,
   CardMedia,
   CardContent,
   Typography,
   IconButton,
   Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icons } from '../../../assets/icons'
import Button from '../buttons/Button'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useNavigate } from 'react-router'

const BookCard = forwardRef(({ book }, ref) => {
   const [isClicked, setIsClicked] = useState(false)
   const navigate = useNavigate()
   const handleCardClick = () => {
      setIsClicked(!isClicked)
   }

   const getIcon = (type) => {
      switch (type) {
         case 'audio':
            return <AudioIcon src={Icons.headphone} alt="Audio Book" />
         case 'text':
            return ''
         default:
            return null
      }
   }

   const handleClick = () => {
      navigate(`/user/sort/innerpageuser/${book.bookItemId}`)
   }

   console.log(book, 'hello book')
   return (
      <StyledCard isclicked={isClicked.toString()} ref={ref}>
         <StyledCardMedia
            onClick={handleClick}
            component="img"
            image={book.imageUrl}
            alt={book.name}
         />

         <StyledCardContent onClick={handleCardClick}>
            <Box>
               <StyledTypography variant="body1" fontWeight="bold">
                  {book.name.length > 21
                     ? `${book.name.slice(0, 21)}...`
                     : book.name}
               </StyledTypography>
               <StyledTypography variant="caption" color="text.secondary">
                  {Array.isArray(book.author) ? book.author.join(', ') : ''}
               </StyledTypography>
               <StyledTypography variant="body2" fontWeight="bold" mt={0.5}>
                  {book.price} с
               </StyledTypography>
            </Box>

            <AddToCartBox>
               {isClicked ? (
                  <Button variant="warning">Добавить в корзину</Button>
               ) : (
                  <Box sx={{ height: 0 }} />
               )}
            </AddToCartBox>
         </StyledCardContent>

         {isClicked && (
            <IconButton
               sx={{ position: 'absolute', top: 8, right: 8, color: '#F34901' }}
               aria-label="like"
            >
               <FavoriteBorderIcon />
            </IconButton>
         )}

         <HoverIcons className="hover-icons">{getIcon(book.type)}</HoverIcons>
      </StyledCard>
   )
})
export default BookCard

const StyledCard = styled(MuiCard)(({ isclicked }) => ({
   width: '235px',
   position: 'relative',
   cursor: 'pointer',
   border: 'none',
   boxShadow: 'none',
   overflow: 'visible',
   zIndex: isclicked === 'true' ? 10 : 1,
   transition: 'all 0.3s ease',
}))

const StyledCardMedia = styled(CardMedia)({
   width: '235px',
   height: '343px',
})

const StyledCardContent = styled(CardContent)({
   padding: 0,
   display: 'flex',
   flexDirection: 'column',
})

const AddToCartBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: -40,
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   transition: 'opacity 0.3s ease, transform 0.3s ease',
}))

const HoverIcons = styled(Box)({
   position: 'absolute',
   top: 8,
   left: 8,
   display: 'flex',
   gap: '8px',
   opacity: 0,
   transition: 'opacity 0.3s',
   pointerEvents: 'none',
})

const AudioIcon = styled('img')({
   width: '24px',
   height: '24px',
   objectFit: 'contain',
})

const StyledTypography = styled(Typography)({
   '&.MuiTypography-body1': {
      fontSize: '14px',
      color: '#222222',
      lineHeight: '1.4',
      fontWeight: '600',
      textTransform: 'uppercase',
   },
   '&.MuiTypography-caption': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#575757',
      textTransform: 'uppercase',
   },
   '&.MuiTypography-body2:last-child': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#222222',
      textTransform: 'lowercase',
   },
})
