import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchBooksByGenreAndType = createAsyncThunk(
   'books/fetchByGenreAndType',
   async (
      { genre = false, type = false, pageNumber = 1, pageSize = 8 },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.get(
            '/api/bookItem/findByGenreAndTypeBooks',
            {
               params: { genre, type, pageNumber, pageSize },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
