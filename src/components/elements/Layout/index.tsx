'use client'
import React from 'react'
import { LayoutProps } from './interface'
import { ThemeContextProvider } from '@/components/contexts/ThemeContext'
import Navbar from '../Navbar'
import { Toaster } from '@/components/ui/sonner'
import Footer from '../Footer'
import { AuthContextProvider } from '@/components/contexts/AuthContext'

const Layout = ({ children }: LayoutProps) => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider initialTheme="light">
        <Navbar />
        <Toaster />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}

export default Layout
