import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { vendorSlice } from './admin/vendors/vendorSlice'
import booksReducer from './admin/books/booksSlice'
import resetFileState from './admin/books/fileSlice'
import addBookReducer from './admin/books/addBookSlice'
import uploadBookReducer from './admin/books/updateSlice'
import fetchBookByIdReducer from './admin/books/fetchBookByIdSlice'
import { authSlice } from './slices/authSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   allBooks: booksReducer,
   [resetFileState.name]: resetFileState.reducer,
   addBook: addBookReducer,
   updateBook: uploadBookReducer,
   findBook: fetchBookByIdReducer,
   [vendorSlice.name]: vendorSlice.reducer,
})

const persistConfig = {
   key: 'E-BOOK',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

const persistor = persistStore(store)

export { store, persistor }
