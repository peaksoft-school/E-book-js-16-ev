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

const SmallBasketCard = forwardRef(({ book }, ref) => {
   const { image, name, price, year, basketCount, likes } = book

   return (
      <SmallStyledCard ref={ref}>
         <Box sx={{ position: 'relative' }}>
            <StyledOverlayBox>
               <StyledLikeButton aria-label="add to favorites" size="small">
                  <FavoriteBorderIcon fontSize="small" />
               </StyledLikeButton>
               <StyledLikeCount variant="caption">
                  <span>({likes})</span> В корзине <span>({basketCount})</span>
               </StyledLikeCount>
            </StyledOverlayBox>
            <SmallStyledCardMedia component="img" image={image} alt={name} />
            <StyledOptionsButton aria-label="settings" size="small">
               <MoreVertIcon fontSize="small" />
            </StyledOptionsButton>
         </Box>
         <StyledCardContent>
            <SmallStyledTitle variant="h6" component="div">
               {name}
            </SmallStyledTitle>
            <StyledSubTitleWrapper mt={1}>
               {year && (
                  <StyledDate variant="body2" color="text.secondary">
                     {year}
                  </StyledDate>
               )}
               <SmallStyledPrice variant="h6" sx={{ mt: 1 }}>
                  {price}
               </SmallStyledPrice>
            </StyledSubTitleWrapper>
         </StyledCardContent>
      </SmallStyledCard>
   )
})

export default SmallBasketCard

const SmallStyledCard = styled(Card)(({ theme }) => ({
   width: 260,
   height: 412,
   padding: '16px 14px 16px 40px',
   background: '#EDEDED',
   borderRadius: '0px',
   boxShadow: 'none',
}))

const SmallStyledCardMedia = styled(CardMedia)(({ theme }) => ({
   height: 260,
   width: 170,
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
   fontSize: 12,
}))

const SmallStyledTitle = styled(Typography)(({ theme }) => ({
   color: '#222222',
   fontWeight: 600,
   textTransform: 'uppercase',
   fontSize: 12,
   textAlign: 'start',
}))

const StyledDate = styled(Typography)(({ theme }) => ({
   color: '#8A8A8A',
   fontSize: 12,
   fontWeight: 400,
}))

const SmallStyledPrice = styled(Typography)(({ theme }) => ({
   color: '#FF4C00',
   fontSize: 14,
   fontWeight: 600,
}))

const StyledOptionsButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(0),
   right: theme.spacing(1),
   color: '#222222',
}))
