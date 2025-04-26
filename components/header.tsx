"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"
import { Brain, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Check-In", path: "/check-in" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Resources", path: "/resources" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2 z-10">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full"
          >
            <Brain className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </motion.div>
          <span className="font-bold text-xl text-teal-700 dark:text-teal-400">MindMosaic</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                pathname === item.path
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-foreground hover:text-teal-600 dark:hover:text-teal-400",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 transition-all duration-300 group-hover:w-full",
                  pathname === item.path ? "w-full" : "",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-10">
          <ModeToggle />
          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden md:flex bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
          >
            <Link href="/check-in">Start Check-In</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium py-2 px-4 rounded-md transition-colors",
                    pathname === item.path
                      ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                      : "hover:bg-muted",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                variant="default"
                size="sm"
                className="mt-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
              >
                <Link href="/check-in" onClick={() => setMobileMenuOpen(false)}>
                  Start Check-In
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
