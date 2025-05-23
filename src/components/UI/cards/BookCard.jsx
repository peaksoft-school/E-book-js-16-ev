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

const BookCard = forwardRef(({ book }, ref) => {
   const [isClicked, setIsClicked] = useState(false)

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

   return (
      <StyledCard
         onClick={handleCardClick}
         isclicked={isClicked.toString()}
         ref={ref}
      >
         <StyledCardMedia component="img" image={book.image} alt={book.title} />

         <StyledCardContent>
            <Box>
               <StyledTypography variant="body2" fontWeight="bold">
                  {book.title}
               </StyledTypography>
               <StyledTypography variant="caption" color="text.secondary">
                  {book.authors}
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
   width: '224px',
   position: 'relative',
   cursor: 'pointer',
   border: 'none',
   transition: 'min-height 0.3s ease',
   boxShadow: 'none',
   overflow: 'visible',
   minHeight: isclicked === 'true' ? '465px' : '422px',
   '&:hover': {
      boxShadow: 'none',
   },
   '&:hover .hover-icons': {
      opacity: 1,
   },
}))

const StyledCardMedia = styled(CardMedia)({
   maxWidth: '224px',
   maxHeight: '343px',
})

const StyledCardContent = styled(CardContent)({
   padding: 8,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   height: 'auto',
})

const AddToCartBox = styled(Box)({
   paddingTop: '8px',
   height: 'auto',
})

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

const EbookIcon = styled('img')({
   width: '24px',
   height: '24px',
   objectFit: 'contain',
})

const StyledTypography = styled(Typography)({
   '&.MuiTypography-body2': {
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
   },
   '&.MuiTypography-body2:last-child': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#222222',
   },
})
