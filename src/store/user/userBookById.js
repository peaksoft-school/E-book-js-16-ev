import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance' 

export const fetchBookClientById = createAsyncThunk(
   'bookClient/fetchById',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/bookItem/findByIdBookItemClient/${bookItemId}`)
         return response.data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Ошибка при загрузке книги'
         return rejectWithValue(message)
      }
   }
)
