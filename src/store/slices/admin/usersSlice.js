import { createSlice } from '@reduxjs/toolkit'
import { deleteUser, getAllUsers } from './usersThunk'
import { use } from 'react'

const initialState = {
   users: [],
   isLoading: false,
   error: null,
   pageNumber: 1,
   pageSize: 15,
   totalElements: 0,
   totalPages: 0,
   selectedUser: null,
}

const userSlices = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.map((u) => ({
               id: u.clientId,
               name: u.firstName,
               email: u.email,
               role: u.role,
            }))
            state.totalPages = 1
            state.totalElements = action.payload.length
            state.pageNumber = action.payload.pageNumber
            state.pageSize = action.payload.pageSize

            state.isLoading = false
         })
         .addCase(getAllUsers.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
         })
         .addCase(deleteUser.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            const deletedUserId = action.meta.arg.clientId
            state.users = state.users.filter(
               (user) => user.id !== deletedUserId
            )
            state.totalElements -= 1
         })

         .addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload
         })
   },
})

export default userSlices.reducer
