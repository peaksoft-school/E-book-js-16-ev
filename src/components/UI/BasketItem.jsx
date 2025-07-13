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
               <AuthorText variant="body2">
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
                     <OriginalPriceText variant="body2">
                        {item.price} с
                     </OriginalPriceText>
                  )}
                  <CurrentPriceText variant="body1" fontWeight={600}>
                     {item.totalPrice} с
                  </CurrentPriceText>
               </PriceContainer>

               <QuantityControl>
                  <QuantityIconButton onClick={() => onDecrement(item)}>
                     <RemoveIcon fontSize="small" />
                  </QuantityIconButton>
                  <QuantityText>{item.quantity}</QuantityText>
                  <QuantityIconButton onClick={() => onIncrement(item)}>
                     <AddIcon fontSize="small" />
                  </QuantityIconButton>
               </QuantityControl>

               <AddToFavoriteButton
                  variant="text"
                  size="small"
                  startIcon={
                     <FavoriteBorderIcon sx={{ fontSize: '18px !important' }} />
                  }
                  onClick={() => onAddToFavorite(item)}
               >
                  Добавить в избранное
               </AddToFavoriteButton>
            </ItemDetails>

            <RemoveButton onClick={() => onRemove(item)}>
               <DeleteIcon />
            </RemoveButton>
         </ItemContainer>
         <ItemDivider />
      </>
   )
}

export default BasketItem

const ItemContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),
   alignItems: 'flex-start',
   marginBottom: theme.spacing(2),
   paddingTop: theme.spacing(2),
}))

const BookImage = styled('img')(() => ({
   width: 90,
   height: 'auto',
   flexShrink: 0,
}))

const ItemDetails = styled(Box)(() => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   minWidth: 0,
}))

const BookTitle = styled(Typography)(() => ({
   fontWeight: 600,
   fontSize: '1rem',
   lineHeight: 1.3,
}))

const AuthorText = styled(Typography)(({ theme }) => ({
   variant: 'body2',
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

const OriginalPriceText = styled(Typography)(({ theme }) => ({
   textDecoration: 'line-through',
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
}))

const CurrentPriceText = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   fontSize: '1rem',
}))

const QuantityControl = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(0.5),
   marginTop: theme.spacing(1),
   border: '1px solid #e0e0e0',
   borderRadius: theme.shape.borderRadius,
   width: 'fit-content',
   padding: '2px 4px',
}))

const QuantityIconButton = styled(IconButton)(() => ({
   padding: '4px',
   color: '#000',
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
   },
}))

const QuantityText = styled(Typography)(() => ({
   minWidth: '24px',
   textAlign: 'center',
   fontWeight: 500,
   fontSize: '0.9rem',
}))

const AddToFavoriteButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(1),
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
   textTransform: 'none',
   padding: 0,
   justifyContent: 'flex-end',
   '& .MuiButton-startIcon': {
      marginRight: theme.spacing(0.5),
   },
   '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
   },
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(2),
   right: theme.spacing(0),
   color: theme.palette.text.secondary,
   padding: '4px',
}))

const ItemDivider = styled(Divider)(({ theme }) => ({
   marginTop: theme.spacing(2),
   marginBottom: theme.spacing(0),
}))
