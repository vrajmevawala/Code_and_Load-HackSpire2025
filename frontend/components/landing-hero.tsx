import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const circlePositions = [
  { width: 188, height: 71, top: 55, left: 9 },
  { width: 91, height: 187, top: 69, left: 3 },
  { width: 136, height: 227, top: 32, left: 82 },
  { width: 171, height: 242, top: 91, left: 14 },
  { width: 180, height: 130, top: 81, left: 68 }
]

export function LandingHero() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
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
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Mental Wellness
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Your Personal Mental Wellness Companion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/check-in">Start Your Check-In</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 