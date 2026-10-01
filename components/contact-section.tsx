"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Nome deve ter pelo menos 2 caracteres" : ""
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Email inválido" : ""
      case "phone":
        return value.length < 10 ? "Telefone inválido" : ""
      case "message":
        return value.length < 10 ? "Mensagem deve ter pelo menos 10 caracteres" : ""
      default:
        return ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors((prev: any) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const newErrors: any = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "company") {
        // company is optional
        const error = validateField(key, value)
        if (error) newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black/40 backdrop-blur-md border-[#c4d203]/30 p-12 text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-3xl font-black text-[#c4d203] mb-4">MENSAGEM ENVIADA!</h3>
            <p className="text-xl text-gray-300 mb-8">
              Recebemos sua mensagem e entraremos em contato em até 24 horas.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: "", email: "", phone: "", company: "", message: "" })
              }}
              className="bg-[#c4d203] text-[#0f0f0f] hover:bg-[#c4d203]/90"
            >
              Enviar Nova Mensagem
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4">
            VAMOS <span className="text-[#c4d203]">CONVERSAR</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pronto para transformar sua marca? Entre em contato e descubra como podemos acelerar seu crescimento
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Entre em Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#c4d203] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0f0f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold">Telefone</div>
                    <div className="text-gray-300">(43) 99646-0971</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#c4d203] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0f0f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold">Email</div>
                    <div className="text-gray-300">digital@arteriadc.com.br</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#c4d203] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0f0f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold">Endereço</div>
                    <div className="text-gray-300">Apucarana, PR</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                {["Instagram", "LinkedIn", "Facebook", "Twitter"].map((social) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-[#c4d203]/20 hover:bg-[#c4d203] text-[#c4d203] hover:text-[#0f0f0f] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <span className="text-sm font-bold">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-black/40 backdrop-blur-md border-[#c4d203]/30 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Seu nome *"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-black/20 border-[#c4d203]/30 text-white placeholder-gray-400 focus:border-[#c4d203] ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu email *"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-black/20 border-[#c4d203]/30 text-white placeholder-gray-400 focus:border-[#c4d203] ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="phone"
                    placeholder="Seu telefone *"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`bg-black/20 border-[#c4d203]/30 text-white placeholder-gray-400 focus:border-[#c4d203] ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Input
                    name="company"
                    placeholder="Sua empresa"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-black/20 border-[#c4d203]/30 text-white placeholder-gray-400 focus:border-[#c4d203]"
                  />
                </div>
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Sua mensagem *"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`bg-black/20 border-[#c4d203]/30 text-white placeholder-gray-400 focus:border-[#c4d203] resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#c4d203] text-[#0f0f0f] hover:bg-[#c4d203]/90 font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting ? "animate-pulse" : ""
                }`}
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
