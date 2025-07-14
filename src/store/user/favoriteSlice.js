import { createSlice } from '@reduxjs/toolkit'
import { addFavoriteBook } from './favoriteThunk'

const favoriteSlice = createSlice({
   name: 'favorite',
   initialState: {
      favorites: [],
      status: null,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(addFavoriteBook.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(addFavoriteBook.fulfilled, (state, action) => {
            state.status = 'succeeded'
            if (!state.favorites.includes(action.payload.bookItemId)) {
               state.favorites.push(action.payload.bookItemId)
            }
         })
         .addCase(addFavoriteBook.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
         })
   },
})

export default favoriteSlice.reducer
