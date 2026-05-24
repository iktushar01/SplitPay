"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-bold">
          MyApp
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm hover:opacity-70">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:opacity-70">
            About
          </Link>
          <Link href="/pricing" className="text-sm hover:opacity-70">
            Pricing
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button size="sm">Get Started</Button>
        </div>

      </div>
    </header>
  )
}