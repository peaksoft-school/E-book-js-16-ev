import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import usersSlice from './admin/users/usersSlice'
import { historyActionSlice } from './admin/users/historyActionSlice'
import { vendorSlice } from './admin/vendors/vendorSlice'
import applicationReducer from './admin/applications/applicationSlice'
import bookReducer from './admin/applications/innerpage/bookSlice'
import booksReducer from './admin/books/booksSlice'
import resetFileState from './admin/books/fileSlice'
import addBookReducer from './admin/books/addBookSlice'
import uploadBookReducer from './admin/books/updateSlice'
import fetchBookByIdReducer from './admin/books/fetchBookByIdSlice'
import { authSlice } from './slices/authSlice'
import { clientProfileSlice } from './user/profile/profileSlice'
import { allBookSlice } from './vendor/allBooksSlice'
import { vendorProfileSlice } from './vendor/profile/vendorProfileSlice'
import promoCodeReducer from './vendor/promoSandSlice'
import vendorBookReducer from './vendor/vendorBookSlice'
import deleteVendorBookReducer from './vendor/deleteVendorBookSlice'
import bookClientStateReducer from './user/userBookByIdSlice'
import sortBooksReducer from './user/userSortSlice'
import { historyActionClientSlice } from './user/profile/historyActionClientSlice'
import { basketSlice } from './user/basket/basketSlice'
import promoReducer from './user/promo/promoSlice'
import favoriteBookReducer from './user/favoriteSlice'
import { favoriteSlice } from './user/favorites/userFavoritesSlice'
import { mailingSlice } from './user/mailingSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   allBooks: booksReducer,
   [resetFileState.name]: resetFileState.reducer,
   addBook: addBookReducer,
   updateBook: uploadBookReducer,
   findBook: fetchBookByIdReducer,
   [vendorProfileSlice.name]: vendorProfileSlice.reducer,
   [usersSlice.name]: usersSlice.reducer,
   [historyActionSlice.name]: historyActionSlice.reducer,
   [vendorSlice.name]: vendorSlice.reducer,
   application: applicationReducer,
   book: bookReducer,
   [clientProfileSlice.name]: clientProfileSlice.reducer,
   [allBookSlice.name]: allBookSlice.reducer,
   promoCode: promoCodeReducer,
   vendorBook: vendorBookReducer,
   vendorDeleteBook: deleteVendorBookReducer,
   bookClient: bookClientStateReducer,
   sortBooks: sortBooksReducer,
   [historyActionClientSlice.name]: historyActionClientSlice.reducer,
   [basketSlice.name]: basketSlice.reducer,
   promo: promoReducer,
   favorite: favoriteBookReducer,
   [favoriteSlice.name]: favoriteSlice.reducer,
   [mailingSlice.name]: mailingSlice.reducer,
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
