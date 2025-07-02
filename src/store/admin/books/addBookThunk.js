import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../configs/axiosInstance'

export const addBook = createAsyncThunk(
   'books/addBook',
   async ({ type, language, formData }, { rejectWithValue }) => {
      try {
         const data = new FormData()

         const bookData = {
            bookName: formData.bookName,
            description: formData.description,
            fragment: formData.fragment,
            discount: parseFloat(formData.discount) || 0,
            price: parseFloat(formData.price) || 0,
            year: parseInt(formData.year, 10) || 0,
            authors: formData.authors,
            images: formData.images,
            genres: formData.genres,
            bestSeller: formData.bestSeller,
            ...(type === 'PAPER' && {
               bookRequest: {
                  publisher: formData.publisher,
                  pages: parseInt(formData.pages, 10) || 0,
                  count: parseInt(formData.count, 10) || 0,
               },
            }),
            ...(type === 'AUDIO' && {
               audioBookRequest: {
                  audio: formData.audio,
                  hours: parseInt(formData.hours, 10) || 0,
                  minutes: parseInt(formData.minutes, 10) || 0,
                  seconds: parseInt(formData.seconds, 10) || 0,
               },
            }),
            ...(type === 'ELECTRONIC' && {
               electroBookRequest: {
                  publisher: formData.publisher,
                  pages: parseInt(formData.pages, 10) || 0,
                  pdf: formData.pdf,
               },
            }),
         }
         data.append('book', JSON.stringify(bookData))

         const response = await axiosInstance.post(
            `/api/book/saveBook?type=${type}&language=${language}`,
            JSON.stringify(bookData)
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
