import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "../components/provider/theme-provider"
import QueryProviders from "../components/provider/QueryProvider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SplitPay",
  description: "Split bills and settle up with friends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        
        {/* 🔥 Query Client Provider (required for react-query) */}
        <QueryProviders>
          {/* 🔥 Theme system (required for dark mode) */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      
            
              {children}
              <Toaster richColors position="top-right" />

          </ThemeProvider>
        </QueryProviders>

      </body>
    </html>
  )
}