"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)

      // Update active section based on scroll position
      const sections = ["home", "map", "quiz", "portfolio", "about", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const menuItems = [
    { id: "home", label: "Início", href: "/" },
    { id: "map", label: "Clientes", href: "/#map" },
    { id: "quiz", label: "Quiz", href: "/#quiz" },
    { id: "portfolio", label: "Portfólio", href: "/#portfolio" },
    { id: "about", label: "Sobre", href: "/#about" },
    { id: "talentos", label: "Talentos", href: "/talentos" },
    { id: "contact", label: "Contato", href: "/#contact" },
  ]

  const handleNavigation = (item: { id: string; href: string }) => {
    if (item.href.startsWith("/#")) {
      if (pathname !== "/") {
        window.location.href = item.href
      } else {
        const sectionId = item.href.substring(2)
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          setActiveSection(sectionId)
        }
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 transform ${
          isScrolled
            ? "bg-[#0f0f0f]/95 backdrop-blur-md shadow-2xl shadow-[#c4d203]/10 translate-y-0"
            : "bg-transparent translate-y-0"
        }`}
        style={{
          transform: `translateY(${isScrolled ? 0 : Math.sin(Date.now() * 0.001) * 2}px)`,
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#c4d203]/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + Math.sin(Date.now() * 0.001 + i) * 10}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* Enhanced Logo */}
          <Link
            href="/"
            className="relative text-[#c4d203] hover:scale-110 transition-all duration-500 cursor-pointer text-3xl font-black group transform hover:rotate-2"
            style={{
              transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <span className="relative z-10">
              artéria
              <span className="text-white group-hover:text-[#c4d203] transition-colors duration-500">.</span>
            </span>

            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-[#c4d203]/20 blur-lg scale-0 group-hover:scale-150 transition-all duration-500 rounded-full" />

            {/* Floating particles around logo */}
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#c4d203]/50 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white/50 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Link>

          {/* Enhanced Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    href={item.href}
                    className={`relative text-sm font-medium transition-all duration-500 group transform hover:scale-110 hover:-translate-y-1 ${
                      pathname === item.href ? "text-[#c4d203]" : "text-white hover:text-[#c4d203]"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Enhanced underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#c4d203] to-white transition-all duration-500 ${
                        pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-[#c4d203]/10 blur-md scale-0 group-hover:scale-150 transition-all duration-500 rounded-full" />

                    {/* Active indicator */}
                    {pathname === item.href && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#c4d203] rounded-full animate-pulse" />
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`relative text-sm font-medium transition-all duration-500 group transform hover:scale-110 hover:-translate-y-1 ${
                      activeSection === item.id ? "text-[#c4d203]" : "text-white hover:text-[#c4d203]"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Enhanced underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#c4d203] to-white transition-all duration-500 ${
                        activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-[#c4d203]/10 blur-md scale-0 group-hover:scale-150 transition-all duration-500 rounded-full" />

                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#c4d203] rounded-full animate-pulse" />
                    )}

                    {/* Floating particles on hover */}
                    {hoveredItem === item.id && (
                      <>
                        <div className="absolute -top-3 -right-2 w-1 h-1 bg-[#c4d203]/70 rounded-full animate-ping" />
                        <div className="absolute -bottom-3 -left-2 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse" />
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#c4d203] hover:bg-[#c4d203]/20 transition-all duration-500 transform hover:scale-110 hover:rotate-180 relative group"
          >
            <svg
              className={`w-6 h-6 transition-all duration-500 ${isMenuOpen ? "rotate-90 scale-110" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>

            {/* Button glow effect */}
            <div className="absolute inset-0 bg-[#c4d203]/20 blur-lg scale-0 group-hover:scale-150 transition-all duration-500 rounded-full" />
          </Button>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-700 transform ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="pt-20 pb-8 px-6">
          {/* Mobile menu background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#c4d203]/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <nav className="space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`transform transition-all duration-700 ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:translate-x-2 group ${
                      pathname === item.href ? "text-[#c4d203]" : "text-white hover:text-[#c4d203]"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute -bottom-1 left-0 h-0.5 bg-[#c4d203] w-0 group-hover:w-full transition-all duration-500" />
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`block text-lg font-medium transition-all duration-500 transform hover:scale-105 hover:translate-x-2 group ${
                      activeSection === item.id ? "text-[#c4d203]" : "text-white hover:text-[#c4d203]"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute -bottom-1 left-0 h-0.5 bg-[#c4d203] w-0 group-hover:w-full transition-all duration-500" />
                    </span>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
