import { createSlice } from '@reduxjs/toolkit'
import { fetchAllBooks } from './cardAllBooksThunk'

const initialState = {
   allBooks: [],
   totalElements: 0,
   pageNumber: 1,
   pageSize: 8,
   loading: false,
   error: null,
   selectedGenre: '',
   selectedFormat: '',
}

const cardAllBooksSlice = createSlice({
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
         .addCase(fetchAllBooks.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAllBooks.fulfilled, (state, action) => {
            state.loading = false
            state.allBooks = action.payload.content || []
            state.totalElements = action.payload.totalElements || 0
         })
         .addCase(fetchAllBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { setGenre, setFormat, setPageNumber } = cardAllBooksSlice.actions
export default cardAllBooksSlice.reducer
