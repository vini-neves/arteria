"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface Client {
  id: number
  name: string
  position: { x: number; y: number }
  metrics: {
    revenue: number
    growth: number
    campaigns: number
    roi: number
  }
}

export function InteractiveMap() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [animatedMetrics, setAnimatedMetrics] = useState<any>({})
  const [hoveredClient, setHoveredClient] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const clients: Client[] = [
    {
      id: 1,
      name: "TechCorp",
      position: { x: 25, y: 30 },
      metrics: { revenue: 2500000, growth: 150, campaigns: 12, roi: 340 },
    },
    {
      id: 2,
      name: "FashionBrand",
      position: { x: 60, y: 45 },
      metrics: { revenue: 1800000, growth: 220, campaigns: 8, roi: 280 },
    },
    {
      id: 3,
      name: "FoodChain",
      position: { x: 40, y: 70 },
      metrics: { revenue: 3200000, growth: 180, campaigns: 15, roi: 420 },
    },
    {
      id: 4,
      name: "StartupX",
      position: { x: 75, y: 25 },
      metrics: { revenue: 950000, growth: 300, campaigns: 6, roi: 250 },
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = e.currentTarget as Element
      if (rect) {
        const bounds = rect.getBoundingClientRect()
        const x = (e.clientX - bounds.left) / bounds.width
        const y = (e.clientY - bounds.top) / bounds.height
        setMousePosition({ x, y })
      }
    }

    const mapElement = document.querySelector(".interactive-map")
    if (mapElement) {
      mapElement.addEventListener("mousemove", handleMouseMove as EventListener)
      return () => mapElement.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [])

  const animateNumber = (target: number, key: string) => {
    let current = 0
    const increment = target / 60 // Slower animation for smoother effect
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setAnimatedMetrics((prev: any) => ({ ...prev, [key]: Math.floor(current) }))
    }, 25)
  }

  const handleClientClick = (client: Client) => {
    setSelectedClient(client)
    setAnimatedMetrics({})

    // Animate metrics with staggered delays
    setTimeout(() => animateNumber(client.metrics.revenue, "revenue"), 300)
    setTimeout(() => animateNumber(client.metrics.growth, "growth"), 500)
    setTimeout(() => animateNumber(client.metrics.campaigns, "campaigns"), 700)
    setTimeout(() => animateNumber(client.metrics.roi, "roi"), 900)
  }

  return (
    <section id="map" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 hover:text-[#c4d203] transition-colors duration-500">
            NOSSOS <span className="text-[#c4d203] hover:text-white transition-colors duration-500">CLIENTES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
            Explore o mapa interativo e descubra o impacto transformador que geramos para cada cliente
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Interactive Map */}
          <div className="relative">
            <div className="interactive-map bg-gradient-to-br from-[#c4d203]/20 to-[#c4d203]/5 rounded-2xl p-8 h-96 relative overflow-hidden hover:from-[#c4d203]/30 hover:to-[#c4d203]/10 transition-all duration-500">
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-[#c4d203]/20 hover:border-[#c4d203]/50 transition-colors duration-300"
                      style={{
                        animationDelay: `${i * 50}ms`,
                        animation: "pulse 3s infinite",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-[url('/placeholder-g9fiw.png')] bg-cover bg-center opacity-20" />

              {clients.map((client) => (
                <div
                  key={client.id}
                  className="absolute"
                  style={{ left: `${client.position.x}%`, top: `${client.position.y}%` }}
                >
                  <button
                    onClick={() => handleClientClick(client)}
                    onMouseEnter={() => setHoveredClient(client.id)}
                    onMouseLeave={() => setHoveredClient(null)}
                    className="relative w-4 h-4 bg-[#c4d203] rounded-full hover:scale-200 transition-all duration-500 group transform"
                  >
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 bg-[#c4d203] rounded-full animate-ping opacity-75" />
                    <div className="absolute -inset-2 bg-[#c4d203]/30 rounded-full animate-pulse" />
                    <div
                      className="absolute -inset-4 bg-[#c4d203]/10 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />

                    {/* Enhanced tooltip */}
                    <div
                      className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] text-[#c4d203] px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap border border-[#c4d203]/30 ${
                        hoveredClient === client.id
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-75 translate-y-2"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-black">{client.name}</div>
                        <div className="text-[10px] text-gray-400">Clique para ver métricas</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0f0f0f]" />
                    </div>
                  </button>
                </div>
              ))}

              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#c4d203]/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Client Panel */}
          <div className="space-y-6">
            {selectedClient ? (
              <Card className="bg-black/40 backdrop-blur-md border-[#c4d203]/30 p-8 transform transition-all duration-700 hover:scale-105 hover:border-[#c4d203] hover:shadow-2xl hover:shadow-[#c4d203]/20">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-[#c4d203] mb-2 hover:scale-110 transition-transform duration-300 cursor-default">
                    {selectedClient.name}
                  </h3>
                  <p className="text-gray-300 hover:text-white transition-colors duration-300">
                    Resultados Transformadores
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-[#c4d203]/10 rounded-lg hover:bg-[#c4d203]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                    <div className="text-3xl font-black text-[#c4d203] mb-2 group-hover:scale-110 transition-transform duration-300">
                      R$ {(animatedMetrics.revenue || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      Receita Gerada
                    </div>
                  </div>

                  <div className="text-center p-4 bg-[#c4d203]/10 rounded-lg hover:bg-[#c4d203]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                    <div className="text-3xl font-black text-[#c4d203] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {animatedMetrics.growth || 0}%
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      Crescimento
                    </div>
                  </div>

                  <div className="text-center p-4 bg-[#c4d203]/10 rounded-lg hover:bg-[#c4d203]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                    <div className="text-3xl font-black text-[#c4d203] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {animatedMetrics.campaigns || 0}
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      Campanhas
                    </div>
                  </div>

                  <div className="text-center p-4 bg-[#c4d203]/10 rounded-lg hover:bg-[#c4d203]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                    <div className="text-3xl font-black text-[#c4d203] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {animatedMetrics.roi || 0}%
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      ROI
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-black/20 backdrop-blur-md border-[#c4d203]/20 p-8 text-center hover:border-[#c4d203]/40 transition-all duration-500 hover:scale-105">
                <div className="text-[#c4d203] text-6xl mb-4 animate-bounce hover:animate-pulse transition-all duration-300">
                  📍
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 hover:text-[#c4d203] transition-colors duration-300">
                  Clique em um marcador
                </h3>
                <p className="text-gray-300 hover:text-white transition-colors duration-300">
                  Descubra os resultados incríveis que alcançamos para nossos clientes
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
