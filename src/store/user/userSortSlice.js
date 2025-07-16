import { createSlice } from '@reduxjs/toolkit'
import { fetchAllSortBooks, fetchBestsellers } from './userSortThunk'

const initialState = {
   books: [],
   totalPages: 0,
   loading: false,
   error: null,
}

const sortBooksSlice = createSlice({
   name: 'sortBooks',
   initialState,
   reducers: {
      clearBooks: (state) => {
         state.books = []
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchBestsellers.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBestsellers.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload.content
            state.totalPages = action.payload.totalPages
         })
         .addCase(fetchBestsellers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(fetchAllSortBooks.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAllSortBooks.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload.content
            state.totalPages = action.payload.totalPages
         })
         .addCase(fetchAllSortBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default sortBooksSlice.reducer
export const { clearBooks } = sortBooksSlice.actions
