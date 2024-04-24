import { ReactNode } from 'react'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  login: () => void
  logout: () => void
}
