"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const parallaxRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        parallaxRef.current.style.transform = `translateY(${rate}px)`
      }

      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const scrolled = window.pageYOffset
          const rate = scrolled * (-0.3 - index * 0.1)
          element.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div
          ref={(el) => { if (el) floatingElementsRef.current[0] = el }}
          className="absolute top-20 left-10 w-32 h-32 bg-[#c4d203]/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          ref={(el) => { if (el) floatingElementsRef.current[1] = el }}
          className="absolute top-40 right-20 w-24 h-24 bg-[#c4d203]/30 rounded-full blur-lg animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          ref={(el) => { if (el) floatingElementsRef.current[2] = el }}
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#c4d203]/10 rounded-full blur-2xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -20}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          ref={(el) => { if (el) floatingElementsRef.current[3] = el }}
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#c4d203]/40 rounded-full blur-md animate-ping"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * 25}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />

        <div
          className="absolute top-1/2 left-20 w-8 h-8 border-2 border-[#c4d203]/50 rotate-45 animate-spin"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) rotate(${mousePosition.x * 45}deg)`,
            transition: "transform 0.3s ease-out",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute bottom-1/4 right-32 w-12 h-12 border border-[#c4d203]/30 rounded-full animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px) scale(${1 + mousePosition.x * 0.1})`,
            transition: "transform 0.4s ease-out",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div
          style={{ transitionDelay: "300ms" }}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="inline-block text-white">VEM </span>{" "}
            <span className="inline-block text-[#c4d203] animate-pulse">PULSAR</span>
            <br />
            <span className="inline-block text-white">COM A GENTE</span>
          </h1>
        </div>

        <div
          style={{ transitionDelay: "700ms" }}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed hover:text-white transition-colors duration-500"
            style={{
              transform: `translateX(${mousePosition.x * 5}px)`,
              transition: "transform 0.4s ease-out, color 0.5s ease",
            }}
          >
            Há 12 anos construindo ecossistemas relevantes capazes de gerar valor.
          </p>
        </div>

        <div
          style={{ transitionDelay: "1000ms" }}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group bg-[#c4d203] text-[#0f0f0f] hover:bg-[#c4d203]/90 font-bold px-8 py-4 text-lg transform hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c4d203]/50 relative overflow-hidden"
            >
              <span className="relative z-10">COMEÇAR AGORA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group border-[#c4d203] text-[#c4d203] hover:bg-[#c4d203] hover:text-[#0f0f0f] font-bold px-8 py-4 text-lg transform hover:scale-110 hover:-rotate-1 transition-all duration-500 bg-transparent hover:shadow-2xl hover:shadow-[#c4d203]/30 relative overflow-hidden"
            >
              <span className="relative z-10">VER PORTFÓLIO</span>
              <div className="absolute inset-0 bg-[#c4d203] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-125 transition-transform duration-300 cursor-pointer"
        style={{
          transform: `translateX(-50%) translateY(${mousePosition.y * -10}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="w-6 h-10 border-2 border-[#c4d203] rounded-full flex justify-center hover:border-white transition-colors duration-300 relative overflow-hidden">
          <div className="w-1 h-3 bg-[#c4d203] rounded-full mt-2 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c4d203]/20 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}