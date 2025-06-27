import { forwardRef } from 'react'
import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   IconButton,
   Box,
   styled,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const BasketCard = forwardRef(({ book }, ref) => {
   const { image, name, price, year, basketCount, likes } = book

   return (
      <StyledCard ref={ref}>
         <Box sx={{ position: 'relative' }}>
            <StyledOverlayBox>
               <StyledLikeButton aria-label="add to favorites" size="small">
                  <FavoriteBorderIcon />
               </StyledLikeButton>
               <StyledLikeCount variant="caption">
                  <span>({likes})</span> В корзине <span>({basketCount})</span>
               </StyledLikeCount>
            </StyledOverlayBox>
            <StyledCardMedia component="img" image={image} alt={name} />
            <StyledOptionsButton aria-label="settings" size="small">
               <MoreVertIcon />
            </StyledOptionsButton>
         </Box>
         <StyledCardContent>
            <StyledTitle variant="h6" component="div">
               {name}
            </StyledTitle>
            <StyledSubTitleWrapper mt={1}>
               {year && (
                  <StyledDate variant="body2" color="text.secondary">
                     {year}
                  </StyledDate>
               )}
               <StyledPrice variant="h5" sx={{ mt: 1 }}>
                  {price}
               </StyledPrice>
            </StyledSubTitleWrapper>
         </StyledCardContent>
      </StyledCard>
   )
})

export default BasketCard
const StyledCard = styled(Card)(({ theme }) => ({
   width: 305,
   height: 450,
   padding: '20px 17px 19px 54px',
   background: '#EDEDED',
   borderRadius: '0px',
   boxShadow: 'none',
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
   height: 297,
   width: 197,
   marginTop: '10px',
}))

const StyledOverlayBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
}))
const StyledSubTitleWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({}))
const StyledLikeButton = styled(IconButton)(({ theme }) => ({
   color: '#8A8A8A',
   padding: theme.spacing(0.5),
}))

const StyledLikeCount = styled(Typography)(({ theme }) => ({
   color: '#8A8A8A',
   fontSize: 14,
}))
const StyledTitle = styled(Typography)(({ theme }) => ({
   color: '#222222',
   fontWeight: 600,
   textTransform: 'uppercase',
   fontSize: 14,
   textAlign: 'start',
}))
const StyledDate = styled(Typography)(({ theme }) => ({
   color: '#8A8A8A',
   fontSize: 14,
   fontWeight: 400,
}))
const StyledPrice = styled(Typography)(({ theme }) => ({
   color: '#FF4C00',
   fontSize: 16,
   fontWeight: 600,
}))
const StyledOptionsButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(0),
   right: theme.spacing(1),
   color: '#222222',
}))
