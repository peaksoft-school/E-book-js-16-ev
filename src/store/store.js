import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import applicationReducer from './applications/applicationSlice'
import { authSlice } from './authSlice'
import bookReducer from './applications/innerpage/bookSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   application: applicationReducer,
   book: bookReducer,
})

const persistConfig = {
   key: 'E-BOOK',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store)

export { store, persistor }
