import axios from 'axios'

// const BASE_URL = 'http://35.159.168.248'

const BASE_URL = 'http://10.10.11.161:8282'


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
      if (!customStore) {
         console.warn('🚨 Store not injected yet!')
         return config
      }

      const { token } = customStore.getState()?.auth

      console.log('👉 Токен:', token)

      if (token) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDk2NDYyMzQsImV4cCI6MTc0OTY4MjIzNH0.nAtG46BuFfw-uZz7c2OgekpsejCmy8vOP_a3woNp_KA`
      }

      return updateConfig
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error)
)
