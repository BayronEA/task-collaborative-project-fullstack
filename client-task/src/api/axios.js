import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APIBACKEND, // Asegúrate de que esta sea la URL correcta de tu backend
  withCredentials: false // Ya no necesitamos esto con localStorage y tokens Bearer
})

// Interceptor para incluir el token en las cabeceras
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
