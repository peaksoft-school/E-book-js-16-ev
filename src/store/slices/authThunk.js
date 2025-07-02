import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../configs/firebase'
import notify from '../../utils/helpers/notify'

export const signUpForUser = createAsyncThunk(
   'auth/registerUser',

   async (
      { email, password, confirmPassword, firstName, navigate },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post(`/api/auth/signUpForClient`, {
            email,
            password,
            confirmPassword,
            firstName,
         })

         notify({
            message: 'Регистрация прошла успешно! Теперь вы можете войти.',
         })

         navigate('/user')

         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const signUpForVendor = createAsyncThunk(
   'auth/registerVendor',

   async (
      {
         firstName,
         lastName,
         phoneNumber,
         email,
         password,
         confirmPassword,
         navigate,
      },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post(`/api/auth/signUpForVendor`, {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            confirmPassword,
         })

         notify({
            message: 'Регистрация прошла успешно! Теперь вы можете войти.',
         })

         navigate('/vendor')

         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const signIn = createAsyncThunk(
   'auth/login',

   async ({ email, password }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(`/api/auth/signIn`, {
            email,
            password,
         })

         return data
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
         const { data } = await axiosInstance.post(
            `/api/auth/forgot-password?email=${encodeURIComponent(email)}`
         )

         notify({
            message: 'Успешно отправлено в почту',
         })

         return data
      } catch (error) {
         const message = error.response?.data?.message || 'Что-то пошло не так'

         return rejectWithValue(message)
      }
   }
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',

   async (
      { token, newPassword, confirmPassword, navigate },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/ResetPassword/${token}`,
            null,
            {
               params: {
                  newPassword,
                  confirmPassword,
               },
            }
         )
         notify({
            message: 'Пароль успешно изменен',
         })

         navigate('/sign-in')

         return data
      } catch (error) {
         const message = error.response?.data?.message || 'Что-то пошло не так'

         return rejectWithValue(message)
      }
   }
)

export const authWithGoogle = createAsyncThunk(
   'auth/googleSignIn',

   async (_, { rejectWithValue }) => {
      try {
         const provider = new GoogleAuthProvider()

         const result = await signInWithPopup(auth, provider)

         const idToken = await result.user.getIdToken()

         const { data } = await axiosInstance.post('/api/auth/signInGoogle', null, {
            params: {
               idToken: idToken,
            },
         })

         return data
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
