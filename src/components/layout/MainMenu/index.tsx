'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Header, Media } from '@/payload-types'
import { MobileMenu } from './MobileMenu'
import { DesktopMenu } from './DesktopMenu'

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
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <nav className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Logo
                loading="eager"
                priority="high"
                src={(data.logo as Media).url!}
                alt={(data.logo as Media).alt!}
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopMenu
              data={data}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Selector */}

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
        <MobileMenu
          data={data}
          isOpen={mobileMenuOpen}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </header>
    </>
  )
}
