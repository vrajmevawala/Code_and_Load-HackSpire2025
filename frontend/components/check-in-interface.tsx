"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { analyzeResponse, detectEmotions } from "@/lib/api-client"
import { Send, ArrowRight, Brain, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmotionAnalysis } from "@/components/emotion-analysis"
import type { EmotionAnalysisResult } from "@/lib/emotion-detection"

// ... rest of the file remains the same ... 