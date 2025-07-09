import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance' 

export const deleteVendorBook = createAsyncThunk(
  'vendorBook/deleteVendorBook',
  async (bookItemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`api/bookItem/deleteBookItemVendor/${bookItemId}`)
      return response.data.message 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при удалении книги'
      )
    }
  }
)
