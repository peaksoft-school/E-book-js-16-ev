import { createSlice } from '@reduxjs/toolkit'
import {
   forgotPassword,
   loginUser,
   registerUser,
   registerVendor,
   resetPassword,
   googleSignIn,
} from './authThunk'
import { saveStateToLocalStorage } from '../../utils/storage/lacalStorage'

const initialState = {
   role: 'GUEST',
   email: null,
   token: null,
   isAuth: false,
   isLoading: false,
   error: null,
   isSuccess: false,
   forgotPasswordStatus: 'idle',
   resetPasswordStatus: 'idle',
   forgotPasswordMessage: null,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state) => {
         state.token = null
         state.isAuth = false
         state.role = 'GUEST'
         state.email = null
         state.error = null
         state.isSuccess = false
      },
      clearAuthError: (state) => {
         state.error = null
         state.forgotPasswordStatus = 'idle'
         state.resetPasswordStatus = 'idle'
         state.forgotPasswordMessage = null
      },
      clearAuthSuccess: (state) => {
         state.isSuccess = false
      },
   },
   extraReducers: (builder) => {
      builder
         // Регистрация пользователя
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.isSuccess = false
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            // state.isAuth = true
            // state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
            state.error = null
            state.isSuccess = true
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.isSuccess = false
         })

         // Регистрация продавца
         .addCase(registerVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(registerVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
            state.error = null
         })
         .addCase(registerVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // Логин пользователя
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
            state.error = null
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // Восстановление пароля
         .addCase(forgotPassword.pending, (state) => {
            state.forgotPasswordStatus = 'loading'
            state.forgotPasswordError = null
            state.forgotPasswordSuccess = null
         })
         .addCase(forgotPassword.fulfilled, (state, action) => {
            state.forgotPasswordStatus = 'succeeded'
            state.forgotPasswordSuccess =
               'Инструкции по сбросу пароля отправлены на ваш email.'
            state.forgotPasswordError = null
         })
         .addCase(forgotPassword.rejected, (state, action) => {
            state.forgotPasswordStatus = 'failed'
            state.forgotPasswordError =
               action.payload || 'Ошибка при отправке запроса.'
            state.forgotPasswordSuccess = null
         })

         // Сброс пароля
         .addCase(resetPassword.pending, (state) => {
            state.resetPasswordStatus = 'loading'
            state.resetPasswordError = null
            state.resetPasswordSuccessMessage = null
         })
         .addCase(resetPassword.fulfilled, (state, action) => {
            state.resetPasswordStatus = 'succeeded'
            state.resetPasswordSuccessMessage =
               'Пароль успешно сброшен! Перенаправляем на вход...'
            state.resetPasswordError = null
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.resetPasswordStatus = 'failed'
            state.resetPasswordError =
               action.payload || 'Произошла ошибка при сбросе пароля.'
            state.resetPasswordSuccessMessage = null
         })

         // Вход через Google
         .addCase(googleSignIn.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(googleSignIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.token = action.payload.token
            state.role = action.payload.role
            state.email = action.payload.email || null
            state.isAuth = true
            state.user = {
               id: action.payload.id,
               role: action.payload.role,
               email: action.payload.email,
            }
            saveStateToLocalStorage(
               state.token,
               state.role,
               state.email,
               state.user
            )
         })
         .addCase(googleSignIn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.isAuth = false
            state.token = null
            state.role = 'GUEST'
            state.email = null
            state.user = null
         })
   },
})

export const { logOut, clearAuthError, clearAuthSuccess } = authSlice.actions
export default authSlice.reducer
