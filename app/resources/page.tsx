import { ResourcesGrid } from "@/components/resources-grid"

export default function ResourcesPage() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700 dark:text-teal-400 mb-4">
            Mental Wellness Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our curated collection of articles, exercises, and tools to support your mental wellness journey
          </p>
        </div>
        <ResourcesGrid />
      </div>
    </div>
  )
}
