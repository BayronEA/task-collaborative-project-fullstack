import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_APIBACKEND,
  withCredentials: true
})

export default instance
