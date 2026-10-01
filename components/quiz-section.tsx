"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Question {
  id: number
  question: string
  options: string[]
  weight: number
}

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      question: "Qual é o principal objetivo da sua empresa?",
      options: ["Aumentar vendas", "Melhorar brand awareness", "Gerar leads", "Fidelizar clientes"],
      weight: 25,
    },
    {
      id: 2,
      question: "Qual é o seu orçamento mensal para marketing?",
      options: ["Até R$ 5.000", "R$ 5.000 - R$ 15.000", "R$ 15.000 - R$ 50.000", "Acima de R$ 50.000"],
      weight: 20,
    },
    {
      id: 3,
      question: "Qual canal de marketing você considera mais importante?",
      options: ["Redes sociais", "Google Ads", "Email marketing", "Marketing de conteúdo"],
      weight: 25,
    },
    {
      id: 4,
      question: "Como você mede o sucesso das suas campanhas?",
      options: ["ROI", "Engajamento", "Tráfego", "Conversões"],
      weight: 30,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const totalScore = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer + 1) * questions[index].weight
      }, 0)
      setScore(totalScore)
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setScore(0)
  }

  const getResultMessage = () => {
    if (score >= 300)
      return {
        title: "ESTRATÉGIA PREMIUM",
        message: "Sua empresa está pronta para campanhas de alto impacto!",
        color: "text-[#c4d203]",
      }
    if (score >= 200)
      return {
        title: "ESTRATÉGIA AVANÇADA",
        message: "Você tem potencial para grandes resultados!",
        color: "text-blue-400",
      }
    if (score >= 100)
      return { title: "ESTRATÉGIA BÁSICA", message: "É hora de acelerar seu marketing!", color: "text-orange-400" }
    return { title: "ESTRATÉGIA INICIAL", message: "Vamos começar do básico e crescer juntos!", color: "text-red-400" }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <section id="quiz" className="py-20 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4">
            DESCUBRA SUA <span className="text-[#c4d203]">ESTRATÉGIA</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Responda nosso quiz interativo e descubra qual estratégia de marketing é perfeita para sua empresa
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-md border-[#c4d203]/30 p-8">
          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#c4d203] h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">{questions[currentQuestion].question}</h3>
              </div>

              {/* Options */}
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="p-6 text-left border-[#c4d203]/30 hover:border-[#c4d203] hover:bg-[#c4d203]/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-[#c4d203] font-bold mr-4">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-white">{option}</span>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            /* Result */
            <div className="text-center">
              <div className="mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className={`text-3xl font-black mb-4 ${getResultMessage().color}`}>{getResultMessage().title}</h3>
                <p className="text-xl text-gray-300 mb-6">{getResultMessage().message}</p>
                <div className="text-4xl font-black text-[#c4d203] mb-8">Score: {score} pontos</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-[#c4d203] text-[#c4d203] hover:bg-[#c4d203] hover:text-[#0f0f0f] bg-transparent"
                >
                  Refazer Quiz
                </Button>
                <Button className="bg-[#c4d203] text-[#0f0f0f] hover:bg-[#c4d203]/90">Falar com Especialista</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
