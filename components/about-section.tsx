"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setImageLoaded(true), 500)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: 150, label: "Clientes Atendidos", suffix: "+" },
    { number: 300, label: "Campanhas Criadas", suffix: "+" },
    { number: 95, label: "Taxa de Sucesso", suffix: "%" },
    { number: 12, label: "Anos de Experiência", suffix: "" },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-5xl font-black text-white mb-6">
                SOBRE A <span className="text-[#c4d203]">AGÊNCIA</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Somos uma agência jovem, criativa e orientada a resultados. Nossa missão é transformar marcas em
                experiências inesquecíveis através de estratégias inovadoras e execução impecável.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Com uma equipe multidisciplinar de especialistas em marketing digital, design, desenvolvimento e
                estratégia, criamos soluções personalizadas que geram impacto real no crescimento dos nossos clientes.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                key={index}
                style={{ transitionDelay: `${index * 200}ms` }}
                className={`bg-black/40 backdrop-blur-md border-[#c4d203]/30 p-6 text-center transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-3xl font-black text-[#c4d203] mb-2">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/modern-marketing-team-office.png"
                alt="Nossa equipe"
                className={`w-full h-96 object-cover transition-all duration-1000 ${
                  imageLoaded ? "blur-0 scale-100" : "blur-sm scale-105"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/50 to-transparent" />

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-[#c4d203] text-[#0f0f0f] px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                Inovação
              </div>
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-[#c4d203] px-4 py-2 rounded-full font-bold text-sm">
                Resultados
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c4d203]/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#c4d203]/10 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
