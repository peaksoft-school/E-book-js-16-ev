import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'


export const addFavoriteBook = createAsyncThunk(
   'favorite/addFavoriteBook',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/api/favorite/addFavoriteBookForClient/${bookItemId}`
         )
         return { bookItemId, message: response.data.message }
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Ошибка')
      }
   }
)
