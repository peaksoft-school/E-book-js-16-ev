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
   forgotPasswordSuccess: null,
   forgotPasswordError: null,
   resetPasswordSuccessMessage: null,
   resetPasswordError: null,
   user: null,
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
         state.user = null
         state.forgotPasswordStatus = 'idle'
         state.resetPasswordStatus = 'idle'
         state.forgotPasswordSuccess = null
         state.forgotPasswordError = null
         state.resetPasswordSuccessMessage = null
         state.resetPasswordError = null
      },
      clearAuthSuccess: (state) => {
         state.isSuccess = false
         state.forgotPasswordSuccess = null
         state.resetPasswordSuccessMessage = null
      },
      clearForgotPasswordSuccess: (state) => {
         state.forgotPasswordSuccess = null
         state.forgotPasswordStatus = 'idle'
      },
      clearResetPasswordSuccess: (state) => {
         state.resetPasswordSuccessMessage = null
         state.resetPasswordStatus = 'idle'
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.isSuccess = false
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
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

         .addCase(registerVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.isSuccess = false
         })
         .addCase(registerVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.token
            state.email = action.payload.email
            state.error = null
            state.isSuccess = true
         })
         .addCase(registerVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

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
            state.user = {
               id: action.payload.id || null,
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
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         .addCase(forgotPassword.pending, (state) => {
            state.forgotPasswordStatus = 'loading'
            state.forgotPasswordError = null
            state.forgotPasswordSuccess = null
         })
         .addCase(forgotPassword.fulfilled, (state, action) => {
            state.forgotPasswordStatus = 'succeeded'
            state.forgotPasswordSuccess =
               action.payload?.message ||
               'Инструкции по сбросу пароля отправлены на ваш email.'
            state.forgotPasswordError = null
         })
         .addCase(forgotPassword.rejected, (state, action) => {
            state.forgotPasswordStatus = 'failed'
            state.forgotPasswordError =
               action.payload || 'Ошибка при отправке запроса.'
            state.forgotPasswordSuccess = null
         })

         .addCase(resetPassword.pending, (state) => {
            state.resetPasswordStatus = 'loading'
            state.resetPasswordError = null
            state.resetPasswordSuccessMessage = null
         })
         .addCase(resetPassword.fulfilled, (state, action) => {
            state.resetPasswordStatus = 'succeeded'
            state.resetPasswordSuccessMessage =
               action.payload?.message ||
               'Пароль успешно сброшен! Перенаправляем на вход...'
            state.resetPasswordError = null
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.resetPasswordStatus = 'failed'
            state.resetPasswordError =
               action.payload || 'Произошла ошибка при сбросе пароля.'
            state.resetPasswordSuccessMessage = null
         })

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

export const {
   logOut,
   clearAuthError,
   clearAuthSuccess,
   clearForgotPasswordSuccess,
   clearResetPasswordSuccess,
} = authSlice.actions
export default authSlice.reducer
