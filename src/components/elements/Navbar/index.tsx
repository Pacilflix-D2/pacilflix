'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { BookHeart, CodeXml, Download, Tv } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { NavLink } from './interface'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useThemeContext } from '@/components/contexts/ThemeContext'

const Navbar = () => {
  const daftarNavList: NavLink[] = [
    {
      url: '/tayangan',
      name: 'Tayangan',
      icon: Tv,
    },
    {
      url: '/favorites',
      name: 'Favorit',
      icon: BookHeart,
    },
    {
      url: '/downloads',
      name: 'Unduhan',
      icon: Download,
    },
    {
      url: '/contributor',
      name: 'Kontributor',
      icon: CodeXml,
    },
  ]

  const { theme, handleTheme } = useThemeContext()

  return (
    <div className="flex justify-between z-50 fixed w-[90%] left-1/2 -translate-x-1/2 top-2 p-4 bg-slate-500 bg-opacity-10 rounded-xl backdrop-blur-sm">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-3">
          <NavigationMenuItem>
            <Link href="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Daftar</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-slate-500 bg-opacity-10 rounded-xl backdrop-blur-md">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {daftarNavList.map((daftar, index) => {
                  const Icon = daftar.icon

                  return (
                    <li key={index}>
                      <NavigationMenuLink
                        href={daftar.url}
                        className="flex items-center gap-2"
                      >
                        {Icon && <Icon />}
                        {daftar.name}
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/subscription">
              <NavigationMenuLink>Langganan</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-2">
        <Switch
          id="theme-mode"
          checked={theme == 'light'}
          onClick={handleTheme}
        />
        <Label htmlFor="theme-mode">Theme</Label>
      </div>
    </div>
  )
}

export default Navbar
