// store/slices/vendorSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { getAllVendors } from './vendorThunk'

const vendorSlice = createSlice({
   name: 'vendor',
   initialState: {
      vendors: [],
      isLoading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllVendors.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAllVendors.fulfilled, (state, action) => {
            state.vendors = action.payload
            state.isLoading = false
         })
         .addCase(getAllVendors.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

export default vendorSlice.reducer
