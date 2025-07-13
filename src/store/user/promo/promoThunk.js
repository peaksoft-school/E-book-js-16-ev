import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchBooksByPromoCode = createAsyncThunk(
   'promo/fetchBooksByPromoCode',
   async ({ code, pageNumber = 1, pageSize = 16 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `api/bookItem/getAllBooksByPromoCode`,
            {
               params: {
                  code,
                  pageNumber,
                  pageSize,
               },
            }
         )
         return response.data.content
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Error')
      }
   }
)
