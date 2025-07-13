import { createSlice } from '@reduxjs/toolkit'
import { fetchBooksByPromoCode } from './promoThunk' 

const promoSlice = createSlice({
   name: 'promo',
   initialState: {
      books: [],
      isLoading: false,
      error: null,
   },
   reducers: {
      clearPromoBooks(state) {
         state.books = []
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBooksByPromoCode.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(fetchBooksByPromoCode.fulfilled, (state, action) => {
            state.isLoading = false
            state.books = action.payload
         })
         .addCase(fetchBooksByPromoCode.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

export const { clearPromoBooks } = promoSlice.actions
export default promoSlice.reducer
