"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "MindMosaic has been a game-changer for my daily mental wellness routine. The personalized insights have helped me understand my emotional patterns.",
      name: "Alex Johnson",
      role: "Teacher",
      avatar: "/thoughtful-educator.png",
    },
    {
      quote:
        "As someone who struggles with anxiety, having MindMosaic as a companion has made a huge difference. The check-ins feel natural and supportive.",
      name: "Sam Rivera",
      role: "Software Developer",
      avatar: "/focused-coder.png",
    },
    {
      quote:
        "I appreciate how the app adapts to my responses and provides relevant resources. It feels like having a wellness coach in my pocket.",
      name: "Taylor Kim",
      role: "Healthcare Worker",
      avatar: "/compassionate-caregiver.png",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how MindMosaic is helping people improve their mental wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-4 left-4 text-teal-100 dark:text-teal-900/30">
                  <Quote className="h-24 w-24" />
                </div>
                <CardContent className="pt-12 relative z-10">
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 border-t pt-4 relative z-10">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-teal-700 dark:text-teal-400">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
