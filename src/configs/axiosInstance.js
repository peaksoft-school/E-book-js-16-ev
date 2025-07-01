import axios from 'axios'

const BASE_URL = 'http://10.10.11.161:8282'

export const axiosInstance = axios.create({
   baseUrl: BASE_URL,

   headers: {
      'Content-Type': 'application/json',
   },
})

let customStore

export const injectStore = (store) => {
   customStore = store
}

axiosInstance.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      // const { token } = customStore.getState()?.auth

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlbmRvckBnbWFpbC5jb20iLCJpZCI6Nywicm9sZSI6IlZFTkRPUiIsImlhdCI6MTc1MTM3NzUyOCwiZXhwIjoxNzU0OTc3NTI4fQ.LxZWmC2qLni10PFcgolNqKWWNf5ELgALzS8qfvUTCno'

      if (token) {
         updateConfig.headers.Authorization = `Bearer ${token}`
      }

      return updateConfig
   },

   (error) => {
      return Promise.reject(error)
   }
)

axiosInstance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },

   (error) => {
      return Promise.reject(error)
   }
)
