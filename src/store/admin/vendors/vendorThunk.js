import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const findAllVendor = createAsyncThunk(
   'vendor/getAll',

   async ({ pageNumber = 1, pageSize = 15 }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/user/findAllVendor', {
            params: { pageNumber, pageSize },
         })
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении списка поставщиков.'
         )
      }
   }
)

export const deleteVendor = createAsyncThunk(
   'vendor/deleteVendor',

   async ({ vendorId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/user/deletedVendor/${vendorId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при удалении поставщика.'
         )
      }
   }
)

export const findVendorById = createAsyncThunk(
   'vendor/getVendorById',

   async ({ vendorId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/user/findVendorById/${vendorId}`
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении данных поставщика.'
         )
      }
   }
)

export const getAllVendorBooks = createAsyncThunk(
   'vendor/getAllVendorBooks',

   async ({ vendorId, pageNumber = 1, pageSize = 8 }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/book/getAllVendorBooks/${vendorId}`,
            {
               params: {
                  pageNumber,
                  pageSize,
               },
            }
         )
         return data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении списка книг продавца.'
         )
      }
   }
)

export const sortVendorBooksForAdmin = createAsyncThunk(
   'vendor/sortBook',
   async ({ value, pageNumber, pageSize, vendorId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/bookItem/sortVendorBooksForAdmin/${vendorId}`,
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
