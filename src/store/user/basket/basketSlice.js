import { createSlice } from '@reduxjs/toolkit'
import {
   getAll,
   decreaseQuantityBookItem,
   increaseQuantityBookItem,
   basketDelete,
   basketDeleteById,
   payment,
   addFavoriteBookForClient,
} from './basketThunk'

const initialState = {
   basket: [],
   summary: {
      quantityOfBookItems: 0,
      discount: 0,
      promoCodeDiscount: 0,
      totalPrice: 0,
   },
   isLoading: false,
   error: null,
   sessionUrl: null,
   favorites: [],
}

const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      clearBasketError: (state) => {
         state.error = null
      },
      clearSessionUrl: (state) => {
         state.sessionUrl = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 📦 Get Basket
         .addCase(getAll.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(getAll.fulfilled, (state, action) => {
            state.isLoading = false
            state.basket = action.payload.content
            state.summary = action.payload.result
            state.error = null
         })
         .addCase(getAll.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // ➖ Decrease quantity
         .addCase(decreaseQuantityBookItem.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(decreaseQuantityBookItem.fulfilled, (state) => {
            state.isLoading = false
         })
         .addCase(decreaseQuantityBookItem.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // ➕ Increase quantity
         .addCase(increaseQuantityBookItem.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(increaseQuantityBookItem.fulfilled, (state) => {
            state.isLoading = false
         })
         .addCase(increaseQuantityBookItem.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // ❌ Delete entire basket
         .addCase(basketDelete.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(basketDelete.fulfilled, (state) => {
            state.isLoading = false
            state.basket = []
            state.summary = {
               quantityOfBookItems: 0,
               discount: 0,
               promoCodeDiscount: 0,
               totalPrice: 0,
            }
         })
         .addCase(basketDelete.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // ❌ Delete item by ID
         .addCase(basketDeleteById.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(basketDeleteById.fulfilled, (state) => {
            state.isLoading = false
         })
         .addCase(basketDeleteById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // 💳 Payment
         .addCase(payment.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(payment.fulfilled, (state, action) => {
            state.isLoading = false
            state.sessionUrl = action.payload.sessionUrl
            state.basket = []
            state.summary = {
               quantityOfBookItems: 0,
               discount: 0,
               promoCodeDiscount: 0,
               totalPrice: 0,
            }
         })
         .addCase(payment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

         // ⭐️ Add favorite book
         .addCase(addFavoriteBookForClient.pending, (state) => {
            state.isLoading = true
            state.error = null
         })
         .addCase(addFavoriteBookForClient.fulfilled, (state, action) => {
            state.isLoading = false
            if (!state.favorites) {
               state.favorites = []
            }
            state.favorites.push(action.payload)
         })

         .addCase(addFavoriteBookForClient.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

const BASKET_ACTION = basketSlice.actions
export { BASKET_ACTION, basketSlice }
