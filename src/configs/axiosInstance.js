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

      const { token } = customStore.getState()?.auth

      if (token) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTAzOTg3NTAsImV4cCI6MTc1MDQzNDc1MH0.IVgx08aN-9hCu-bD34X0GyZwWBrjylo9bONDevkZipQ`
      }

      return updateConfig
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error)
)
