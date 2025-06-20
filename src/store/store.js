import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { authSlice } from './authSlice'
import booksReducer from './admin/books/booksSlice'
import cardAllBooksSliceReducer from './admin/books/cardAllBooksSlice'


const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   books: booksReducer,
   allBooks: cardAllBooksSliceReducer,
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
