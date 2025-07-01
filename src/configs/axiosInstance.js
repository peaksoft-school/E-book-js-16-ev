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

      // const { token } = customStore.getState()?.auth

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEzNzE2NTUsImV4cCI6MTc1NDk3MTY1NX0.JwDyMNdjs9Qd5-PDABQCLu8bF0gLlGoL_U3PNVfW-KU'

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
