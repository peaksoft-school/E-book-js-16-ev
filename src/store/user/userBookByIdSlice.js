import { createSlice } from '@reduxjs/toolkit'
import { fetchBookClientById } from './userBookById'

const initialState = {
   book: null,
   loading: false,
   error: null,
}

const bookClientSlice = createSlice({
   name: 'bookClient',
   initialState,
   reducers: {
      resetBookClientState: () => initialState,
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBookClientById.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBookClientById.fulfilled, (state, action) => {
            state.loading = false
            state.book = action.payload
         })
         .addCase(fetchBookClientById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { resetBookClientState } = bookClientSlice.actions
export default bookClientSlice.reducer
