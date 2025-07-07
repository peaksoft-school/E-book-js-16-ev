import { createSlice } from '@reduxjs/toolkit'
import {
   deletedProfileByVendor,
   getProfileVendor,
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
            state.isLoading = false
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

         .addCase(deletedProfileByVendor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deletedProfileByVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.successMessage =
               action.payload?.message || 'Профиль успешно удалён'
            state.profile = {
               firstName: '',
               lastName: '',
               phoneNumber: '',
               email: '',
            }
         })
         .addCase(deletedProfileByVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error =
               action.payload?.message || 'Ошибка при удалении профиля'
         })
         .addCase(getProfileVendor.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.profile = {
               firstName: payload.firstName || '',
               lastName: payload.lastName || '',
               phoneNumber: payload.phoneNumber || '',
               email: payload.email || '',
            }
            state.error = null
         })
         .addCase(getProfileVendor.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload || 'Не удалось загрузить профиль продавца.'
            state.profile = initialState.profile
         })
   },
})

const VENDOR_PROFILE_ACTION = vendorProfileSlice.actions

export { VENDOR_PROFILE_ACTION, vendorProfileSlice }
