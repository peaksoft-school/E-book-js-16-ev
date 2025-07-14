import { createSlice } from '@reduxjs/toolkit'
import { fetchBooks, searchBooksByName } from './applicationThunk'

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
         .addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload.books
            state.totalElements = action.payload.totalElements
            state.totalSeen = action.payload.totalSeen
            state.loading = false
            state.error = null
         })
         .addCase(searchBooksByName.fulfilled, (state, action) => {
            state.books = action.payload.content
            state.totalElements = action.payload.totalElements
            state.totalSeen = action.payload.totalSeen || 0
            state.loading = false
            state.error = null
         })
   },
})

export default applicationSlice.reducer
