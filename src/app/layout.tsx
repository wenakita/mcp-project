import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Tools',
  description: 'Model Context Protocol Tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {children}
      </body>
    </html>
  )
}
