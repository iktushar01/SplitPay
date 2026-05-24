"use client"

import Link from "next/link"
import { ReceiptText } from "lucide-react"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-lg bg-cyan-600 text-white">
            <ReceiptText className="size-5" />
          </span>
          SplitPay
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm hover:opacity-70">
            How it works
          </Link>
          <Link href="#features" className="text-sm hover:opacity-70">
            Features
          </Link>
          <Link href="#demo" className="text-sm hover:opacity-70">
            Demo
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  )
}
