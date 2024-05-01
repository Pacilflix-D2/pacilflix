import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextInterface, AuthContextProviderProps } from './interface'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function login() {
    setIsAuthenticated(true)
    window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
  }

  async function logout() {
    setIsAuthenticated(false)
    window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
  }

  useEffect(() => {
    setIsLoading(true)
    const isAuthenticatedLocalStorage =
      window.localStorage.getItem('isAuthenticated')

    if (!isAuthenticatedLocalStorage) {
      window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(JSON.parse(isAuthenticatedLocalStorage))
    }
    setIsLoading(false)
  }, [])

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
