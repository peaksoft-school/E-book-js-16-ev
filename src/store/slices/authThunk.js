import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async (
      { email, password, confirmPassword, firstName },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.post(`/auth/signUpForClient`, {
            email,
            password,
            confirmPassword,
            firstName,
         })
         return response.data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(
            error.message || 'Произошла непредвиденная ошибка регистрации.'
         )
      }
   }
)

export const registerVendor = createAsyncThunk(
   'auth/registerVendor',
   async (
      { email, password, confirmPassword, firstName, lastName, phoneNumber },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.post(`/auth/signUpForVendor`, {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phoneNumber,
         })
         return response.data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(
            error.message || 'Произошла непредвиденная ошибка регистрации.'
         )
      }
   }
)

export const loginUser = createAsyncThunk(
   'auth/login',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(`/auth/signIn`, {
            email,
            password,
         })
         return response.data
      } catch (error) {
         return rejectWithValue(error.response.data.message)
      }
   }
)

export const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   async ({ email }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/forgot-password?email=${encodeURIComponent(email)}`
         )
         return response.data
      } catch (error) {
         const message = error.response?.data?.message || 'Что-то пошло не так'
         return rejectWithValue(message)
      }
   }
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/ResetPassword/${token}`,
            null,
            {
               params: {
                  newPassword,
                  confirmPassword,
               },
            }
         )
         return response.data
      } catch (error) {
         const message = error.response?.data?.message || 'Что-то пошло не так'
         return rejectWithValue(message)
      }
   }
)

export const googleSignIn = createAsyncThunk(
   'auth/googleSignIn',
   async (accessToken, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(`/auth/signInGoogle`, {
            accessToken: accessToken,
         })
         return response.data
      } catch (error) {
         console.error(
            'Error in googleSignIn thunk:',
            error.response?.data || error.message
         )
         return rejectWithValue(
            error.response?.data?.message || 'Google Sign-In failed'
         )
      }
   }
)
