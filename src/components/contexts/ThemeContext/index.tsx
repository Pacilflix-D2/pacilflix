'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  ThemeContextInterface,
  ThemeContextProviderProps,
  ThemeType,
} from './interface'

const ThemeContext = createContext({} as ThemeContextInterface) // TODO: Declare interface of contextValue

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme || 'dark')

  const handleTheme = () => {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.add(theme === 'dark' ? 'dark' : 'light')
    return () => {
      document
        .querySelector('html')
        ?.classList.remove(theme === 'dark' ? 'dark' : 'light')
    }
  }, [theme])

  const contextValue = {
    theme,
    handleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
