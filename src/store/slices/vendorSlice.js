import { createSlice } from '@reduxjs/toolkit'
import {
   getAllVendors,
   deleteVendor,
   getVendorById,
   getAllVendorBooks,
} from './vendorThunk'

const vendorSlice = createSlice({
   name: 'vendor',
   initialState: {
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
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllVendors.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAllVendors.fulfilled, (state, action) => {
            state.vendors = action.payload.content.map((v) => ({
               id: v.vendorId,
               name: v.name,
               phone: v.phoneNumber,
               email: v.email,
               books: v.countBook,
            }))
            state.pageNumber = action.payload.pageNumber
            state.pageSize = action.payload.pageSize
            state.totalElements = action.payload.totalElements
            state.totalPages = action.payload.totalPages
            state.isLoading = false
         })
         .addCase(getAllVendors.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
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
         .addCase(deleteVendor.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         .addCase(getVendorById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getVendorById.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.selectedVendor = action.payload
         })
         .addCase(getVendorById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.selectedVendor = null
         })

         .addCase(getAllVendorBooks.pending, (state) => {
            state.vendorBooks = state.vendorBooks || {
               content: [],
               pageNumber: 1,
               pageSize: 8,
               totalElements: 0,
               totalPages: 0,
               isLoading: false,
               error: null,
            }
            state.vendorBooks.isLoading = true
            state.vendorBooks.error = null
         })
         .addCase(getAllVendorBooks.fulfilled, (state, action) => {
            state.vendorBooks = state.vendorBooks || {}

            state.vendorBooks.isLoading = false
            state.vendorBooks.error = null
            state.vendorBooks.content = action.payload.content
            state.vendorBooks.pageNumber = action.payload.pageNumber
            state.vendorBooks.pageSize = action.payload.pageSize
            state.vendorBooks.totalElements = action.payload.totalElements
            state.vendorBooks.totalPages = action.payload.totalPages
         })
         .addCase(getAllVendorBooks.rejected, (state, action) => {
            state.vendorBooks = state.vendorBooks || {}

            state.vendorBooks.isLoading = false
            state.vendorBooks.error = action.payload
            state.vendorBooks.content = []
         })
   },
})

export default vendorSlice.reducer
