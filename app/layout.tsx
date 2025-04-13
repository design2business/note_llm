import type { Metadata } from 'next'
import './globals.css'
import { RSSInitializer } from '@/components/RSSInitializer'
import { Nav } from '@/components/nav'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <RSSInitializer />
        <Nav />
        {children}
      </body>
    </html>
  )
}
