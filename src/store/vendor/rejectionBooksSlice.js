import { createSlice } from '@reduxjs/toolkit'
import { getAllRejectionBookForVendor } from './rejectionBooksThunk'

const initialState = {
   isLoading: false,
   error: null,
   rejectionBooks: [],
}

const rejectionBooksSlice = createSlice({
   name: 'rejectionBooks',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllRejectionBookForVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(
            getAllRejectionBookForVendor.fulfilled,
            (state, { payload }) => {
               state.isLoading = false
               state.rejectionBooks = payload
            }
         )
         .addCase(
            getAllRejectionBookForVendor.rejected,
            (state, { payload }) => {
               state.isLoading = false
               state.error = payload || 'Произошла ошибка'
            }
         )
   },
})

const REJECTION_BOOK_ACTION = rejectionBooksSlice.actions
export { REJECTION_BOOK_ACTION, rejectionBooksSlice }
