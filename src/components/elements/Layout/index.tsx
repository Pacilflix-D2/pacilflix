'use client'
import React from 'react'
import { LayoutProps } from './interface'
import { ThemeContextProvider } from '@/components/contexts/ThemeContext'
import Navbar from '../Navbar'
import { ThemeType } from '@/components/contexts/ThemeContext/interface'
import { Toaster } from '@/components/ui/sonner'

const Layout = ({ children }: LayoutProps) => {
  const theme: ThemeType =
    (localStorage.getItem('theme') as ThemeType | null) || 'dark'

  return (
    <ThemeContextProvider initialTheme={theme}>
      <Navbar />
      <Toaster />
      <main>{children}</main>
    </ThemeContextProvider>
  )
}

export default Layout
