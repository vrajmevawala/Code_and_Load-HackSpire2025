"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Book, Code, GraduationCap, Lightbulb, Youtube, Heart, BookmarkPlus, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Link from "next/link"

const resources = [
  {
    title: "Understanding Anxiety",
    description: "Learn about the causes, symptoms, and treatments for anxiety disorders.",
    type: "Article",
    category: "Anxiety",
    icon: <Book className="h-4 w-4 mr-2" />,
    image: "/resource-anxiety.png",
    link: "/resources/anxiety",
    content: `
      <h2>Understanding Anxiety</h2>
      <p>Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder.</p>
      <p>Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry.</p>
      <h3>Common symptoms include:</h3>
      <ul>
        <li>Feeling nervous, restless or tense</li>
        <li>Having a sense of impending danger, panic or doom</li>
        <li>Increased heart rate</li>
        <li>Breathing rapidly (hyperventilation)</li>
        <li>Sweating</li>
        <li>Trembling</li>
        <li>Feeling weak or tired</li>
        <li>Trouble concentrating</li>
        <li>Having difficulty sleeping</li>
      </ul>
      <h3>Treatment options:</h3>
      <ul>
        <li>Cognitive Behavioral Therapy (CBT)</li>
        <li>Medication (SSRIs, SNRIs)</li>
        <li>Lifestyle changes</li>
        <li>Stress management techniques</li>
        <li>Support groups</li>
      </ul>
    `,
  },
  {
    title: "Mindfulness Meditation Guide",
    description: "A step-by-step guide to practicing mindfulness meditation for stress reduction.",
    type: "Guide",
    category: "Meditation",
    icon: <Lightbulb className="h-4 w-4 mr-2" />,
    image: "/resource-meditation.png",
    link: "/resources/meditation",
    content: `
      <h2>Mindfulness Meditation Guide</h2>
      <p>Mindfulness meditation is a mental training practice that teaches you to slow down racing thoughts, let go of negativity, and calm both your mind and body.</p>
      <h3>Basic mindfulness meditation:</h3>
      <ol>
        <li><strong>Find a quiet and comfortable place.</strong> Sit in a chair or on the floor with your head, neck, and back straight but not stiff.</li>
        <li><strong>Set a time limit.</strong> If you're just beginning, it can help to choose a short time, such as 5 or 10 minutes.</li>
        <li><strong>Notice your body.</strong> Be aware of your body seated. Feel the weight of your body on the chair or floor.</li>
        <li><strong>Feel your breath.</strong> Follow the sensation of your breath as it goes in and as it goes out.</li>
        <li><strong>Notice when your mind has wandered.</strong> Inevitably, your attention will leave the breath and wander to other places. When you notice this, simply return your attention to the breath.</li>
        <li><strong>Be kind to your wandering mind.</strong> Don't judge yourself or obsess over the content of the thoughts. Just come back to your breath.</li>
        <li><strong>Close with gratitude.</strong> When you're ready, gently lift your gaze (if your eyes are closed, open them). Take a moment to notice any sounds in the environment. Notice how your body feels right now. Notice your thoughts and emotions.</li>
      </ol>
      <p>Practice this meditation for a few minutes daily and gradually increase the duration as you become more comfortable with the practice.</p>
    `,
  },
  {
    title: "CBT Techniques for Depression",
    description: "Explore cognitive-behavioral therapy techniques to manage symptoms of depression.",
    type: "Technique",
    category: "Depression",
    icon: <Code className="h-4 w-4 mr-2" />,
    image: "/resource-depression.png",
    link: "/resources/depression",
    content: `
      <h2>CBT Techniques for Depression</h2>
      <p>Cognitive Behavioral Therapy (CBT) is one of the most effective treatments for depression. It works by identifying and changing negative thought patterns and behaviors that contribute to depressive symptoms.</p>
      <h3>Key CBT techniques for depression:</h3>
      <ol>
        <li><strong>Thought Records:</strong> Identify negative thoughts, evaluate the evidence for and against them, and develop more balanced perspectives.</li>
        <li><strong>Behavioral Activation:</strong> Schedule and engage in pleasurable activities to counter the withdrawal and inactivity common in depression.</li>
        <li><strong>Problem-Solving:</strong> Develop structured approaches to addressing life problems that may be contributing to depression.</li>
        <li><strong>Cognitive Restructuring:</strong> Learn to recognize and challenge cognitive distortions like all-or-nothing thinking, catastrophizing, and overgeneralization.</li>
        <li><strong>Mindfulness:</strong> Practice being present in the moment without judgment to reduce rumination.</li>
      </ol>
      <p>These techniques can help break the cycle of negative thoughts and behaviors that maintain depression. Regular practice is key to seeing improvement.</p>
    `,
  },
  {
    title: "Breathing Exercises for Anxiety",
    description: "Simple breathing techniques to help manage anxiety and panic attacks.",
    type: "Exercise",
    category: "Anxiety",
    icon: <Youtube className="h-4 w-4 mr-2" />,
    image: "/resource-breathing.png",
    link: "/resources/breathing",
    content: `
      <h2>Breathing Exercises for Anxiety</h2>
      <p>Controlled breathing exercises can help reduce anxiety, stress, and panic by activating your body's relaxation response.</p>
      <h3>4-7-8 Breathing Technique:</h3>
      <ol>
        <li>Sit comfortably with your back straight</li>
        <li>Exhale completely through your mouth</li>
        <li>Close your mouth and inhale quietly through your nose to a mental count of 4</li>
        <li>Hold your breath for a count of 7</li>
        <li>Exhale completely through your mouth to a count of 8</li>
        <li>Repeat the cycle 3-4 times</li>
      </ol>
      <h3>Box Breathing:</h3>
      <ol>
        <li>Inhale slowly to a count of 4</li>
        <li>Hold your breath for a count of 4</li>
        <li>Exhale slowly to a count of 4</li>
        <li>Hold your breath for a count of 4</li>
        <li>Repeat as needed</li>
      </ol>
      <h3>Diaphragmatic Breathing:</h3>
      <ol>
        <li>Lie on your back with knees bent</li>
        <li>Place one hand on your upper chest and the other below your rib cage</li>
        <li>Breathe in slowly through your nose, feeling your stomach push against your hand</li>
        <li>Keep the hand on your chest as still as possible</li>
        <li>Exhale through pursed lips, tightening your stomach muscles</li>
        <li>Practice for 5-10 minutes, 3-4 times per day</li>
      </ol>
    `,
  },
  {
    title: "Improving Sleep Quality",
    description: "Evidence-based strategies to improve your sleep habits and quality.",
    type: "Guide",
    category: "Sleep",
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
    image: "/resource-sleep.png",
    link: "/resources/sleep",
    content: `
      <h2>Improving Sleep Quality</h2>
      <p>Quality sleep is essential for mental and physical health. Poor sleep can contribute to anxiety, depression, and reduced cognitive function.</p>
      <h3>Sleep Hygiene Tips:</h3>
      <ul>
        <li><strong>Consistent schedule:</strong> Go to bed and wake up at the same time every day, even on weekends.</li>
        <li><strong>Create a restful environment:</strong> Keep your bedroom cool, dark, and quiet.</li>
        <li><strong>Limit screen time:</strong> Avoid screens (phones, tablets, computers) for at least 1 hour before bedtime.</li>
        <li><strong>Watch your diet:</strong> Avoid large meals, caffeine, and alcohol before bedtime.</li>
        <li><strong>Regular exercise:</strong> Physical activity during the day can help you fall asleep more easily at night.</li>
        <li><strong>Manage stress:</strong> Practice relaxation techniques like deep breathing or meditation before bed.</li>
        <li><strong>Limit naps:</strong> Short naps (20-30 minutes) can be helpful, but avoid napping late in the day.</li>
        <li><strong>Comfortable bedding:</strong> Ensure your mattress and pillows are comfortable and supportive.</li>
      </ul>
      <p>If you continue to have sleep problems despite improving your sleep habits, consider speaking with a healthcare provider about other treatment options.</p>
    `,
  },
  {
    title: "Positive Psychology Practices",
    description: "Daily practices to increase happiness and build resilience.",
    type: "Exercise",
    category: "Happiness",
    icon: <Lightbulb className="h-4 w-4 mr-2" />,
    image: "/resource-happiness.png",
    link: "/resources/happiness",
    content: `
      <h2>Positive Psychology Practices</h2>
      <p>Positive psychology focuses on strengths, virtues, and factors that help individuals and communities thrive. These practices can help increase happiness and build resilience.</p>
      <h3>Daily Practices:</h3>
      <ul>
        <li><strong>Gratitude journaling:</strong> Write down three things you're grateful for each day.</li>
        <li><strong>Acts of kindness:</strong> Perform small acts of kindness for others regularly.</li>
        <li><strong>Savoring:</strong> Take time to fully experience and appreciate positive moments.</li>
        <li><strong>Strengths use:</strong> Identify your character strengths and find new ways to use them daily.</li>
        <li><strong>Optimistic thinking:</strong> Practice looking for the positive aspects of challenging situations.</li>
        <li><strong>Mindfulness:</strong> Stay present and engaged with your current experience without judgment.</li>
        <li><strong>Connection:</strong> Nurture your relationships with family, friends, and community.</li>
        <li><strong>Goal setting:</strong> Set and work toward meaningful goals that align with your values.</li>
      </ul>
      <p>Incorporating even one or two of these practices into your daily routine can significantly impact your overall well-being and happiness.</p>
    `,
  },
]

export function ResourcesGrid() {
  const [savedResources, setSavedResources] = useState<string[]>([])
  const [likedResources, setLikedResources] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const toggleSaved = (title: string) => {
    setSavedResources((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const toggleLiked = (title: string) => {
    setLikedResources((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(resources.map((r) => r.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={
              selectedCategory === null
                ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                : ""
            }
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-2 border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-white">
                    {resource.type}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-teal-700 dark:text-teal-400">{resource.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {resource.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Link
                  href={resource.link}
                  className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition-colors font-medium flex items-center gap-1"
                >
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleLiked(resource.title)}
                    aria-label={likedResources.includes(resource.title) ? "Unlike" : "Like"}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedResources.includes(resource.title)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleSaved(resource.title)}
                    aria-label={savedResources.includes(resource.title) ? "Unsave" : "Save"}
                  >
                    <BookmarkPlus
                      className={`h-4 w-4 ${
                        savedResources.includes(resource.title)
                          ? "fill-teal-500 text-teal-500"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
