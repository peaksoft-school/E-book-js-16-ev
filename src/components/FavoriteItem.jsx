import {
   Box,
   Typography,
   IconButton,
   Button,
   Divider,
   styled,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Close'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

const FavoriteItem = ({ item, onRemove, onAddToCart }) => {
   return (
      <>
         <ItemContainer>
            <BookImage src={item.image} alt={item.bookName} />

            <ItemDetails>
               <BookTitle fontWeight={600}>{item.bookName}</BookTitle>
               <AuthorText variant="body2">
                  {item.authors.join(', ')}
               </AuthorText>
               <DescriptionText variant="body2">
                  {item.description}
               </DescriptionText>
               <PriceText variant="body1" fontWeight={600}>
                  {item.price} с
               </PriceText>
               <AddToCartButton
                  variant="text"
                  size="small"
                  startIcon={
                     <ShoppingCartOutlinedIcon
                        sx={{ fontSize: '18px !important' }}
                     />
                  }
                  onClick={() => onAddToCart(item)}
               >
                  Добавить в корзину
               </AddToCartButton>
            </ItemDetails>

            <RemoveButton onClick={() => onRemove(item)}>
               <DeleteIcon />
            </RemoveButton>
         </ItemContainer>
         <ItemDivider />
      </>
   )
}

export default FavoriteItem

const ItemContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),
   alignItems: 'flex-start',
   marginBottom: theme.spacing(2),
   paddingTop: theme.spacing(2),
   position: 'relative',
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
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
   marginTop: theme.spacing(0.5),
}))

const DescriptionText = styled(Typography)(({ theme }) => ({
   fontSize: '0.875rem',
   marginTop: theme.spacing(1),
   color: theme.palette.text.primary,
}))

const PriceText = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   fontSize: '1rem',
   marginTop: theme.spacing(1),
}))

const AddToCartButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(1),
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
   textTransform: 'none',
   padding: 0,
   justifyContent: 'flex-start',
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
