import {
   Box,
   Typography,
   IconButton,
   Button,
   Divider,
   styled,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const BasketItem = ({
   item,
   onRemove,
   onIncrement,
   onDecrement,
   onAddToFavorite,
}) => {
   return (
      <>
         <ItemContainer>
            <BookImage src={item.image} alt={item.bookName} />

            <ItemDetails>
               <BookTitle fontWeight={600}>{item.bookName}</BookTitle>

               <AuthorText variant="body2" color="gray">
                  {item.authors.join(', ')}
               </AuthorText>

               {item.discount > 0 && (
                  <DiscountText>
                     {item.discount >= 20 ? 'Промокод' : 'Скидка'}{' '}
                     {item.discount}%
                  </DiscountText>
               )}

               <PriceContainer>
                  {item.discount > 0 && (
                     <OriginalPrice variant="body2">
                        {item.price} с
                     </OriginalPrice>
                  )}
                  <CurrentPrice variant="body1" fontWeight={600}>
                     {item.totalPrice} с
                  </CurrentPrice>
               </PriceContainer>

               <QuantityControl>
                  <IconButton size="small" onClick={() => onDecrement(item)}>
                     <RemoveIcon fontSize="small" />
                  </IconButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <IconButton size="small" onClick={() => onIncrement(item)}>
                     <AddIcon fontSize="small" />
                  </IconButton>
               </QuantityControl>

               <FavoriteButton
                  variant="text"
                  startIcon={<FavoriteBorderIcon />}
                  onClick={() => onAddToFavorite(item)}
               >
                  Добавить в избранное
               </FavoriteButton>
            </ItemDetails>

            <RemoveButton onClick={() => onRemove(item)}>
               <DeleteIcon />
            </RemoveButton>
         </ItemContainer>
         <StyledDivider />
      </>
   )
}

export default BasketItem

// --- Стили ---

const ItemContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),
   alignItems: 'flex-start',
   marginBottom: theme.spacing(2),
}))

const BookImage = styled('img')({
   width: 90,
   height: 'auto',
   flexShrink: 0,
})

const ItemDetails = styled(Box)({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   minWidth: 0,
})

const BookTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '1rem',
   lineHeight: 1.3,
})

const AuthorText = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
   marginTop: theme.spacing(0.5),
}))

const DiscountText = styled(Typography)(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.875rem',
   marginTop: theme.spacing(0.5),
   fontWeight: 500,
}))

const PriceContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1),
   marginTop: theme.spacing(0.5),
}))

const OriginalPrice = styled(Typography)(({ theme }) => ({
   textDecoration: 'line-through',
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
}))

const CurrentPrice = styled(Typography)({
   fontWeight: 600,
   fontSize: '1rem',
})

const QuantityControl = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1),
   marginTop: theme.spacing(1),
}))

const QuantityText = styled(Typography)({
   minWidth: 24,
   textAlign: 'center',
   fontWeight: 500,
   fontSize: '0.9rem',
})

const FavoriteButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(1),
   textTransform: 'none',
   padding: 0,
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
   justifyContent: 'flex-end',
   '& .MuiButton-startIcon': {},
   '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
   },
   marginRight: '-50px',
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
   color: theme.palette.text.secondary,
}))

const StyledDivider = styled(Divider)(({ theme }) => ({
   marginY: theme.spacing(2),
}))
