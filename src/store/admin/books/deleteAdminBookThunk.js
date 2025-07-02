import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const deleteBook = createAsyncThunk(
   'books/deleteBook',
   async (
      { bookItemId, fetchBooksByGenreAndType, data },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(
            `/api/bookItem/deleteBookItem/${bookItemId}`
         )

         dispatch(fetchBooksByGenreAndType({ data }))
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка при удалении книги'
         )
      }
   }
)
