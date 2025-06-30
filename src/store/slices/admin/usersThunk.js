import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const getAllUsers = createAsyncThunk(
   'users/getAll',
   async ({ pageNumber = 1, pageSize = 12 }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/user/getAllUsers', {
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

// export const deleteUser = createAsyncThunk(
//    'users/deleteUser',
//    async ({ clientId }, { rejectWithValue }) => {
//       try {
//          await axiosInstance.delete(`/user/deleteUser/${clientId}`)
//          return clientId
//       } catch (error) {
//          return rejectWithValue(
//             error.response?.data?.message ||
//                'Ошибка сервера при удалении пользователя.'
//          )
//       }
//    }
// )

export const deleteUser = createAsyncThunk(
   'user/deleteUser',
   async ({ clientId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/user/deleteUser/${clientId}`
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
