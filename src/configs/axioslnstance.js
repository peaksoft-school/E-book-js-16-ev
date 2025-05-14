import axios from 'axios'

const BASE_URL = ''

export const axiosInstance = axios.create({
    baseUrl: BASE_URL,


})

let customStore

export const injecStore = (store) => {
    customStore = store
}

axiosInstance.interceptors.request.use((config) => {
    const updateConfig = {...config}

    const {token} =customStore.getState().auth

    if (token) {
        updateConfig.headers.Authorization = `Bearer ${token}`
    }

    return updateConfig
},
(error) => {
    return Promise.reject(error)
}
)
