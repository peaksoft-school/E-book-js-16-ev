import axios from 'axios'

const BASE_URL = 'http://35.159.168.248'

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
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEyNjY2ODEsImV4cCI6MTc1NDg2NjY4MX0.QEudq2gfWwrYNMu4qsxGOknqD84Udt_TPQFbWx-G_TI`
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
