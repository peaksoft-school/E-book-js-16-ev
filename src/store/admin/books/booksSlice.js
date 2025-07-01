import { createSlice } from '@reduxjs/toolkit'
import { fetchBooksByGenreAndType } from './booksThunk'
import { deleteBook } from './deleteAdminBookThunk'

const initialState = {
   allBooks: [],
   loading: false,
   error: null,
   pageNumber: 1,
   pageSize: 8,
   totalElements: 0,
   selectedGenre: '',
   selectedFormat: '',
}

const bookSlice = createSlice({
   name: 'allBooks',
   initialState,
   reducers: {
      setGenre(state, action) {
         state.selectedGenre = action.payload
         state.pageNumber = 1
      },
      setFormat(state, action) {
         state.selectedFormat = action.payload
         state.pageNumber = 1
      },
      setPageNumber(state, action) {
         state.pageNumber = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchBooksByGenreAndType.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBooksByGenreAndType.fulfilled, (state, action) => {
            state.loading = false
            state.allBooks = action.payload.content || []
            state.totalElements = action.payload.totalElements || 0
         })
         .addCase(fetchBooksByGenreAndType.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteBook.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBook.fulfilled, (state, action) => {
            state.loading = false
            state.allBooks = state.allBooks.filter(
               (book) => book.id !== action.payload
            )
            state.totalElements -= 1
         })
         .addCase(deleteBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { setGenre, setFormat, setPageNumber } = bookSlice.actions
export default bookSlice.reducer
