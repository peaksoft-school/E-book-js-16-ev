import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../configs/axiosInstanceFile'
export const uploadImages = createAsyncThunk(
  'books/uploadImages',
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })

      const response = await axiosInstanceFile.post('/api/s3/upload', formData)
      return response.data
    } catch (error) {
      console.error('uploadImages error:', error.response || error)
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка загрузки изображений'
      )
    }
  }
)
