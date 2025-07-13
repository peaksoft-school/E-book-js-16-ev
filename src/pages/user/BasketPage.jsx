import { useEffect } from 'react'
import {
   Box,
   Typography,
   Paper,
   Button,
   TextField,
   CircularProgress,
   Alert,
   styled,
   Divider,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import BasketItem from '../../components/UI/BasketItem'
import {
   basketDelete,
   basketDeleteById,
   decreaseQuantityBookItem,
   getAll,
   increaseQuantityBookItem,
   payment,
   addFavoriteBookForClient,
} from '../../store/user/basket/basketThunk'
import { BASKET_ACTION } from '../../store/user/basket/basketSlice'
import notify from '../../utils/helpers/notify'

const BasketPage = () => {
   const dispatch = useDispatch()
   const { basket, summary, isLoading, error, sessionUrl } = useSelector(
      (state) => state.basket
   )

   const handlePayment = async () => {
      const amount = summary.totalPrice - summary.discount
      const basketId = basket[0]?.basketId

      if (!basketId) {
         alert('Ошибка: отсутствует basketId')
         return
      }

      const resultAction = await dispatch(payment({ amount, basketId }))

      if (payment.fulfilled.match(resultAction)) {
         const url = resultAction.payload.sessionUrl
         if (url) {
            window.location.href = url // редирект на оплату
         } else {
            alert('Ошибка: не получен sessionUrl')
         }
      } else {
         alert('Ошибка при создании платежа')
      }
   }

   useEffect(() => {
      dispatch(getAll({ pageNumber: 1, pageSize: 20 }))
      return () => {
         dispatch(BASKET_ACTION.clearBasketError())
      }
   }, [dispatch])

   const refetchBasket = () => {
      dispatch(getAll({ pageNumber: 1, pageSize: 20 }))
   }

   const handleRemove = async (item) => {
      const resultAction = await dispatch(
         basketDeleteById({ bookId: item.bookItemId })
      )
      if (basketDeleteById.fulfilled.match(resultAction)) {
         refetchBasket()
      }
   }

   const handleIncrement = async (item) => {
      const resultAction = await dispatch(
         increaseQuantityBookItem({ bookItemId: item.bookItemId })
      )
      if (increaseQuantityBookItem.fulfilled.match(resultAction)) {
         refetchBasket()
      }
   }

   const handleDecrement = async (item) => {
      if (item.quantity > 1) {
         const resultAction = await dispatch(
            decreaseQuantityBookItem({ bookItemId: item.bookItemId })
         )
         if (decreaseQuantityBookItem.fulfilled.match(resultAction)) {
            refetchBasket()
         }
      }
   }

   const handleClearBasket = async () => {
      const resultAction = await dispatch(basketDelete())
      if (basketDelete.fulfilled.match(resultAction)) {
         refetchBasket()
      }
   }

   const handleAddToFavorite = async (item) => {
      const resultAction = await dispatch(
         addFavoriteBookForClient({ bookItemId: item.bookItemId })
      )
      if (addFavoriteBookForClient.fulfilled.match(resultAction)) {
         notify({ message: 'Книга добавлена в избранное' })
      } else {
         notify({ type: 'error', message: 'Книга добавлена в избранное' })
      }
   }

   if (isLoading) {
      return (
         <LoadingBox>
            <CircularProgress />
         </LoadingBox>
      )
   }

   return (
      <Container>
         <LeftBox>
            <HeaderTypography variant="h6">
               Ваши книги
               <TotalItemsText variant="body2">
                  Всего: {summary.quantityOfBookItems}
               </TotalItemsText>
            </HeaderTypography>

            <Divider sx={{ width: '100%' }} />

            {error &&
               error.message &&
               notify({
                  message: `${error.message}`,
               })}

            {basket.length > 0 && (
               <ClearBasketText onClick={handleClearBasket}>
                  Очистить корзину
               </ClearBasketText>
            )}

            {basket.length === 0 ? (
               <EmptyBasketText mt={3}>Корзина пуста</EmptyBasketText>
            ) : (
               basket.map((item) => (
                  <BasketItem
                     key={item.bookItemId}
                     item={item}
                     onRemove={() => handleRemove(item)}
                     onIncrement={() => handleIncrement(item)}
                     onDecrement={() => handleDecrement(item)}
                     onAddToFavorite={() => handleAddToFavorite(item)} // передаем в BasketItem
                  />
               ))
            )}
         </LeftBox>
         <Box>
            <StyledPaper elevation={2}>
               <Typography variant="h6" mb={2}>
                  Общая стоимость
               </Typography>
               <Typography>
                  Количество книг: {summary.quantityOfBookItems} шт
               </Typography>
               <Typography>Скидка: {summary.discount} с</Typography>
               <Typography>Сумма: {summary.totalPrice} с</Typography>

               <PromoTextField
                  fullWidth
                  size="small"
                  placeholder="Введите промокод"
                  InputProps={{ endAdornment: '>' }}
               />

               <TotalAmountText fontWeight={700} mb={2}>
                  Итого: {summary.totalPrice - summary.discount} с
               </TotalAmountText>
            </StyledPaper>
            <OrderButton fullWidth variant="contained" onClick={handlePayment}>
               Оформить заказ
            </OrderButton>
         </Box>
      </Container>
   )
}

export default BasketPage

const Container = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(4),
   padding: theme.spacing(4),
}))

const LeftBox = styled(Box)(() => ({
   flex: 4,
   display: 'flex',
   flexDirection: 'column',
   width: '799px',
   padding: '51px',
}))

const HeaderTypography = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '20px',
}))

const TotalItemsText = styled(Typography)(() => ({
   color: 'grey',
}))

const ClearBasketText = styled(Typography)(() => ({
   cursor: 'pointer',
   color: 'gray',
   textAlign: 'right',
   marginTop: '10px',
}))

const EmptyBasketText = styled(Typography)(({ theme }) => ({
   marginTop: theme.spacing(3),
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
   flex: 1,
   padding: theme.spacing(3),
   width: '374px',
   borderRadius: '0px',
   marginBottom: '10px',
}))

const LoadingBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '80vh',
}))

const PromoTextField = styled(TextField)(({ theme }) => ({
   marginTop: theme.spacing(2),
   marginBottom: theme.spacing(2),
}))

const TotalAmountText = styled(Typography)(({ theme }) => ({
   fontWeight: 700,
   marginBottom: theme.spacing(2),
}))

const OrderButton = styled(Button)(() => ({
   background: '#000',
   borderRadius: '0px',
   width: '374px',
}))

const ErrorAlert = styled(Alert)(({ theme }) => ({
   marginBottom: theme.spacing(2),
}))
