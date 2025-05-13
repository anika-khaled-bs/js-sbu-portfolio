import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface MobileMenuProps {
  data: Header
  isOpen: boolean
  openDropdown: string | null
  toggleDropdown: (name: string) => void
  setMobileMenuOpen: (isOpen: boolean) => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  data,
  isOpen,
  openDropdown,
  toggleDropdown,
  setMobileMenuOpen,
}) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
        {data?.navItems?.map((item) => (
          <div key={item.id}>
            {item?.subMenuItems?.length! > 0 ? (
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
                      <CMSLink
                        key={subItem.id}
                        {...subItem.link}
                        appearance="ghost"
                        className="block px-3 py-2 rounded-md text-sm text-white hover:bg-muted"
                        onClick={() => {
                          setMobileMenuOpen(false)
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <CMSLink
                key={item.id}
                {...item.link}
                appearance="ghost"
                className="block px-3 py-2 rounded-md text-sm text-white hover:bg-muted"
                onClick={() => {
                  setMobileMenuOpen(false)
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
