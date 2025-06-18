import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const getAllVendors = createAsyncThunk(
   'vendor/getAll',
   async ({ pageNumber = 1, pageSize = 15 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/user/findAllVendor', {
            params: { pageNumber, pageSize },
         })

         const mapped = response.data.content.map((v) => ({
            id: v.vendorId,
            name: v.name,
            phone: v.phoneNumber,
            email: v.email,
            books: v.countBook,
         }))

         return mapped
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка сервера'
         )
      }
   }
)
