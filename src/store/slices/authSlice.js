import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BACE_URL = 'http://http://35.159.168.248/api'

initialState = {
   user: null,
   token: null,
   isAuthenticated: false,
   loading: false,
   error: null,
}

export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         }
         const response = await axios.post(
            `${BACE_URL}/auth/signIn`,
            { email, password },
            config
         )
         return response.data
      } catch (error) {}
   }
)

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async ({ name, email, password }, { rejectWithValue }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         }
         const response = await axios.post(
            `${BACE_URL}/auth/signUp`,
            { name, email, password },
            config
         )
         return response.data
      } catch (error) {}
   }
)

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: { setCredentials: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isAuthenticated = true;
    state.loading = false;
    state.error = null;
  },
  logout: (state) => {
    localStorage.removeItem('userToken'); 
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.error = null;
  },
  loadUserFromStorage: (state) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      state.token = token;
      state.isAuthenticated = true;
    }
  },},
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
            state.user = null
            state.token = null
         })
         .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
            state.user = null
            state.token = null
         })
   },
})
export 
export default authSlice.reducer
