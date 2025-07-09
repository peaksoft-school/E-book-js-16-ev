import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const vendorBookById = createAsyncThunk(
   'book/vendorbook',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/bookItem/findByIdBookItemVendorAndAdmin',
            {
               params: { bookItemId },
            }
         )
         return response.data
      } catch (error) {
         const err = error.response?.data?.message || 'Произошла ошибка'
         return rejectWithValue(err)
      }
   }
)
