import { createSlice } from '@reduxjs/toolkit'
import { fetchBooks } from './applicationThunk'

const initialState = {
   books: [],
   totalElements: 0,
   totalPages: 0,
   pageNumber: 1,
   pageSize: 12,
   totalSeen: 0,
   loading: false,
   error: null,
}

const applicationSlice = createSlice({
   name: 'application',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchBooks.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false
            state.books = action.payload.books
            state.totalElements = action.payload.totalElements
            state.totalPages = action.payload.totalPages
            state.pageNumber = action.payload.pageNumber
            state.pageSize = action.payload.pageSize
            state.totalSeen = action.payload.totalSeen
         })

         .addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default applicationSlice.reducer
