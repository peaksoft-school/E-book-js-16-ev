import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchBookById = createAsyncThunk(
   'editBook/fetchBookById',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/bookItem/findByIdBookItemVendorAndAdmin`,
            { params: { bookItemId } }
         )

         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка при получении книги'
         )
      }
   }
)
