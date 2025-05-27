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
  if (!customStore) {
      console.warn('🚨 Store not injected yet!')
      return config
    }
      const { token } = customStore.getState()?.auth

      console.log('👉 Токен:', token)
      console.log('Текущее состояние auth:', customStore.getState().auth)


      if (token) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDgwMDMxNTcsImV4cCI6MTc0ODAzOTE1N30.eNUI7XGcQsZyxjrdq4KwVzMMTsfA8B6V3x__1RiTRN4`
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
