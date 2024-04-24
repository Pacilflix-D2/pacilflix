import { createContext, useContext, useState } from 'react'
import { AuthContextInterface, AuthContextProviderProps } from './interface'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  async function login() {
    setIsAuthenticated(true)
  }

  async function logout() {
    setIsAuthenticated(false)
  }

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
