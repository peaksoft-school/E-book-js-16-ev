import { useEffect } from 'react'
import {
   Box,
   Typography,
   CircularProgress,
   Alert,
   styled,
   Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import FavoriteItem from '../../components/FavoriteItem'
import { FAVORITE_ACTION } from '../../store/user/favorites/userFavoritesSlice'
import {
   getAllFavorites,
   deleteFavoriteById,
   deleteAllFavorites,
   addBookToBasket,
} from '../../store/user/favorites/userFavoritesThunk'
import notify from '../../utils/helpers/notify'
import RoleBreadcrumbs from '../../components/UI/innerpagecoms/RoleBreadCrums'

const FavoritesPage = () => {
   const dispatch = useDispatch()
   const { favorites, totalFavorites, isLoading, error } = useSelector(
      (state) => state.favorite
   )

   useEffect(() => {
      dispatch(getAllFavorites({ pageNumber: 1, pageSize: 20 }))
      return () => {
         dispatch(FAVORITE_ACTION.clearFavoriteError())
      }
   }, [dispatch])

   const handleRemoveFromFavorites = async (item) => {
      await dispatch(deleteFavoriteById({ bookItemId: item.bookItemId }))
   }

   const handleAddToBasket = async (item) => {
      const resultAction = await dispatch(
         addBookToBasket({ bookItemId: item.bookItemId })
      )
      if (addBookToBasket.fulfilled.match(resultAction)) {
         notify({ message: 'Книга добавлена в корзину' })
      } else {
         notify({ type: 'error', message: 'Ошибка при добавлении в корзину' })
      }
   }

   const handleClearAllFavorites = async () => {
      const resultAction = await dispatch(deleteAllFavorites())
      if (deleteAllFavorites.fulfilled.match(resultAction)) {
         notify({ message: 'Все избранные книги удалены' })
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
         <HeaderBox>
            <RoleBreadcrumbs role="client2" bookName="Избранные" />
         </HeaderBox>

         <ContentHeader>
            <Typography variant="h5">Ваши книги</Typography>
            <TotalFavoritesText variant="body1">
               Всего: {totalFavorites}
            </TotalFavoritesText>
            {totalFavorites > 0 && (
               <ClearFavoritesButton onClick={handleClearAllFavorites}>
                  Очистить избранные
               </ClearFavoritesButton>
            )}
         </ContentHeader>

         {error && error.message && (
            <ErrorAlert severity="error">{error.message}</ErrorAlert>
         )}

         {favorites.length === 0 ? (
            <EmptyStateText>Список избранного пуст</EmptyStateText>
         ) : (
            <ItemsList>
               {favorites.map((item) => (
                  <FavoriteItem
                     key={item.bookItemId}
                     item={item}
                     onRemove={() => handleRemoveFromFavorites(item)}
                     onAddToCart={() => handleAddToBasket(item)}
                  />
               ))}
            </ItemsList>
         )}
      </Container>
   )
}

export default FavoritesPage

const Container = styled(Box)(({ theme }) => ({
   padding: theme.spacing(4),
   maxWidth: '1000px',
   margin: '0 auto',
}))

const HeaderBox = styled(Box)(({ theme }) => ({
   marginBottom: theme.spacing(2),
}))

const BreadcrumbsText = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.secondary,
   fontSize: '0.875rem',
}))

const ContentHeader = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(2),
   marginBottom: theme.spacing(3),
   '& > h5': {
      fontWeight: 600,
   },
}))

const TotalFavoritesText = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.secondary,
   fontWeight: 500,
   marginLeft: 'auto',
}))

const ClearFavoritesButton = styled(Button)(({ theme }) => ({
   color: theme.palette.text.secondary,
   textTransform: 'none',
   '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
   },
}))

const LoadingBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '80vh',
}))

const ErrorAlert = styled(Alert)(({ theme }) => ({
   marginBottom: theme.spacing(2),
}))

const EmptyStateText = styled(Typography)(({ theme }) => ({
   marginTop: theme.spacing(3),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}))

const ItemsList = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
}))
