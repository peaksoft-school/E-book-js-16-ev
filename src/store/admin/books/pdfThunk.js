import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../configs/axiosInstanceFile'

export const uploadPDF = createAsyncThunk(
   'books/uploadPDF',
   async (files, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('files', files)

         const response = await axiosInstanceFile.post(
            '/api/s3/upload-pdf',
            formData
         )
         console.log(response , 'url')
         return response.data // Returns the S3 URL as a string
      } catch (error) {
         console.error('uploadPDF error:', error.response || error)
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка загрузки PDF'
         )
      }
   }
)
