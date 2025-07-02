import { createSlice } from '@reduxjs/toolkit'
import { uploadPDF } from './pdfThunk'
import { uploadImages } from './imageThunk'
import { uploadAudio } from './audioThunk'
import { updateAudio } from './updateAudioThunk'
import { updateImage } from './updateImagesThunk'
import { updatePDF } from './updatePdfThunk'

const initialState = {
   images: [],
   pdf: '',
   audio: '',
   fragment: '',
   loading: false,
   error: null,
}

const fileSlice = createSlice({
   name: 'files',
   initialState,
   reducers: {
      resetFileState: (state) => {
         state.images = []
         state.pdf = ''
         state.audio = ''
         state.fragment = ''
         state.loading = false
         state.error = null
      },
      setAudio: (state, { payload }) => {
         state.audio = payload
      },
      setFragment: (state, { payload }) => {
         state.fragment = payload
      },
      setPDF: (state, { payload }) => {
         state.pdf = payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(uploadImages.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(uploadImages.fulfilled, (state, { payload }) => {
            state.images = payload
            state.loading = false
         })
         .addCase(uploadImages.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })
         .addCase(uploadPDF.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(uploadPDF.fulfilled, (state, { payload }) => {
            state.pdf = payload
            state.loading = false
         })
         .addCase(uploadPDF.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })
         .addCase(uploadAudio.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(uploadAudio.fulfilled, (state, action) => {
            const { url, fileType } = action.payload

            if (fileType === 'audio') {
               state.audio = url
            } else if (fileType === 'fragment') {
               state.fragment = url
            }

            state.loading = false
            state.error = null
         })

         .addCase(uploadAudio.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
         })
         .addCase(updateAudio.fulfilled, (state, { payload }) => {
            state.audio = payload
            state.loading = false
         })
         .addCase(updatePDF.fulfilled, (state, { payload }) => {
            state.pdf = payload
            state.loading = false
         })
         .addCase(updateImage.fulfilled, (state, { payload }) => {
            state.images.push(payload)
            state.loading = false
         })
   },
})

export const { resetFileState, setAudio, setFragment, setPDF } =
   fileSlice.actions
export default fileSlice
