import { createSlice } from '@reduxjs/toolkit'
import {
   authWithGoogle,
   forgotPassword,
   resetPassword,
   signIn,
   signUpForUser,
   signUpForVendor,
} from './authThunk'

const initialState = {
   role: 'GUEST',
   email: null,
   token: null,
   isAuth: false,
   isLoading: false,
   error: null,
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
         state.user = null
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(signUpForUser.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(signUpForUser.fulfilled, (state, { payload }) => {
            state.token = payload.token
            state.email = payload.email
            state.error = null
            state.isLoading = false
         })

         .addCase(signUpForUser.rejected, (state, { payload }) => {
            state.error = payload
            state.isLoading = false
         })

         .addCase(signUpForVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(signUpForVendor.fulfilled, (state, { payload }) => {
            state.token = payload.token
            state.email = payload.email
            state.isLoading = false
            state.error = null
         })

         .addCase(signUpForVendor.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(signIn.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(signIn.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isAuth = true
            state.role = payload.role
            state.token = payload.token
            state.email = payload.email
            state.error = null
            state.user = payload
         })

         .addCase(signIn.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(forgotPassword.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(resetPassword.pending, (state) => {
            state.isLoading = true
         })

         .addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(resetPassword.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(authWithGoogle.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(authWithGoogle.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.token = payload.token
            state.role = payload.role
            state.email = payload.email || null
            state.isAuth = true
            state.user = payload
         })

         .addCase(authWithGoogle.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const AUTH_ACTION = authSlice.actions

export { AUTH_ACTION, authSlice }
