import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejar errores de autenticación
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Limpiar cookie y redirigir a login
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
