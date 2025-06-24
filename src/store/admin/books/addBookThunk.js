import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const addBook = createAsyncThunk(
  'books/addBook',
  async ({ type, language, formData }, { rejectWithValue }) => {
    try {
      const data = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            data.append(key, item)
          })
        } else if (value !== undefined && value !== null) {
          data.append(key, value)
        }
      })

      const response = await axiosInstance.post(
        `/api/book/saveBook?type=${type}&language=${language}`,
        data
      )

      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Ошибка при добавлении книги'
      return rejectWithValue(message)
    }
  }
)
