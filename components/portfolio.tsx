"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  metrics: string
}

export function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [filter, setFilter] = useState("all")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "TechCorp Rebranding",
      category: "branding",
      description: "Transformação completa da identidade visual e estratégia digital",
      image: "/placeholder-g9fiw.png",
      metrics: "+150% engagement",
    },
    {
      id: 2,
      title: "FashionBrand Campaign",
      category: "campaign",
      description: "Campanha viral que alcançou 2M de impressões em 30 dias",
      image: "/placeholder-g9fiw.png",
      metrics: "2M impressões",
    },
    {
      id: 3,
      title: "FoodChain Digital",
      category: "digital",
      description: "Estratégia omnichannel que triplicou as vendas online",
      image: "/placeholder-g9fiw.png",
      metrics: "+300% vendas",
    },
    {
      id: 4,
      title: "StartupX Launch",
      category: "campaign",
      description: "Lançamento de produto com estratégia 360° de marketing",
      image: "/placeholder-g9fiw.png",
      metrics: "50K usuários",
    },
    {
      id: 5,
      title: "HealthCorp Identity",
      category: "branding",
      description: "Nova identidade visual para clínica médica premium",
      image: "/placeholder-g9fiw.png",
      metrics: "+200% consultas",
    },
    {
      id: 6,
      title: "EcoTech Platform",
      category: "digital",
      description: "Plataforma digital sustentável com UX inovadora",
      image: "/placeholder-g9fiw.png",
      metrics: "95% satisfação",
    },
  ]

  const categories = [
    { id: "all", label: "Todos" },
    { id: "branding", label: "Branding" },
    { id: "campaign", label: "Campanhas" },
    { id: "digital", label: "Digital" },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setTimeout(() => {
              setVisibleCards((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]))
            }, Math.random() * 200)
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll("[data-card-id]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 hover:text-[#c4d203] transition-colors duration-500 cursor-default">
            NOSSO <span className="text-[#c4d203] hover:text-white transition-colors duration-500">PORTFÓLIO</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 hover:text-white transition-colors duration-300">
            Projetos que transformaram marcas e geraram resultados extraordinários
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-500 transform hover:scale-110 hover:rotate-1 relative overflow-hidden group ${
                  filter === category.id
                    ? "bg-[#c4d203] text-[#0f0f0f] shadow-lg shadow-[#c4d203]/50"
                    : "bg-transparent border-2 border-[#c4d203] text-[#c4d203] hover:bg-[#c4d203] hover:text-[#0f0f0f] hover:shadow-lg hover:shadow-[#c4d203]/30"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="relative z-10">{category.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              data-card-id={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group bg-black/40 backdrop-blur-md border-[#c4d203]/30 overflow-hidden hover:border-[#c4d203] transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl hover:shadow-[#c4d203]/20 ${
                visibleCards.includes(project.id)
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-10 rotate-3"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: hoveredCard === project.id ? "scale(1.05) translateY(-16px) rotate(1deg)" : undefined,
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-[1.2] group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#c4d203]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div className="absolute top-4 right-4 bg-[#c4d203] text-[#0f0f0f] px-3 py-1 rounded-full text-sm font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 hover:bg-white hover:text-[#c4d203]">
                  {project.metrics}
                </div>

                <div className="absolute top-2 left-2 w-2 h-2 bg-[#c4d203] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
              </div>

              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c4d203] transition-all duration-500 transform group-hover:scale-105">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-white transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#c4d203] text-sm font-bold uppercase tracking-wide group-hover:text-white transition-colors duration-500">
                    {categories.find((cat) => cat.id === project.category)?.label}
                  </span>
                  <button className="text-[#c4d203] hover:text-white transition-all duration-500 transform hover:scale-125 hover:rotate-12 group-hover:translate-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4d203]/20 to-transparent" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}