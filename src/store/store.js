import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { storage } from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistreducer'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({})

const persistConfig = {
   key: 'EBOOK',
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
