import { createSlice } from '@reduxjs/toolkit'
import { fetchPopularBooks } from './getPopularBooksThunk'

const initialState = {
   books: [],
   loading: false,
   error: null,
}

const popularBooksSlice = createSlice({
   name: 'popularBooks',
   initialState,
   reducers: {
      clearPopularBooks: (state) => {
         state.books = []
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPopularBooks.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPopularBooks.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload
         })
         .addCase(fetchPopularBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { clearPopularBooks } = popularBooksSlice.actions
export default popularBooksSlice.reducer
