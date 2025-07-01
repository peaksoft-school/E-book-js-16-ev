import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const findAllVendor = createAsyncThunk(
   'vendor/getAll',
   async ({ pageNumber = 1, pageSize = 15 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/user/findAllVendor', {
            params: { pageNumber, pageSize },
         })
         return response.data
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
         const response = await axiosInstance.delete(
            `/user/deletedVendor/${vendorId}`
         )
         return response.data
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
         const response = await axiosInstance.get(
            `/user/findVendorById/${vendorId}`
         )
         return response.data
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
         const response = await axiosInstance.get(
            `/book/getAllVendorBooks/${vendorId}`,
            {
               params: {
                  pageNumber,
                  pageSize,
               },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении списка книг продавца.'
         )
      }
   }
)
