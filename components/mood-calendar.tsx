"use client"

import type React from "react"

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MoodCalendarProps {
  moods: { [date: string]: string }
  onMoodSelect: (date: Date, mood: string) => void
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moods, onMoodSelect }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return
    setDate(date)
    const formattedDate = format(date, "yyyy-MM-dd")
    setSelectedMood(moods[formattedDate] || null)
  }

  const handleMoodSelect = (mood: string) => {
    if (!date) return
    onMoodSelect(date, mood)
    setSelectedMood(mood)
  }

  const formattedDate = date ? format(date, "yyyy-MM-dd") : ""
  const mood = moods[formattedDate] || null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar mode="single" selected={date} onSelect={handleDayClick} initialFocus />
        <div className="grid grid-cols-3 gap-2 p-4">
          <Button variant={selectedMood === "happy" ? "default" : "outline"} onClick={() => handleMoodSelect("happy")}>
            Happy
          </Button>
          <Button
            variant={selectedMood === "neutral" ? "default" : "outline"}
            onClick={() => handleMoodSelect("neutral")}
          >
            Neutral
          </Button>
          <Button variant={selectedMood === "sad" ? "default" : "outline"} onClick={() => handleMoodSelect("sad")}>
            Sad
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

export default MoodCalendar
