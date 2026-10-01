"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InteractiveMap } from "@/components/interactive-map"
import { QuizSection } from "@/components/quiz-section"
import { Portfolio } from "@/components/portfolio"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`min-h-screen bg-[#0f0f0f] text-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <Header />
      <main>
        <HeroSection />
        <InteractiveMap />
        <QuizSection />
        <Portfolio />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  )
}
