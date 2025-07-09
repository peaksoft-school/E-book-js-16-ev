import { createSlice } from '@reduxjs/toolkit'
import { deleteVendorBook } from './deleteVendorBookThunk' 

const initialState = {
  successMessage: null,
  loading: false,
  error: null,
}

const vendorDeleteBookSlice = createSlice({
  name: 'vendorDeleteBook',
  initialState,
  reducers: {
    clearDeleteStatus: (state) => {
      state.successMessage = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteVendorBook.pending, (state) => {
        state.loading = true
        state.successMessage = null
        state.error = null
      })
      .addCase(deleteVendorBook.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload
      })
      .addCase(deleteVendorBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearDeleteStatus } = vendorDeleteBookSlice.actions
export default vendorDeleteBookSlice.reducer
