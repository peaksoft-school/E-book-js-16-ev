import axios from 'axios'

const BASE_URL = 'http://35.159.168.248'

export const axiosInstance = axios.create({
   baseURL: BASE_URL,
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
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error)
)
