"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageSquare, LineChart, Heart } from "lucide-react"
import { motion } from "framer-motion"

export function Features() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-teal-600 dark:text-teal-400" />,
      title: "Conversational Check-Ins",
      description:
        "Engage in natural conversations that help assess your mental state and provide personalized insights.",
    },
    {
      icon: <Brain className="h-10 w-10 text-teal-600 dark:text-teal-400" />,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI understands your emotional state through natural language processing and sentiment analysis.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-teal-600 dark:text-teal-400" />,
      title: "Progress Tracking",
      description: "Monitor your mental wellness journey over time with intuitive visualizations and insights.",
    },
    {
      icon: <Heart className="h-10 w-10 text-teal-600 dark:text-teal-400" />,
      title: "Personalized Support",
      description: "Receive tailored recommendations, exercises, and resources based on your unique needs.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-4">How MindMosaic Helps You</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform provides the support you need for better mental wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
                <CardHeader>
                  <div className="mb-4 bg-teal-100 dark:bg-teal-900/30 w-16 h-16 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-teal-700 dark:text-teal-400">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
