import axios from './axios'
const API = 'http://localhost:3000'

export const registerRequest = async user => {
  try {
    const response = await axios.post(`/registro`, user)
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}

export const loginRequest = async user => {
  try {
    const response = await axios.post(`/login`, user)
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}

export const verifyTokenRequest = () => axios.get('/verify')
