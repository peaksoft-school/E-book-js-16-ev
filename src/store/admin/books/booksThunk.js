import { createAsyncThunk } from "@reduxjs/toolkit"
import {axiosInstance} from '../../../configs/axiosInstance'

export const allBooks = createAsyncThunk(
   '',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/bookItem/findAllBooks',
            {
               params: { bookItemId },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при получении информации о книге'
         )
      }
   }
)