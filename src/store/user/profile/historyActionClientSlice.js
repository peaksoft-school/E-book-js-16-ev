import { createSlice } from '@reduxjs/toolkit'
import {
   getClientFavoriteHistoryAction,
   getClientPurchaseHistoryAction,
   getClinetBasketHistoryAction,
} from './historyActionClientThunk'

const initialState = {
   basketHistory: [],
   favoriteHistory: [],
   purchaseHistory: [],
   error: null,
   isLoading: false,
   pageNumber: 1,
   pageSize: 15,
   totalElements: 0,
   totalPages: 0,
}
const historyActionClientSlice = createSlice({
   name: 'historyActionsClient',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getClinetBasketHistoryAction.pending, (state) => {
            state.error = null
            state.isLoading = true
         })
         .addCase(
            getClinetBasketHistoryAction.fulfilled,
            (state, { payload }) => {
               state.isLoading = false
               state.basketHistory = payload.content[0]?.bookItemResponses || []
               state.pageNumber = payload.pageNumber
               state.pageSize = payload.pageSize
               state.totalElements = payload.totalElements
               state.totalPages = payload.totalPages
            }
         )
         .addCase(
            getClinetBasketHistoryAction.rejected,
            (state, { payload }) => {
               state.error = payload
               state.isLoading = false
            }
         )
         .addCase(getClientFavoriteHistoryAction.pending, (state) => {
            state.error = null
            state.isLoading = true
         })
         .addCase(
            getClientFavoriteHistoryAction.fulfilled,
            (state, { payload }) => {
               state.isLoading = false
               state.favoriteHistory =
                  payload.content[0]?.bookItemResponses || []
               state.pageNumber = payload.pageNumber
               state.pageSize = payload.pageSize
               state.totalElements = payload.totalElements
               state.totalPages = payload.totalPages
            }
         )
         .addCase(
            getClientFavoriteHistoryAction.rejected,
            (state, { payload }) => {
               state.error = payload
               state.isLoading = false
            }
         )
         .addCase(getClientPurchaseHistoryAction.pending, (state) => {
            state.error = null
            state.isLoading = true
         })
         .addCase(
            getClientPurchaseHistoryAction.fulfilled,
            (state, { payload }) => {
               state.isLoading = false
               state.purchaseHistory =
                  payload.content[0]?.bookItemResponses || []
               state.pageNumber = payload.pageNumber
               state.pageSize = payload.pageSize
               state.totalElements = payload.totalElements
               state.totalPages = payload.totalPages
            }
         )
         .addCase(
            getClientPurchaseHistoryAction.rejected,
            (state, { payload }) => {
               state.error = payload
               state.isLoading = false
            }
         )
   },
})

const HISTORY_ACTION_CLIENT = historyActionClientSlice.actions
export { HISTORY_ACTION_CLIENT, historyActionClientSlice }
