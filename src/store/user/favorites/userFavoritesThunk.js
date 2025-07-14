import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getAllFavorites = createAsyncThunk(
   'user/getAllFavorites',

   async ({ pageNumber, pageSize }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/favorite/getAllFavorites`,

            { params: { pageNumber, pageSize } }
         )

         return response.data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Ошибка '
         return rejectWithValue(message)
      }
   }
)

export const deleteFavoriteById = createAsyncThunk(
   'user/deleteFavoriteById',

   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/favorite/deleteFavoriteById`,

            { params: { bookItemId } }
         )

         return response.data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Ошибка '
         return rejectWithValue(message)
      }
   }
)

export const deleteAllFavorites = createAsyncThunk(
   'user/deleteAllFavorites',

   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/favorite/deleteAllFavorites`
         )

         return response.data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Ошибка '
         return rejectWithValue(message)
      }
   }
)

export const addBookToBasket = createAsyncThunk(
   'user/addBookToBasket',

   async ({ bookItemId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/api/basket/addBookToBasket/${bookItemId}`
         )

         return response.data
      } catch (error) {
         const message =
            error.response?.data?.message || error.message || 'Ошибка '
         return rejectWithValue(message)
      }
   }
)
