import { createSlice } from '@reduxjs/toolkit'
import {
   deleteVendor,
   findAllVendor,
   findVendorById,
   getAllVendorBooks,
} from './vendorThunk'

const initialState = {
   vendorBooks: {
      content: [],
      pageNumber: 1,
      pageSize: 8,
      totalElements: 0,
      totalPages: 0,
      isLoading: false,
      error: null,
   },
   vendors: [],
   isLoading: false,
   error: null,
   pageNumber: 1,
   pageSize: 15,
   totalElements: 0,
   totalPages: 0,
   selectedVendor: null,
}

const vendorSlice = createSlice({
   name: 'vendor',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(findAllVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(findAllVendor.fulfilled, (state, { payload }) => {
            state.vendors = payload.content.map((v) => ({
               id: v.vendorId,
               name: v.name,
               phone: v.phoneNumber,
               email: v.email,
               books: v.countBook,
            }))
            state.pageNumber = payload.pageNumber
            state.pageSize = payload.pageSize
            state.totalElements = payload.totalElements
            state.totalPages = payload.totalPages
            state.isLoading = false
         })
         .addCase(findAllVendor.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(deleteVendor.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(deleteVendor.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            const deletedVendorId = action.meta.arg.vendorId
            state.vendors = state.vendors.filter(
               (vendor) => vendor.id !== deletedVendorId
            )
            state.totalElements -= 1
         })
         .addCase(deleteVendor.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(findVendorById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(findVendorById.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.selectedVendor = payload
         })
         .addCase(findVendorById.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(getAllVendorBooks.pending, (state) => {
            state.vendorBooks.isLoading = true
            state.vendorBooks.error = null
         })
         .addCase(getAllVendorBooks.fulfilled, (state, { payload }) => {
            state.vendorBooks = state.vendorBooks || {}
            state.vendorBooks.isLoading = false
            state.vendorBooks.error = null
            state.vendorBooks.content = payload.content
            state.vendorBooks.pageNumber = payload.pageNumber
            state.vendorBooks.pageSize = payload.pageSize
            state.vendorBooks.totalElements = payload.totalElements
            state.vendorBooks.totalPages = payload.totalPages
         })
         .addCase(getAllVendorBooks.rejected, (state, { payload }) => {
            state.vendorBooks.isLoading = false
            state.vendorBooks.error = payload
         })
   },
})

const ADMIN_VENDORS_ACTION = vendorSlice.actions

export { ADMIN_VENDORS_ACTION, vendorSlice }
