import { createSlice } from '@reduxjs/toolkit'
import { globalSearchBooks } from './globalSearchBooksThunk'

const initialState = {
   books: [],
   pageNumber: 1,
   pageSize: 16,
   totalElements: 0,
   totalPages: 0,
   isLoading: false,
   error: null,
}

const globalSearchSlice = createSlice({
   name: 'globalSearch',
   initialState,
   reducers: {
      clearSearchResults: (state) => {
         state.books = []
         state.pageNumber = 1
         state.totalElements = 0
         state.totalPages = 0
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(globalSearchBooks.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(globalSearchBooks.fulfilled, (state, action) => {
            state.isLoading = false
            state.books = action.payload.content
            state.pageNumber = action.payload.pageNumber
            state.pageSize = action.payload.pageSize
            state.totalElements = action.payload.totalElements
            state.totalPages = action.payload.totalPages
         })
         .addCase(globalSearchBooks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

export const { clearSearchResults } = globalSearchSlice.actions
export default globalSearchSlice.reducer
