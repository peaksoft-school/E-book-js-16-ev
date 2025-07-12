import { createSlice } from '@reduxjs/toolkit'
import {
   deleteBookItemVendor,
   getAllVendorBooks,
   sortVendorBooks,
} from './allBooksThunk'

const initialState = {
   books: [],
   error: null,
   isLoading: false,
   totalElements: 0,
   totalPages: 0,
   pageNumber: 1,
   pageSize: 12,
}

const allBookSlice = createSlice({
   name: 'allVendorBooks',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllVendorBooks.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllVendorBooks.fulfilled, (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.books = payload.content
            state.totalElements = payload.totalElements
            state.totalPages = payload.totalPages
            state.pageNumber = payload.pageNumber
            state.pageSize = payload.pageSize
         })
         .addCase(getAllVendorBooks.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })
         .addCase(sortVendorBooks.pending, (state) => {
            state.isLoading = true
         })
         .addCase(sortVendorBooks.fulfilled, (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.books = payload.content
            state.totalElements = payload.totalElements
            state.totalPages = payload.totalPages
            state.pageNumber = payload.pageNumber
            state.pageSize = payload.pageSize
         })
         .addCase(sortVendorBooks.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })
         .addCase(deleteBookItemVendor.pending, (state) => {
            state.error = null
            state.isLoading = true
         })
         .addCase(
            deleteBookItemVendor.fulfilled,
            (state, { meta: { arg } }) => {
               state.error = null
               state.isLoading = false
               state.books = state.books.filter(
                  (book) => book.bookItemId !== arg.bookItemId
               )
               state.totalElements -= 1
               state.totalPages = Math.ceil(
                  state.totalElements / state.pageSize
               )
            }
         )
         .addCase(deleteBookItemVendor.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })
   },
})

const VENDOR_BOOK_ACTION = allBookSlice.actions

export { VENDOR_BOOK_ACTION, allBookSlice }
