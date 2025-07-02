import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../configs/axiosInstanceFile'

export const updatePDF = createAsyncThunk(
   'files/updatePDF',
   async ({ newFile, oldFileUrl }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('file', newFile)
         formData.append('oldFileUrl', oldFileUrl)

         const response = await axiosInstanceFile.put(
            '/api/s3/update-pdf',
            formData
         )

         return response.data
      } catch (error) {
         return rejectWithValue(
            error.response?.data?.message || 'Ошибка при обновлении PDF'
         )
      }
   }
)
