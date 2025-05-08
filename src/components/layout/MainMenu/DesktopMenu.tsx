'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface DesktopMenuProps {
  data: Header
  openDropdown: string | null
  toggleDropdown: (name: string) => void
  setOpenDropdown: (value: string | null) => void
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({
  data,
  openDropdown,
  toggleDropdown,
  setOpenDropdown,
}) => {
  // Track hover state for each menu item
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleMouseEnter = (label: string) => {
    setHoveredItem(label)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
    setOpenDropdown(null)
  }

  return (
    <div className="hidden md:flex items-center gap-10">
      {data?.navItems?.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() =>
            item?.subMenuItems?.length! > 0 ? handleMouseEnter(item.link.label) : null
          }
          onMouseLeave={handleMouseLeave}
        >
          {item?.subMenuItems?.length! > 0 ? (
            <>
              <button
                className="nav-link flex items-center gap-1"
                onClick={() => toggleDropdown(item.link.label)}
              >
                {item.link.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              {(openDropdown === item.link.label || hoveredItem === item.link.label) && (
                <div className="absolute top-full left-0 w-56 bg-popover text-popover-foreground rounded-md shadow-md overflow-hidden z-50 animate-fade-in">
                  <div className="py-1">
                    {item?.subMenuItems?.map((subItem) => (
                      <CMSLink
                        key={subItem.id}
                        {...subItem.link}
                        appearance="ghost"
                        className="block px-4 text-sm hover:bg-muted m-0"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <CMSLink {...item.link} appearance="ghost" />
          )}
        </div>
      ))}
    </div>
  )
}
