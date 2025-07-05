import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance'

export const createPromoCodeThunk = createAsyncThunk(
   'promoCode/create',
   async (promoData, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/api/creatingPromotionalCode/create',
            promoData
         )
         return response.data.message
      } catch (error) {
         const message =
            error.response?.data?.message || 'Ошибка при создании промокода'
         return rejectWithValue(message)
      }
   }
)
