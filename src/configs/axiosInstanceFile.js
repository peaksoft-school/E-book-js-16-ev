import axios from 'axios'

// const BASE_URL = 'http://35.159.168.248'

const BASE_URL = 'http://192.168.43.200:8081'

export const axiosInstanceFile = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'multipart/form-data',
   },
})

let customStore

export const injectStoreFile = (store) => {
   customStore = store
}

axiosInstanceFile.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      const { token } = customStore.getState()?.auth

      if (token) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTA3NzI0NjIsImV4cCI6MTc1MTEzMjQ2Mn0._oLrnwTrOAOUA3yJoy0KGtBKeo3Trb39Y8kZ4F-gx8E`
      }

      return updateConfig
   },

   (error) => {
      return Promise.reject(error)
   }
)

axiosInstanceFile.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },

   (error) => {
      return Promise.reject(error)
   }
)
