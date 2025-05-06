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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-bg backdrop-blur-sm border-b">
        <nav className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Logo
                loading="eager"
                priority="high"
                // className="invert dark:invert-0"
                src={(data.logo as Media).url!}
                alt={(data.logo as Media).alt!}
              />
              {/* <p>Javascript SBU</p> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {data?.navItems?.map((item) => (
                <div key={item.id} className="relative group">
                  {item?.subMenuItems?.length! > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.link.label)}
                        className="nav-link flex items-center gap-1"
                      >
                        {item.link.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {openDropdown === item.link.label && (
                        <div className="absolute top-full left-0 w-56 mt-1 bg-popover text-popover-foreground rounded-md shadow-md overflow-hidden z-50 animate-fade-in">
                          <div className="py-1">
                            {item?.subMenuItems?.map((subItem) => (
                              <Link
                                key={subItem.link.label}
                                href={subItem.link.url!}
                                className="block px-4 py-2 text-sm hover:bg-muted"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.link.url!} className="nav-link">
                      {item.link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <ThemeSelector />

            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
              {data?.navItems?.map((item) => (
                <div key={item.id}>
                  {item?.subMenuItems?.length! ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.link.label)}
                        className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
                      >
                        {item.link.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {openDropdown === item.link.label && (
                        <div className="pl-4 space-y-1 animate-fade-in">
                          {item?.subMenuItems?.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.link.url!}
                              className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.link.url!}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
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
      </header>
    </>
  )
}
