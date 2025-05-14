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

// verifyTokenRequest ya no necesita tomar 'token' como argumento
export const verifyTokenRequest = async () => {
  try {
    const response = await instance.get('/verify')
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error en verifyTokenRequest:', error.response.data)
    } else {
      console.error('Error desconocido en verifyTokenRequest:', error)
    }
    throw error
  }
}
