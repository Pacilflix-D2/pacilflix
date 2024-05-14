import { ReactNode } from 'react'
import { RequestInit as BaseRequestInit } from 'next/dist/server/web/spec-extension/request'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  login: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => void
  logout: () => void
  customFetch: <T = undefined>(
    url: string,
    options?: RequestInit
  ) => Promise<BaseAPIResponse<T>>
}

export interface RequestInit extends BaseRequestInit {
  isAuthorized?: boolean
}

export interface BaseAPIResponse<T = undefined> {
  code: number
  success: boolean
  message: string
  data: T
}
