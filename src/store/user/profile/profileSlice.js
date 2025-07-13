import { createSlice } from '@reduxjs/toolkit'
import {
   deleteProfileByClient,
   getClientProfile,
   updateClientProfile,
   updatePasswordForClient,
} from './profileThunk'

const initialState = {
   isLoading: false,
   error: null,
   successMessage: null,
   profile: {
      name: '',
      email: '',
   },
}

const clientProfileSlice = createSlice({
   name: 'clientProfile',
   initialState,
   reducers: {
      clearClientMessages: (state) => {
         state.error = null
         state.successMessage = null
      },
   },
   extraReducers: (builder) => {
      builder
         // Handle updateClientProfile thunk actions
         // All state updates for 'updateClientProfile.pending' should be in this ONE addCase
         .addCase(updateClientProfile.pending, (state) => {
            state.isLoading = true
            state.error = null // Clear any previous errors
            state.successMessage = null // Clear any previous success messages
         })
         .addCase(updateClientProfile.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.successMessage =
               payload?.message || 'Профиль успешно обновлён'
         })
         .addCase(updateClientProfile.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })

         // Handle updatePasswordForClient thunk actions
         .addCase(updatePasswordForClient.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.successMessage = null
         })
         .addCase(updatePasswordForClient.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.successMessage = payload?.message || 'Пароль успешно обновлён'
         })
         .addCase(updatePasswordForClient.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })

         // Handle deleteProfileByClient thunk actions
         .addCase(deleteProfileByClient.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.successMessage = null
         })
         .addCase(deleteProfileByClient.fulfilled, (state, action) => {
            state.isLoading = false
            state.successMessage =
               action.payload?.message || 'Профиль успешно удалён'
            state.profile = {
               // Reset profile state after deletion
               name: '',
               email: '',
            }
            state.error = null
         })
         .addCase(deleteProfileByClient.rejected, (state, action) => {
            state.isLoading = false
            state.error =
               action.payload?.message || 'Ошибка при удалении профиля'
         })

         // Handle getClientProfile thunk actions
         .addCase(getClientProfile.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.successMessage = null
         })
         .addCase(getClientProfile.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.profile = {
               name: payload.name || '',
               email: payload.email || '',
            }
            state.error = null
         })
         .addCase(getClientProfile.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload || 'Не удалось загрузить профиль клиента.'
            state.profile = initialState.profile
         })
   },
})

const CLIENT_PROFILE_ACTION = clientProfileSlice.actions

export { CLIENT_PROFILE_ACTION, clientProfileSlice }
