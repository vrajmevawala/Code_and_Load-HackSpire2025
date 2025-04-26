"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

const circlePositions = [
  { width: 162, height: 211, top: 63, left: 11 },
  { width: 58, height: 185, top: 50, left: 80 },
  { width: 219, height: 140, top: 71, left: 91 },
  { width: 212, height: 102, top: 60, left: 1 },
  { width: 132, height: 240, top: 22, left: 42 }
]

export function LandingHero() {
  const { theme } = useTheme()

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-background to-background dark:from-teal-900/20"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {circlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-500/10 dark:bg-teal-500/5"
            style={{
              width: `${pos.width}px`,
              height: `${pos.height}px`,
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-medium mb-2">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Mental Wellness</span>
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-teal-700 dark:text-teal-400 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Personal Mental Wellness Companion
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              MindMosaic uses advanced AI to understand your emotional state and provide personalized support when you
              need it most. Start your wellness journey today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 group text-white"
              >
                <Link href="/check-in" className="flex items-center gap-2">
                  Start Your Check-In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center border-2 border-white dark:border-gray-900"
                  >
                    <Heart className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                ))}
              </div>
              <span>Join 2,000+ users improving their mental wellness</span>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg blur opacity-30 dark:opacity-40 animate-pulse"></div>
              <img
                src="/serene-meditation-circle.png"
                alt="Mental wellness illustration"
                className="relative rounded-lg shadow-xl w-full h-auto z-10"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-20 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Brain className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-medium text-teal-700 dark:text-teal-400">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our AI analyzes your responses to provide personalized mental wellness recommendations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
