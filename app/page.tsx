import { LandingHero } from "@/components/landing-hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <LandingHero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}
