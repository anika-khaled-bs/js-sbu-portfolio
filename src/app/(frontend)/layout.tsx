import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React, { Suspense } from 'react'
import { montserrat } from '../fonts'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Loader2 } from 'lucide-react'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import GlobalFooter from '@/Footer'

// Full screen loader for initial page load
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="text-lg font-medium text-foreground">Loading your experience...</p>
    </div>
  </div>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(montserrat.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex flex-col relative">
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>{children}</Suspense>
          </main>
          {/* <Footer /> */}
          <GlobalFooter />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
