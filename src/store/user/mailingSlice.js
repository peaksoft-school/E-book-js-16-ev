import { createSlice } from '@reduxjs/toolkit'
import { addUserToMailList } from './mailingThunk'

const initialState = {
   isLoading: false,
   error: null,
   successMessage: null,
}

const mailingSlice = createSlice({
   name: 'mailing',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(addUserToMailList.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.successMessage = null
         })
         .addCase(addUserToMailList.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.successMessage = payload.message
         })
         .addCase(addUserToMailList.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload || 'Произошла ошибка'
         })
   },
})

const MAILING_ACTION = mailingSlice.actions
export { MAILING_ACTION, mailingSlice }
