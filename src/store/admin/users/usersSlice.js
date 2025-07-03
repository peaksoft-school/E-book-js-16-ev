import { createSlice } from '@reduxjs/toolkit'
import { deleteUser, getAllUsers, getClientById } from './usersThunk'

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

const usersSlices = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.users = payload.map((u) => ({
               id: u.clientId,
               name: u.firstName,
               email: u.email,
               role: u.role,
            }))
            state.totalPages = 1
            state.totalElements = payload.length
            state.pageNumber = payload.pageNumber
            state.pageSize = payload.pageSize

            state.isLoading = false
         })
         .addCase(getAllUsers.rejected, (state, { payload }) => {
            state.error = payload
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
         .addCase(deleteUser.rejected, (state, { payload }) => {
            state.error = payload
         })
         .addCase(getClientById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getClientById.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.selectedUser = payload
         })
         .addCase(getClientById.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })
   },
})

export const ADMIN_USER_ACTION = usersSlices.actions
export default usersSlices
