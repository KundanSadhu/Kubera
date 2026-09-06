import axios from 'axios'

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const baseURL = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl
const api = axios.create({ baseURL, timeout: 10000 })

// Log API URL in dev for debugging (remove in prod)
if (import.meta.env.DEV) console.log('[KUBERA] API baseURL:', baseURL)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kubera_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
