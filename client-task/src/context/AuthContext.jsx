import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'
export const AuthContext = createContext()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('UseAuth must be used within an authprovider')
  }
  return context
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const signup = async userData => {
    // Cambié 'user' a 'userData' para evitar confusión con el estado 'user'
    try {
      const res = await registerRequest(userData)
      console.log('Registro exitoso:', res)
    } catch (error) {
      console.error('Error en signup:', error)
      setErrors(
        Array.isArray(error) ? error : [error.message || 'Error en el registro']
      )
    }
  }

  const signin = async userData => {
    try {
      setLoading(true)
      const res = await loginRequest(userData)
      if (res.token) {
        localStorage.setItem('token', res.token)
        setUser({ id: res.id, username: res.username, email: res.email })
        setIsAuthenticated(true)
        setErrors([])
      } else {
        throw new Error('Token no recibido del backend')
      }
    } catch (error) {
      console.error('Error en signin:', error)
      localStorage.removeItem('token') // Limpiar token si el login falla
      setUser(null)
      setIsAuthenticated(false)
      setErrors(
        Array.isArray(error)
          ? error
          : [error.message || 'Error en el inicio de sesión']
      )
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
    await instance.post('/logout')
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        setUser(null)
        return
      }

      try {
        const res = await verifyTokenRequest()
        if (res && res.id) {
          setIsAuthenticated(true)
          setUser(res)
        } else {
          setIsAuthenticated(false)
          setUser(null)
          localStorage.removeItem('token') // Token inválido o usuario no encontrado
        }
      } catch (error) {
        console.error('Error verificando token:', error)
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkLoginStatus()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        logout,
        user,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
