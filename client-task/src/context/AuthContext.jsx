import Cookies from 'js-cookie'
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

  const signup = async user => {
    try {
      const res = await registerRequest(user)
      console.log(res)
      setUser(res)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error)
      console.log(error)
    }
  }

  const signin = async user => {
    try {
      const res = await loginRequest(user)
      setIsAuthenticated(true)
      setUser(res)
    } catch (error) {
      if (Array.isArray(error)) {
        return setErrors(error)
      }
      setErrors([error.message])
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }
        setIsAuthenticated(true)
        setUser(res)
        setLoading(false)
        console.log('cookies con document', document.cookie)
        console.log(cookies.token)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
      }
    }
    checkLogin()
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
