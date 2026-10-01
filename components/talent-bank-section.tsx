"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Upload, Paperclip, CheckCircle, User, Mail, Phone, Briefcase, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function TalentBankSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    description: "",
    resume: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "description") {
      setCharCount(value.length)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setFormData((prev) => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        area: "",
        description: "",
        resume: null,
      })
      setCharCount(0)
    }, 3000)
  }

  const areas = [
    "Criação",
    "Design Gráfico",
    "Redação",
    "Social Media",
    "Estratégia",
    "Planejamento",
    "Audiovisual",
    "Desenvolvimento",
  ]

  return (
    <section ref={ref} className="relative py-20 bg-[#0f0f0f] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-32 bg-gradient-to-r from-gray-800/20 to-gray-700/20 transform -skew-y-2" />
        <div className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r from-gray-700/30 to-gray-600/30 transform skew-y-1" />
        <div className="absolute bottom-1/4 left-0 w-full h-40 bg-gradient-to-r from-[#c4d203]/10 to-[#c4d203]/5 transform -skew-y-1" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            <div className="text-[#c4d203]">PROCURAMOS</div>
            <div className="text-white">MENTES QUE</div>
            <div className="text-[#c4d203] animate-pulse">PULSAM</div>
            <div className="text-white">CRIATIVIDADE</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-2xl md:text-3xl font-bold text-white">FAÇA PARTE DO FLUXO</span>
            <span className="text-2xl md:text-3xl font-bold text-[#c4d203]">CRIATIVO</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 font-light tracking-wider"
          >
            CADASTRE-SE NO NOSSO BANCO DE TALENTOS
          </motion.p>
        </motion.div>

        {/* Success Modal */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-[#0f0f0f] border-2 border-[#c4d203] rounded-lg p-8 text-center max-w-md mx-4">
              <CheckCircle className="w-16 h-16 text-[#c4d203] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Sucesso!</h3>
              <p className="text-gray-300">Seu cadastro foi enviado com sucesso. Em breve entraremos em contato!</p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Nome Completo */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                  <User className="w-5 h-5" />
                  Nome Completo
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-[#c4d203] transition-all duration-300"
                  placeholder="Seu nome completo"
                  required
                />
              </motion.div>

              {/* E-mail */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                  <Mail className="w-5 h-5" />
                  E-mail
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-[#c4d203] transition-all duration-300"
                  placeholder="seu@email.com"
                  required
                />
              </motion.div>

              {/* Telefone */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                  <Phone className="w-5 h-5" />
                  Telefone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white focus:border-[#c4d203] transition-all duration-300"
                  placeholder="(00) 00000-0000"
                  required
                />
              </motion.div>

              {/* Área de Interesse */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                  <Briefcase className="w-5 h-5" />
                  Área de Interesse
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 text-white focus:border-[#c4d203] transition-all duration-300 rounded-md px-3 py-2 outline-none"
                  required
                >
                  <option value="" className="bg-[#0f0f0f] text-gray-400">
                    Selecione uma área
                  </option>
                  {areas.map((area) => (
                    <option key={area} value={area} className="bg-[#0f0f0f] text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Fale mais sobre você */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                <MessageSquare className="w-5 h-5" />
                Fale mais sobre você
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white focus:border-[#c4d203] transition-all duration-300 min-h-32"
                placeholder="Conte-nos sobre sua experiência, projetos e o que te motiva..."
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-400">{charCount}/500 caracteres</div>
            </motion.div>

            {/* Upload de Currículo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-[#c4d203] font-semibold">
                <Paperclip className="w-5 h-5" />
                Currículo (PDF ou DOC)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center gap-3 w-full p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-[#c4d203] transition-all duration-300 bg-gray-900/30"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-300">
                    {formData.resume ? formData.resume.name : "Clique para fazer upload do seu currículo"}
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-center"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#c4d203] text-[#0f0f0f] font-bold px-12 py-4 text-lg hover:bg-[#c4d203]/90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-6 h-6 border-2 border-[#0f0f0f] border-t-transparent rounded-full"
                  />
                ) : (
                  "ENVIAR CANDIDATURA"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Bottom Brand */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex justify-between items-center mt-20 pt-8 border-t border-gray-800"
        >
          <div className="text-3xl font-black text-[#c4d203]">artéria</div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">ENVIE SUA MENSAGEM</p>
            <p className="text-2xl font-bold text-white">(43) 9646-0971</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}