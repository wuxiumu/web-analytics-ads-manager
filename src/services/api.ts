import axios from 'axios'

// 预留后端接口，当前使用 localStorage 作为数据源
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

export default api
