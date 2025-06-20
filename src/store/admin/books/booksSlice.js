import { createSlice } from '@reduxjs/toolkit'
import { fetchBooksByGenre, fetchBooksByType } from './booksThunk'

const initialState = {
   genres: [],
   genreBooks: [],
   typeBooks: [],
   selectedGenre: null,
   selectedFormat: null,
   loading: false,
}

const booksSlice = createSlice({
   name: 'books',
   initialState,
   reducers: {
      setGenre: (state, action) => {
         state.selectedGenre = action.payload
      },
      setFormat: (state, action) => {
         state.selectedFormat = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBooksByGenre.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchBooksByGenre.fulfilled, (state, action) => {
            state.genreBooks = action.payload.content || []
            state.loading = false
         })
         .addCase(fetchBooksByGenre.rejected, (state) => {
            state.loading = false
         })
         .addCase(fetchBooksByType.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchBooksByType.fulfilled, (state, action) => {
            state.typeBooks = action.payload.content || []
            state.loading = false
         })
         .addCase(fetchBooksByType.rejected, (state) => {
            state.loading = false
         })
   },
})

export const { setGenre, setFormat } = booksSlice.actions
export default booksSlice.reducer
