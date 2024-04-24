import { ReactNode } from 'react'

export interface ThemeContextProviderProps {
  children: ReactNode
  initialTheme: ThemeType
}

export type ThemeType = 'dark' | 'light'

export interface ThemeContextInterface {
  theme: ThemeType
  handleTheme: () => void
}
