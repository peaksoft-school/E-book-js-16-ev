import { createSlice } from '@reduxjs/toolkit'
import { addBook } from './addBookThunk'

const initialState = {
  loading: false,
  error: null,
  success: false,
}

const addBookSlice = createSlice({
  name: 'addBook',
  initialState,
  reducers: {
    resetAddBookState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetAddBookState } = addBookSlice.actions
export default addBookSlice.reducer
