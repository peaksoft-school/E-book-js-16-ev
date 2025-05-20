import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
   name: 'auth',
   initialState: {},
   reducers: {},

   extraReducers: () => {},
})

const EXAMPLE_ACTION = authSlice.actions

export { authSlice, EXAMPLE_ACTION }
