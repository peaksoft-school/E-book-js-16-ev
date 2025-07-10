import { createSlice } from '@reduxjs/toolkit'
import { vendorBookById } from './vendorBookThunk' 

const initialState = {
  book: null,
  loading: false,
  error: null,
}

const vendorBookSlice = createSlice({
  name: 'vendorBook',
  initialState,
  reducers: {
    clearBookState: (state) => {
      state.book = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorBookById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(vendorBookById.fulfilled, (state, action) => {
        state.loading = false
        state.book = action.payload
      })
      .addCase(vendorBookById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearBookState } = vendorBookSlice.actions

export default vendorBookSlice.reducer
