import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { NavigationLoadingProvider } from './NavigationLoading'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <NavigationLoadingProvider>{children}</NavigationLoadingProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
