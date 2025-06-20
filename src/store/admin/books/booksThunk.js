import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBooksByGenre = createAsyncThunk(
  'books/fetchBooksByGenre',
  async ({ genre, pageNumber = 1, pageSize = 8 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/bookItem/findByGenreBooks', {
        params: { genre, pageNumber, pageSize },
      })
      return {
        books: response.data.content || [],
        totalElements: response.data.totalElements,
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Ошибка загрузки книг по жанру')
    }
  }
)

export const fetchBooksByType = createAsyncThunk(
  'books/fetchBooksByType',
  async ({ type, pageNumber = 1, pageSize = 8 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/bookItem/findByTypeBooks', {
        params: { type, pageNumber, pageSize },
      })
      return {
        books: response.data.content || [],
        totalElements: response.data.totalElements,
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Ошибка загрузки книг по типу')
    }
  }
)
