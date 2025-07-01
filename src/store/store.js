import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersSlice from './slices/admin/usersSlice'
import { historyActionSlice } from './slices/admin/historyActionSlice'
const rootReducer = combineReducers({
   [usersSlice.name]: usersSlice.reducer,
   [historyActionSlice.name]: historyActionSlice.reducer,
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
