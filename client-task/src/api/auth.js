import instance from './axios'

export const registerRequest = async user => {
  try {
    const response = await instance.post(`/registro`, user)
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
    const response = await instance.post(`/login`, user)
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}

export const verifyTokenRequest = () => instance.get('/verify')
