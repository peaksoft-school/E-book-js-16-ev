import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const fetchBooks = createAsyncThunk(
   'application/fetchBooks',
   async ({ pageNumber = 1, pageSize = 12 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/book/getAllApplications',
            {
               params: { pageNumber, pageSize },
            }
         )

         const booksArray = Array.isArray(response.data.content)
            ? response.data.content
            : []

         return {
            books: booksArray,
            totalElements: response.data.totalElements,
            totalSeen: response.data.totalSeen,
         }
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Unknown error'
         return rejectWithValue(message)
      }
   }
)
