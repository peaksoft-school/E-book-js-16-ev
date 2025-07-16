import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const getAllRejectionBookForVendor = createAsyncThunk(
   'user/allRejectionBook',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/book/getAllRejectionBookForVendor`
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Ошибка ')
      }
   }
)
