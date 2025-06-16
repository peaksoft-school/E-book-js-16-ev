import { createSlice } from '@reduxjs/toolkit'
import {
   forgotPassword,
   loginUser,
   registerUser,
   registerVendor,
} from './authThunk'

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
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
         .addCase(registerVendor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(registerVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
         })
         .addCase(registerVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.role = action.payload.role
            state.token = action.payload.token
            state.email = action.payload.email
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
   },
})

export const { logOut } = authSlice.actions
export default authSlice.reducer
