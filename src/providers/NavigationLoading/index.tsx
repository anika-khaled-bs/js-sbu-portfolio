'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { LoadingIndicator } from '@/components/ui/loading-indicator'

type NavigationLoadingContextType = {
  isNavigating: boolean
  setIsNavigating: (isNavigating: boolean) => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined)

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext)
  if (context === undefined) {
    throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider')
  }
  return context
}

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reset navigation state whenever the route changes
  useEffect(() => {
    setIsNavigating(false)
  }, [pathname, searchParams])

  return (
    <NavigationLoadingContext.Provider value={{ isNavigating, setIsNavigating }}>
      {isNavigating && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <LoadingIndicator message="Loading page..." size="lg" className="mt-0" />
        </div>
      )}
      {children}
    </NavigationLoadingContext.Provider>
  )
}
