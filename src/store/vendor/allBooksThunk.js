import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const getAllVendorBooks = createAsyncThunk(
   'vendor/allBooks',
   async ({ pageNumber = 1, pageSize = 12 }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/book/getAllVendorBooks`,
            { params: { pageNumber, pageSize } }
         )
         return data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Unknown error'
         return rejectWithValue(message)
      }
   }
)

export const sortVendorBooks = createAsyncThunk(
   'vendor/sortBooks',

   async ({ value, pageNumber, pageSize }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/bookItem/sortVendorBooks`,
            {
               params: { value, pageNumber, pageSize },
            }
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении сортировки.'
         )
      }
   }
)

export const deleteBookItemVendor = createAsyncThunk(
   'vendor/deleteBooks',

   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/bookItem/deleteBookItemVendor/${bookItemId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка сервера при удалении.'
         )
      }
   }
)
