import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const infoBook = createAsyncThunk(
   'application/fetchBookById',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/bookItem/findByIdBookItem',
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

export const acceptBook = createAsyncThunk(
   'application/acceptBook',
   async (bookItemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            '/api/bookItem/acceptBookItemByIdFromApplication',
            {},
            { params: { bookItemId } }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при принятии книги'
         )
      }
   }
)

export const rejectBook = createAsyncThunk(
   'application/rejectBook',
   async ({ bookItemId, reason }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/api/bookItem/rejectBookItemByIdFromApplication',
            { reason },
            { params: { bookItemId } }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data || 'Ошибка при отклонении книги'
         )
      }
   }
)
