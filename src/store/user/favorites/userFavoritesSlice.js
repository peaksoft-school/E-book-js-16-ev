import { createSlice } from '@reduxjs/toolkit'
import {
   getAllFavorites,
   deleteFavoriteById,
   deleteAllFavorites,
   addBookToBasket,
} from './userFavoritesThunk'

const initialState = {
   favorites: [],
   basket: [],
   totalFavorites: 0,
   isLoading: false,
   error: null,
}

const favoriteSlice = createSlice({
   name: 'favorite',
   initialState,
   reducers: {
      clearFavoriteError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllFavorites.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAllFavorites.fulfilled, (state, action) => {
            state.isLoading = false
            state.favorites = action.payload.content
            state.totalFavorites = action.payload.totalElements
         })
         .addCase(getAllFavorites.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         .addCase(deleteFavoriteById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(deleteFavoriteById.fulfilled, (state, action) => {
            state.isLoading = false
            const deletedId = action.meta.arg.bookItemId
            state.favorites = state.favorites.filter(
               (item) => item.bookItemId !== deletedId
            )
            state.totalFavorites -= 1
         })
         .addCase(deleteFavoriteById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         .addCase(deleteAllFavorites.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(deleteAllFavorites.fulfilled, (state) => {
            state.isLoading = false
            state.favorites = []
            state.totalFavorites = 0
         })
         .addCase(deleteAllFavorites.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         .addCase(addBookToBasket.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(addBookToBasket.fulfilled, (state, action) => {
            state.isLoading = false
            if (!state.basket) {
               state.basket = []
            }
            state.basket.push(action.payload)
         })

         .addCase(addBookToBasket.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

const FAVORITE_ACTION = favoriteSlice.actions
export { FAVORITE_ACTION, favoriteSlice }
