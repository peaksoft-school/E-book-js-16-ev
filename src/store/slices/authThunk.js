import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../configs/firebase'

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
         const message =
            error.response?.data?.message ||
            error.message ||
            'Ошибка входа: неизвестная ошибка.'
         return rejectWithValue(message)
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
   async (_, { rejectWithValue }) => {
      try {
         const provider = new GoogleAuthProvider()
         const result = await signInWithPopup(auth, provider)

         const idToken = await result.user.getIdToken()

         const response = await axiosInstance.post('/auth/signInGoogle', null, {
            params: {
               idToken: idToken,
            },
         })

         return response.data
      } catch (error) {
         if (error.code) {
            switch (error.code) {
               case 'auth/popup-closed-by-user':
                  return rejectWithValue(
                     'Вход через Google отменен пользователем.'
                  )
               case 'auth/cancelled-popup-request':
                  return rejectWithValue('Запрос на вход через Google отменен.')
               default:
                  return rejectWithValue(
                     error.message ||
                        'Произошла ошибка Firebase при входе через Google.'
                  )
            }
         }
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            return rejectWithValue(error.response.data.message)
         }
         return rejectWithValue('Неизвестная ошибка при входе через Google.')
      }
   }
)
