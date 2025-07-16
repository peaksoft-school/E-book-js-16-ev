import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const addUserToMailList = createAsyncThunk(
   'user/mailing',
   async ({ email }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/user/addUserToMailList`,
            { email }
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка подписки'
         )
      }
   }
)
