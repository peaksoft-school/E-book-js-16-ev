import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const updateClientProfile = createAsyncThunk(
   'user/updateProfile',
   async ({ name, email }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(
            `/api/user/updateClientProfile`,
            { name, email }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const updatePasswordForClient = createAsyncThunk(
   'user/updatePassword',
   async (
      { currentPassword, newPassword, confirmPassword },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/user/updatePasswordForClient`,
            { currentPassword, newPassword, confirmPassword }
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const deleteProfileByClient = createAsyncThunk(
   'user/deleteProfileByClient',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/user/deleteProfileByClient`
         )
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)

export const getClientProfile = createAsyncThunk(
   'user/getClientProfile',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/user/getClientProfile`)
         return data
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
         }
      }
   }
)
