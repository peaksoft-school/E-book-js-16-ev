import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getAll = createAsyncThunk(
   'user/getAll',
   async ({ pageNumber, pageSize, promoCodes }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/basket/getAll`, {
            params: { pageNumber, pageSize, promoCodes },
         })
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)

export const decreaseQuantityBookItem = createAsyncThunk(
   'user/decr',
   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            '/api/basket/decreaseQuantityBookItem',
            null,
            {
               params: { bookItemId },
            }
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

export const increaseQuantityBookItem = createAsyncThunk(
   'user/incr',
   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            '/api/basket/increaseQuantityBookItem',
            null,
            {
               params: { bookItemId },
            }
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

export const basketDelete = createAsyncThunk(
   'user/deleteBasket',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(`/api/basket`, {})
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)

export const basketDeleteById = createAsyncThunk(
   'user/deleteBasketById',
   async ({ bookId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/basket/book/${bookId}`
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

export const payment = createAsyncThunk(
   'user/payment',
   async ({ amount, basketId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(`/payment/checkout`, {
            amount,
            basketId,
         })
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
         return rejectWithValue(error.message)
      }
   }
)

export const addFavoriteBookForClient = createAsyncThunk(
   'user/addFavoriteBookForClient',

   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/favorite/addFavoriteBookForClient/${bookItemId}`
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
