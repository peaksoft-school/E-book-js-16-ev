import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../configs/axiosInstance' 

export const fetchBestsellers = createAsyncThunk(
  'books/fetchBestsellers',
  async ({ isBestseller = true, pageNumber = 1, pageSize = 16 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/book/getBestsellerOrNewBookForClient`,
        {},
        {
          params: {
            isBestseller,
            pageNumber,
            pageSize,
          },
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при загрузке бестселлеров'
      )
    }
  }
)



export const fetchAllSortBooks = createAsyncThunk(
  'books/fetchAllBooks',
  async ({ body, pageNumber = 1, pageSize = 16 }, { rejectWithValue }) => {
    try {
  const response = await axiosInstance.post(
  `/api/book/getAllBookForClient?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  body
)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при загрузке книг'
      )
    }
  }
)