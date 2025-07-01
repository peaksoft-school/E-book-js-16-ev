import { createSlice } from '@reduxjs/toolkit'
import { updateBook } from './updateThunk'

const updateBookSlice = createSlice({
   name: 'updateBook',
   initialState: {
      loading: false,
      success: false,
      error: null,
   },
   reducers: {
      resetUpdateBookState: (state) => {
         state.loading = false
         state.success = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(updateBook.pending, (state) => {
            state.loading = true
            state.success = false
            state.error = null
         })
         .addCase(updateBook.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
         })

         .addCase(updateBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { resetUpdateBookState } = updateBookSlice.actions
export default updateBookSlice.reducer
