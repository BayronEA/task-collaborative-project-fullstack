import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.APIBACKEND,
  withCredentials: true
})

export default instance
