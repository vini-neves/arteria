"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TalentBankSection } from "@/components/talent-bank-section"

export default function TalentosPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`min-h-screen bg-[#0f0f0f] text-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <Header />
      <main className="pt-20">
        <TalentBankSection />
      </main>
    </div>
  )
}
