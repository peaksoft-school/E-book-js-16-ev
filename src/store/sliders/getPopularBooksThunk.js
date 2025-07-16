import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const fetchPopularBooks = createAsyncThunk(
   'books/fetchPopularBooks',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/book/getAllBookFavorites'
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка при загрузке популярных книг'
         )
      }
   }
)
