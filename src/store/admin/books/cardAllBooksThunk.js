import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const fetchAllBooks = createAsyncThunk(
   'books/fetchAllBooks',
   async (
      { type, genre, pageNumber = 1, pageSize = 8 },
      { rejectWithValue }
   ) => {
      try {
         let response

         if (type && !genre) {
            response = await axiosInstance.get(
               '/api/bookItem/findByTypeBooks',
               {
                  params: { type, pageNumber, pageSize },
               }
            )
         } else if (genre && !type) {
            response = await axiosInstance.get(
               '/api/bookItem/findByGenreBooks',
               {
                  params: { genre, pageNumber, pageSize },
               }
            )
         } else {
            response = await axiosInstance.get('/api/bookItem/findAllBooks', {
               params: { pageNumber, pageSize },
            })
         }

         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   }
)
