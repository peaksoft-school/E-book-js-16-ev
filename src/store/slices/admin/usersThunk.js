import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getAllUsers = createAsyncThunk(
   'users/getAll',
   async ({ pageNumber = 1, pageSize = 12 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/user/getAllUsers', {
            params: { pageNumber, pageSize },
         })
         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message ||
               'Ошибка сервера при получении списка пользователей.'
         )
      }
   }
)

export const deleteUser = createAsyncThunk(
   'user/deleteUser',
   async ({ clientId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/user/deleteUser/${clientId}`
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

export const getClientById = createAsyncThunk(
   'user/getById',
   async ({ clientId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/user/getClientById', {
            params: { clientId },
         })
         return response.data
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'error')
      }
   }
)
