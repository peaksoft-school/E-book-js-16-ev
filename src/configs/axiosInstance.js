import axios from 'axios'

const BASE_URL = 'http://35.159.168.248/api'

export const axiosInstance = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'application/json',
   },
})

const TEMPORARY_HARDCODED_TOKEN =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEwMTQ4NDQsImV4cCI6MTc1NDYxNDg0NH0.P5gYfffXq7FjLzswgg0yxrzUSZNX8WaVdbJ-Dd-MsCY'

let customStore
export const injectStore = (store) => {
   customStore = store
}

axiosInstance.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      // !!! ВАЖНО: ЗАКОММЕНТИРУЙТЕ ИЛИ УДАЛИТЕ ЭТУ СТРОКУ,
      // !!! ИНАЧЕ ОШИБКА 'Cannot destructure property 'token'' БУДЕТ ПРОДОЛЖАТЬСЯ
      // const { token } = customStore.getState()?.auth

      // === Используем жестко закодированный токен ===
      // Эта логика будет использовать жестко закодированный токен
      if (TEMPORARY_HARDCODED_TOKEN) {
         updateConfig.headers.Authorization = `Bearer ${TEMPORARY_HARDCODED_TOKEN}`
      }

      // Если вы когда-либо захотите вернуться к получению токена из Redux,
      // вы раскомментируете предыдущие строки и удалите эту:
      // if (token) {
      //     updateConfig.headers.Authorization = `Bearer ${token}`
      // }

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
// import axios from 'axios'

// const BASE_URL = 'http://35.159.168.248/api'

// export const axiosInstance = axios.create({
//    baseURL: BASE_URL,

//    headers: {
//       'Content-Type': 'application/json',
//    },
// })

// let customStore

// export const injectStore = (store) => {
//    customStore = store
// }

// axiosInstance.interceptors.request.use(
//    (config) => {
//       const updateConfig = { ...config }

//       const { token } = customStore.getState()?.auth

//       if (token) {
//          updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTEwMTQ4NDQsImV4cCI6MTc1NDYxNDg0NH0.P5gYfffXq7FjLzswgg0yxrzUSZNX8WaVdbJ-Dd-MsCY`
//       }

//       return updateConfig
//    },

//    (error) => {
//       return Promise.reject(error)
//    }
// )

// axiosInstance.interceptors.response.use(
//    (response) => {
//       return Promise.resolve(response)
//    },

//    (error) => {
//       return Promise.reject(error)
//    }
// )
