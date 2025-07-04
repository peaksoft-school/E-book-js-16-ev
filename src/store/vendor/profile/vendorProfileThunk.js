import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const updatePasswordForVendor = createAsyncThunk(
   'vendor/updatePassword',

   async ({ currentPassword, newPassword }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(
            `/api/user/updatePasswordForVendor`,
            {
               currentPassword,
               newPassword,
            }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const updateProfileVendor = createAsyncThunk(
   'vendor/updateProfile',

   async ({ firstName, lastName, phoneNumber, email }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/user/updateProfileVendor`,
            {
               firstName,
               lastName,
               phoneNumber,
               email,
            }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const deletedProfileByVendor = createAsyncThunk(
   'vendor/deleteProfile',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            '/api/user/deletedProfileByVendor'
         )
         console.log(data.message)
         return data // <-- верни данные!
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         } else {
            return rejectWithValue({ message: 'Произошла ошибка при удалении' })
         }
      }
   }
)
