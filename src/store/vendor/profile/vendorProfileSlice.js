import { createSlice } from '@reduxjs/toolkit'
import {
   updatePasswordForVendor,
   updateProfileVendor,
} from './vendorProfileThunk'

const initialState = {
   isLoading: false,
   error: null,
   successMessage: null,
   profile: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
   },
}

const vendorProfileSlice = createSlice({
   name: 'vendorProfile',
   initialState,
   reducers: {
      clearVendorMessages: (state) => {
         state.error = null
         state.successMessage = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(updatePasswordForVendor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updatePasswordForVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.successMessage =
               action.payload?.message || 'Пароль успешно обновлён'
         })
         .addCase(updatePasswordForVendor.rejected, (state, action) => {
            state.error =
               action.payload?.message || 'Ошибка при обновлении пароля'
         })

         .addCase(updateProfileVendor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateProfileVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.successMessage =
               action.payload?.message || 'Профиль успешно обновлён'
         })
         .addCase(updateProfileVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error =
               action.payload?.message || 'Ошибка при обновлении профиля'
         })
   },
})

const VENDOR_PROFILE_ACTION = vendorProfileSlice.actions

export { VENDOR_PROFILE_ACTION, vendorProfileSlice }
