import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// This is a mock database of resources
const resources = [
  {
    slug: "anxiety",
    title: "Understanding Anxiety",
    image: "/resource-anxiety.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">Understanding Anxiety</h2>
      <p class="mb-4">Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder.</p>
      <p class="mb-4">Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Common symptoms include:</h3>
      <ul class="list-disc pl-6 mb-4">
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
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Treatment options:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Cognitive Behavioral Therapy (CBT)</li>
        <li>Medication (SSRIs, SNRIs)</li>
        <li>Lifestyle changes</li>
        <li>Stress management techniques</li>
        <li>Support groups</li>
      </ul>
    `,
  },
  {
    slug: "meditation",
    title: "Mindfulness Meditation Guide",
    image: "/resource-meditation.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">Mindfulness Meditation Guide</h2>
      <p class="mb-4">Mindfulness meditation is a mental training practice that teaches you to slow down racing thoughts, let go of negativity, and calm both your mind and body.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Basic mindfulness meditation:</h3>
      <ol class="list-decimal pl-6 mb-4">
        <li><strong>Find a quiet and comfortable place.</strong> Sit in a chair or on the floor with your head, neck, and back straight but not stiff.</li>
        <li><strong>Set a time limit.</strong> If you're just beginning, it can help to choose a short time, such as 5 or 10 minutes.</li>
        <li><strong>Notice your body.</strong> Be aware of your body seated. Feel the weight of your body on the chair or floor.</li>
        <li><strong>Feel your breath.</strong> Follow the sensation of your breath as it goes in and as it goes out.</li>
        <li><strong>Notice when your mind has wandered.</strong> Inevitably, your attention will leave the breath and wander to other places. When you notice this, simply return your attention to the breath.</li>
        <li><strong>Be kind to your wandering mind.</strong> Don't judge yourself or obsess over the content of the thoughts. Just come back to your breath.</li>
        <li><strong>Close with gratitude.</strong> When you're ready, gently lift your gaze (if your eyes are closed, open them). Take a moment to notice any sounds in the environment. Notice how your body feels right now. Notice your thoughts and emotions.</li>
      </ol>
      <p class="mb-4">Practice this meditation for a few minutes daily and gradually increase the duration as you become more comfortable with the practice.</p>
    `,
  },
  {
    slug: "depression",
    title: "CBT Techniques for Depression",
    image: "/resource-depression.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">CBT Techniques for Depression</h2>
      <p class="mb-4">Cognitive Behavioral Therapy (CBT) is one of the most effective treatments for depression. It works by identifying and changing negative thought patterns and behaviors that contribute to depressive symptoms.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Key CBT techniques for depression:</h3>
      <ol class="list-decimal pl-6 mb-4">
        <li><strong>Thought Records:</strong> Identify negative thoughts, evaluate the evidence for and against them, and develop more balanced perspectives.</li>
        <li><strong>Behavioral Activation:</strong> Schedule and engage in pleasurable activities to counter the withdrawal and inactivity common in depression.</li>
        <li><strong>Problem-Solving:</strong> Develop structured approaches to addressing life problems that may be contributing to depression.</li>
        <li><strong>Cognitive Restructuring:</strong> Learn to recognize and challenge cognitive distortions like all-or-nothing thinking, catastrophizing, and overgeneralization.</li>
        <li><strong>Mindfulness:</strong> Practice being present in the moment without judgment to reduce rumination.</li>
      </ol>
      <p class="mb-4">These techniques can help break the cycle of negative thoughts and behaviors that maintain depression. Regular practice is key to seeing improvement.</p>
    `,
  },
  {
    slug: "breathing",
    title: "Breathing Exercises for Anxiety",
    image: "/resource-breathing.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">Breathing Exercises for Anxiety</h2>
      <p class="mb-4">Controlled breathing exercises can help reduce anxiety, stress, and panic by activating your body's relaxation response.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">4-7-8 Breathing Technique:</h3>
      <ol class="list-decimal pl-6 mb-4">
        <li>Sit comfortably with your back straight</li>
        <li>Exhale completely through your mouth</li>
        <li>Close your mouth and inhale quietly through your nose to a mental count of 4</li>
        <li>Hold your breath for a count of 7</li>
        <li>Exhale completely through your mouth to a count of 8</li>
        <li>Repeat the cycle 3-4 times</li>
      </ol>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Box Breathing:</h3>
      <ol class="list-decimal pl-6 mb-4">
        <li>Inhale slowly to a count of 4</li>
        <li>Hold your breath for a count of 4</li>
        <li>Exhale slowly to a count of 4</li>
        <li>Hold your breath for a count of 4</li>
        <li>Repeat as needed</li>
      </ol>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Diaphragmatic Breathing:</h3>
      <ol class="list-decimal pl-6 mb-4">
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
    slug: "sleep",
    title: "Improving Sleep Quality",
    image: "/resource-sleep.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">Improving Sleep Quality</h2>
      <p class="mb-4">Quality sleep is essential for mental and physical health. Poor sleep can contribute to anxiety, depression, and reduced cognitive function.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Sleep Hygiene Tips:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Consistent schedule:</strong> Go to bed and wake up at the same time every day, even on weekends.</li>
        <li><strong>Create a restful environment:</strong> Keep your bedroom cool, dark, and quiet.</li>
        <li><strong>Limit screen time:</strong> Avoid screens (phones, tablets, computers) for at least 1 hour before bedtime.</li>
        <li><strong>Watch your diet:</strong> Avoid large meals, caffeine, and alcohol before bedtime.</li>
        <li><strong>Regular exercise:</strong> Physical activity during the day can help you fall asleep more easily at night.</li>
        <li><strong>Manage stress:</strong> Practice relaxation techniques like deep breathing or meditation before bed.</li>
        <li><strong>Limit naps:</strong> Short naps (20-30 minutes) can be helpful, but avoid napping late in the day.</li>
        <li><strong>Comfortable bedding:</strong> Ensure your mattress and pillows are comfortable and supportive.</li>
      </ul>
      <p class="mb-4">If you continue to have sleep problems despite improving your sleep habits, consider speaking with a healthcare provider about other treatment options.</p>
    `,
  },
  {
    slug: "happiness",
    title: "Positive Psychology Practices",
    image: "/resource-happiness.png",
    content: `
      <h2 class="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">Positive Psychology Practices</h2>
      <p class="mb-4">Positive psychology focuses on strengths, virtues, and factors that help individuals and communities thrive. These practices can help increase happiness and build resilience.</p>
      <h3 class="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Daily Practices:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Gratitude journaling:</strong> Write down three things you're grateful for each day.</li>
        <li><strong>Acts of kindness:</strong> Perform small acts of kindness for others regularly.</li>
        <li><strong>Savoring:</strong> Take time to fully experience and appreciate positive moments.</li>
        <li><strong>Strengths use:</strong> Identify your character strengths and find new ways to use them daily.</li>
        <li><strong>Optimistic thinking:</strong> Practice looking for the positive aspects of challenging situations.</li>
        <li><strong>Mindfulness:</strong> Stay present and engaged with your current experience without judgment.</li>
        <li><strong>Connection:</strong> Nurture your relationships with family, friends, and community.</li>
        <li><strong>Goal setting:</strong> Set and work toward meaningful goals that align with your values.</li>
      </ul>
      <p class="mb-4">Incorporating even one or two of these practices into your daily routine can significantly impact your overall well-being and happiness.</p>
    `,
  },
]

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = resources.find((r) => r.slug === params.slug)

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
              <p className="mb-6">Sorry, the resource you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/resources">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resources
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <Card className="overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <img
              src={resource.image || "/placeholder.svg"}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
