import { ReactNode } from 'react'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  login: () => void
  logout: () => void
}
