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
      },
      clearAuthError: (state) => {
         state.error = null
         state.forgotPasswordStatus = 'idle'
         state.resetPasswordStatus = 'idle'
         state.forgotPasswordMessage = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
            state.error = null
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
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
         .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.forgotPasswordStatus = 'loading'
         })
         .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.forgotPasswordStatus = 'succeeded'
            state.error = null
         })
         .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            state.forgotPasswordStatus = 'failed'
            state.error = action.payload
         })
         // ...
         .addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.resetPasswordStatus = 'loading'
         })
         .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.resetPasswordStatus = 'succeeded'
            state.error = null
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.resetPasswordStatus = 'failed'
            state.error = action.payload
         })
         // ...

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

export const { logOut, clearAuthError } = authSlice.actions
export default authSlice.reducer
