import axios from 'axios'

const BASE_URL = 'http://35.159.168.248'

// const BASE_URL = 'http://10.10.11.161:8080'

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
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTA3NTQ2OTUsImV4cCI6MTc1MDc5MDY5NX0.oCCzAlv7s_lIdT_TVZHDZ2F3VluWSbSU06wkugkK4z0`
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
