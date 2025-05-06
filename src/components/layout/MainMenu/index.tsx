'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { MenuLink } from './MenuLink'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Header, Media } from '@/payload-types'

interface MainMenuProps {
  data: Header
}

export const MainMenu: React.FC<MainMenuProps> = ({ data }) => {
  console.log('🚀 ~ data:', data)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const menuItems = data.navItems

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenSubMenus({})
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle submenu toggle
  const toggleSubMenu = (id: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Close submenu when clicking outside
  const desktopSubMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      Object.keys(desktopSubMenuRefs.current).forEach((key) => {
        const ref = desktopSubMenuRefs.current[key]
        if (ref && !ref.contains(e.target as Node)) {
          setOpenSubMenus((prev) => ({
            ...prev,
            [key]: false,
          }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          'z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          'sticky top-0',
        )}
      >
        {/* Main header with logo and theme selector */}
        <div className="container flex h-16 items-center justify-between">
          {/* Left side with brand name */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              <Logo
                loading="eager"
                priority="high"
                // className="invert dark:invert-0"
                src={(data.logo as Media).url!}
                alt={(data.logo as Media).alt!}
              />
            </Link>
          </div>

          {/* Desktop menu - only visible on md screens and up */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="flex gap-8">
              {menuItems?.map((item) =>
                item.subMenuItems && item.subMenuItems.length > 0 ? (
                  <div
                    key={item.id}
                    className="relative"
                    ref={(ref) => {
                      if (item.id) desktopSubMenuRefs.current[item.id] = ref
                    }}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium',
                        openSubMenus[item.id || ''] && 'text-primary',
                      )}
                      onClick={() => item.id && toggleSubMenu(item.id)}
                      aria-expanded={item.id ? openSubMenus[item.id] : false}
                    >
                      {item.link.label}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          openSubMenus[item.id || ''] && 'rotate-180',
                        )}
                      />
                    </button>
                    {item.id && openSubMenus[item.id] && (
                      <div className="absolute top-full left-0 mt-2 w-56 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {item.subMenuItems.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.link.url || '#'}
                              className="block px-4 py-2 text-sm hover:bg-muted"
                              onClick={() => item.id && toggleSubMenu(item.id)}
                            >
                              {subItem.link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <MenuLink
                    key={item.link.url!}
                    href={item.link.url!}
                    label={item.link.label}
                    className="text-sm font-medium"
                  />
                ),
              )}
            </div>
          </nav>

          {/* Right side with theme toggle and menu button */}
          <div className="flex items-center gap-4">
            {/* Theme Selector */}
            <div className="flex items-center">
              <ThemeSelector />
            </div>

            {/* Mobile menu button - only visible on mobile */}
            <button
              className="inline-flex md:hidden items-center justify-center rounded-md p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay - placed outside header for better z-index control */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 left-0 top-0 w-full h-full bg-white dark:bg-gray-900 z-50 overflow-hidden">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-xl">Aura Studio</div>
            <div className="flex items-center gap-4">
              <ThemeSelector />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu items */}
          <div className="container px-4">
            {menuItems?.map((item) => (
              <div key={item.link.url || item.id} className="border-b">
                {item.subMenuItems && item.subMenuItems.length > 0 ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-5 text-xl font-normal"
                      onClick={() => item.id && toggleSubMenu(item.id)}
                    >
                      {item.link.label}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform',
                          openSubMenus[item.id || ''] && 'rotate-180',
                        )}
                      />
                    </button>
                    {item.id && openSubMenus[item.id] && (
                      <div className="pl-4 pb-3">
                        {item.subMenuItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.link.url || '#'}
                            className="block py-3 text-lg"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.link.url!}
                    className="block py-5 text-xl font-normal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
