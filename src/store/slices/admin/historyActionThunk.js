import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getClinetBasketHistoryAction = createAsyncThunk(
   'user/getClinetBasketHistory',
   async ({ pageNumber = 1, pageSize = 12, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/api/historyAction/getClinetBasketHistoryAction',
            { params: { pageNumber, pageSize, userId } }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)

export const getClientPurchaseHistoryAction = createAsyncThunk(
   'user/getClientPurchaseHistory',
   async ({ pageNumber, pageSize, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/api/historyAction/getClientPurchaseHistoryAction',
            { params: { pageNumber, pageSize, userId } }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)

export const getClientFavoriteHistoryAction = createAsyncThunk(
   'user/getClientFavoriteHistory',
   async ({ pageNumber, pageSize, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/api/historyAction/getClientFavoriteHistoryAction',
            { params: { pageNumber, pageSize, userId } }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)
