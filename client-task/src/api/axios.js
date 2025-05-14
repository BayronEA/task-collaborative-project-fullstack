import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_APIBACKEND || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
