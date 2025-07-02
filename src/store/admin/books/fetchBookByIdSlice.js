import { createSlice } from '@reduxjs/toolkit'
import { fetchBookById } from './fetchBookByIdThunk'

const fetchBookByIdSlice = createSlice({
   name: 'findBook',
   initialState: {
      bookData: {},
      loading: false,
      error: null,
   },
   reducers: {
      resetEditBookState: (state) => {
         state.bookData = null
         state.loading = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBookById.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBookById.fulfilled, (state, action) => {
            state.loading = false
            state.bookData = action.payload
         })
         .addCase(fetchBookById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { resetEditBookState } = fetchBookByIdSlice.actions
export default fetchBookByIdSlice.reducer
