import { createSlice } from '@reduxjs/toolkit'
import { createPromoCodeThunk } from './createPromoCodeThunk'

const promoCodeSlice = createSlice({
   name: 'promoCode',
   initialState: {
      loading: false,
      successMessage: null,
      errorMessage: null,
   },
   reducers: {
      resetPromoState: (state) => {
         state.successMessage = null
         state.errorMessage = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createPromoCodeThunk.pending, (state) => {
            state.loading = true
            state.successMessage = null
            state.errorMessage = null
         })
         .addCase(createPromoCodeThunk.fulfilled, (state, action) => {
            state.loading = false
            state.successMessage = action.payload
         })
         .addCase(createPromoCodeThunk.rejected, (state, action) => {
            state.loading = false
            state.errorMessage = action.payload
         })
   },
})

export const { resetPromoState } = promoCodeSlice.actions
export default promoCodeSlice.reducer
