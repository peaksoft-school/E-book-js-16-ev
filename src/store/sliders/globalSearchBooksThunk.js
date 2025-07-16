import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const globalSearchBooks = createAsyncThunk(
   'books/globalSearch',
   async ({ request, pageNumber = 1, pageSize = 16 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/bookItem/globalSearch',
            {
               params: { request, pageNumber, pageSize },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
