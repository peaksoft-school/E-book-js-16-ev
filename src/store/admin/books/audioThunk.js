import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../configs/axiosInstanceFile'

export const uploadAudio = createAsyncThunk(
   'files/uploadAudio',
   async ({ file, fileType }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('files', file)
         const response = await axiosInstanceFile.post(
            '/api/s3/upload-audio',
            formData
         )

         return {
            url: response.data,
            fileType,
         }
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка загрузки аудио'
         )
      }
   }
)
