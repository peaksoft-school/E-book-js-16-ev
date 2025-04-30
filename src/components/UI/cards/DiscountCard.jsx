import React, { forwardRef } from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

const DiscountCard = forwardRef(({ book }, ref) => {
   const { title, authors, image, price, discount } = book
   const oldPrice = Math.round(price / (1 - discount / 100))

   return (
      <StyledCard ref={ref}>
         <StyledCardMedia component="img" image={image} alt={title} />
         <StyledCardContent>
            <Typography
               variant="subtitle1"
               fontWeight="bold"
               gutterBottom
               noWrap
            >
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
               {authors}
            </Typography>
            <Box mt={1}>
               <DiscountText variant="body2">(-{discount}%)&nbsp;</DiscountText>
               <OldPrice variant="body2">{oldPrice} с</OldPrice>
               <NewPrice variant="body1">{price} с</NewPrice>
            </Box>
         </StyledCardContent>
      </StyledCard>
   )
})
export default DiscountCard
const StyledCard = styled(Card)(({ theme }) => ({
   maxWidth: '305px',
   borderRadius: '0',
   boxShadow: 'none',
   height: '544px',
}))

const StyledCardMedia = styled(CardMedia)({
   height: '448px',
})

const StyledCardContent = styled(CardContent)(({ theme }) => ({
   paddingLeft: theme.spacing(0),
}))

const DiscountText = styled(Typography)(({ theme }) => ({
   color: '#F10000',
   display: 'inline',
}))

const OldPrice = styled(Typography)(({ theme }) => ({
   textDecoration: 'line-through',
   color: theme.palette.text.secondary,
   marginRight: theme.spacing(1),
   display: 'inline',
}))

const NewPrice = styled(Typography)({
   fontWeight: 'bold',
   display: 'inline',
})
