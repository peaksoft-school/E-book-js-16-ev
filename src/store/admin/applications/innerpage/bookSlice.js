import { createSlice } from '@reduxjs/toolkit'
import { infoBook, acceptBook, rejectBook } from './bookThunk'

const initialState = {
   book: null,
   loading: false,
   error: null,
   success: null,
}

const bookSlice = createSlice({
   name: 'book',
   initialState,
   reducers: {
      clearBook: (state) => {
         state.book = null
         state.error = null
         state.success = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(infoBook.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(infoBook.fulfilled, (state, action) => {
            state.loading = false
            state.book = action.payload
         })
         .addCase(infoBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(acceptBook.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(acceptBook.fulfilled, (state) => {
            state.loading = false
            state.success = 'Книга успешно принята'
         })
         .addCase(acceptBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(rejectBook.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(rejectBook.fulfilled, (state) => {
            state.loading = false
            state.success = 'Книга успешно отклонена'
         })
         .addCase(rejectBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { clearBook } = bookSlice.actions
export default bookSlice.reducer
