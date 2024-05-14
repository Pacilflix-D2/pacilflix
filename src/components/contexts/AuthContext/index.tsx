import { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextInterface,
  AuthContextProviderProps,
  BaseAPIResponse,
  RequestInit,
} from './interface'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  async function customFetch<T = undefined>(
    url: string,
    options: RequestInit = { isAuthorized: false }
  ): Promise<BaseAPIResponse<T>> {
    const headers = { authorization: '', 'Content-Type': 'application/json' }
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    if (baseUrl === undefined) {
      throw new Error('Base URL is empty.')
    }

    const fullUrl = new URL(url, baseUrl)

    if (options.isAuthorized) {
      const token = localStorage.getItem('token') // token ini username pengguna nya
      headers['authorization'] = `Bearer ${token}`
    }

    const rawResult = await fetch(fullUrl.toString(), {
      headers,
      ...options,
    })

    const result = await rawResult.json()

    if (result.code === 401) {
      localStorage.removeItem('token')
    }

    return result
  }

  async function login({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    setIsAuthenticated(true)
    const response = await customFetch<{ username: string }>(
      '/api/auth/login/',
      {
        body: JSON.stringify({
          username,
          password,
        }),
        method: 'post',
      }
    )

    if (response.success) {
      localStorage.setItem('token', response.data.username)
      setIsAuthenticated(true)
      router.push('/tayangan')
    } else {
      toast.error('Failed to login.')
    }
  }

  async function logout() {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/tayangan')
  }

  useEffect(() => {
    setIsLoading(true)
    const isAuthenticatedLocalStorage = window.localStorage.getItem('token')

    if (!isAuthenticatedLocalStorage) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(JSON.parse(isAuthenticatedLocalStorage))
    }
    setIsLoading(false)
  }, [router])

  const contextValue: AuthContextInterface = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    login,
    logout,
    customFetch,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
