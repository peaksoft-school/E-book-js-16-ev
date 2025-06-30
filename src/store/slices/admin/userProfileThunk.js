import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getUserById = createAsyncThunk(
   'user/getById',
   async ({ clientId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/user/getClientById', {
            params: { clientId },
         })
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'error')
      }
   }
)
