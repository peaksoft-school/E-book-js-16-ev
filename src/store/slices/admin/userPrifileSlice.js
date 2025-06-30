import { createSlice } from '@reduxjs/toolkit'
import { getUserById } from './userProfileThunk'

const initialState = {
   isLoading: false,
   error: null,
   selectedUser: null,
}
const userProfileSlice = createSlice({
   name: 'userProfile',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUserById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getUserById.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.selectedUser = action.payload
         })
         .addCase(getUserById.rejected, (state, action) => {
            state.isLoading = false
            state.selectedUser = null
            state.error = action.payload
         })
   },
})

export default userProfileSlice.reducer
