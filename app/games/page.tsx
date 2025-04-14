"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"

// Importamos los juegos con carga dinámica para evitar problemas de SSR
const CatchARNGame = dynamic(() => import("@/components/catch-arn-game"), { ssr: false })
const ShootARNmGame = dynamic(() => import("@/components/shoot-arnm-game"), { ssr: false })

export default function GamesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [catchGameStarted, setCatchGameStarted] = useState(false)
  const [shootGameStarted, setShootGameStarted] = useState(false)

  const questions = [
    {
      question: "¿Cuál es la función principal de los microARNs?",
      options: [
        "Codificar proteínas",
        "Regular la expresión génica",
        "Catalizar reacciones químicas",
        "Formar la estructura celular",
      ],
      correctAnswer: "Regular la expresión génica",
      explanation:
        "Los microARNs son pequeñas moléculas de ARN no codificante que regulan la expresión génica a nivel post-transcripcional.",
    },
    {
      question: "¿Qué enzima procesa el pre-miARN en miARN maduro?",
      options: ["Drosha", "Dicer", "Argonauta", "Polimerasa"],
      correctAnswer: "Dicer",
      explanation: "Dicer es una enzima que corta el pre-miARN para formar un dúplex de miARN maduro en el citoplasma.",
    },
    {
      question: "¿Cómo afectan los microARNs a sus genes diana?",
      options: [
        "Aumentando su transcripción",
        "Degradando el ARNm o inhibiendo su traducción",
        "Modificando el ADN",
        "Activando la síntesis de proteínas",
      ],
      correctAnswer: "Degradando el ARNm o inhibiendo su traducción",
      explanation:
        "Los microARNs pueden degradar el ARNm diana o inhibir su traducción, dependiendo del grado de complementariedad entre el miARN y el ARNm.",
    },
    {
      question: "¿Qué complejo utiliza el miARN para silenciar genes?",
      options: ["Complejo de splicing", "Complejo RISC", "Complejo de transcripción", "Complejo ribosómico"],
      correctAnswer: "Complejo RISC",
      explanation:
        "El complejo RISC (RNA-induced silencing complex) incorpora el miARN maduro y lo utiliza como guía para reconocer y silenciar ARNm específicos.",
    },
    {
      question: "¿En qué región del ARNm suelen unirse los microARNs?",
      options: ["Región 5' UTR", "Región codificante", "Región 3' UTR", "Región promotora"],
      correctAnswer: "Región 3' UTR",
      explanation:
        "Los microARNs generalmente se unen a secuencias complementarias en la región 3' UTR (región no traducida) de los ARNm diana.",
    },
  ]

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer)
  }

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer("")

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setGameCompleted(true)
      }
    }, 2000)
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer("")
    setShowFeedback(false)
    setGameCompleted(false)
  }

  const startCatchGame = () => {
    setCatchGameStarted(true)
  }

  const startShootGame = () => {
    setShootGameStarted(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Juegos Educativos</h1>
      </div>

      <Tabs defaultValue="quiz">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="quiz">Quiz de microARN</TabsTrigger>
          <TabsTrigger value="catch">Atrapa el ARN</TabsTrigger>
          <TabsTrigger value="shoot">Caza el ARNm</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Quiz de microARN</CardTitle>
                <CardDescription>Pon a prueba tus conocimientos sobre microARN</CardDescription>
              </CardHeader>

              <CardContent>
                {!gameCompleted ? (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>
                          Pregunta {currentQuestion + 1} de {questions.length}
                        </span>
                        <span>
                          Puntuación: {score}/{questions.length}
                        </span>
                      </div>
                      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

                      <RadioGroup value={selectedAnswer} className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={option}
                              id={`option-${index}`}
                              onClick={() => handleAnswerSelection(option)}
                            />
                            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {showFeedback && (
                      <div
                        className={`p-4 rounded-lg mb-4 ${selectedAnswer === questions[currentQuestion].correctAnswer ? "bg-green-100" : "bg-red-100"}`}
                      >
                        <div className="flex items-start">
                          {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                            <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">
                              {selectedAnswer === questions[currentQuestion].correctAnswer
                                ? "¡Correcto!"
                                : "Incorrecto"}
                            </p>
                            <p className="text-sm mt-1">{questions[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <h3 className="text-2xl font-bold mb-2">¡Quiz completado!</h3>
                    <p className="text-lg mb-4">
                      Tu puntuación: {score}/{questions.length}
                    </p>

                    {score === questions.length ? (
                      <div className="bg-green-100 p-4 rounded-lg mb-6">
                        <p className="font-medium text-green-800">
                          ¡Excelente! Has respondido correctamente a todas las preguntas.
                        </p>
                      </div>
                    ) : score >= questions.length / 2 ? (
                      <div className="bg-blue-100 p-4 rounded-lg mb-6">
                        <p className="font-medium text-blue-800">
                          ¡Buen trabajo! Has demostrado un buen conocimiento sobre microARN.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-100 p-4 rounded-lg mb-6">
                        <p className="font-medium text-amber-800">
                          Sigue aprendiendo. Revisa el módulo de aprendizaje para mejorar tus conocimientos.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end">
                {!gameCompleted ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={!selectedAnswer || showFeedback}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Comprobar respuesta
                  </Button>
                ) : (
                  <Button onClick={restartGame}>Reiniciar quiz</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="catch">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Atrapa el ARN</CardTitle>
                <CardDescription>Identifica y atrapa los ARN mensajeros que deben ser silenciados</CardDescription>
              </CardHeader>

              <CardContent>
                {!catchGameStarted ? (
                  <>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">¡Atrapa el ARN!</h3>
                        <p className="text-gray-600 mb-6">
                          En este juego, deberás identificar y atrapar los ARN mensajeros que deben ser silenciados por
                          los microARN. ¡Sé rápido y preciso!
                        </p>
                        <img
                          src="/images/catch-arn-preview.jpg"
                          alt="Atrapa el ARN"
                          className="max-w-md mx-auto rounded-lg shadow-md mb-6"
                        />
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Instrucciones:</h3>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        <li>Diferentes ARN mensajeros aparecerán en la pantalla.</li>
                        <li>Identifica los ARNm que deben ser silenciados según su secuencia.</li>
                        <li>Arrastra el microARN correspondiente hacia el ARNm para silenciarlo.</li>
                        <li>¡Cuidado! Si silencias un ARNm incorrecto, perderás puntos.</li>
                        <li>Completa todas las rondas para ganar.</li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <div className="h-[500px] relative bg-gray-50 rounded-lg overflow-hidden">
                    <CatchARNGame />
                  </div>
                )}
              </CardContent>

              <CardFooter>
                {!catchGameStarted ? (
                  <Button onClick={startCatchGame} className="w-full bg-green-600 hover:bg-green-700">
                    Iniciar juego
                  </Button>
                ) : (
                  <Button onClick={() => setCatchGameStarted(false)} variant="outline" className="w-full">
                    Volver a instrucciones
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shoot">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Caza el ARNm</CardTitle>
                <CardDescription>
                  Apunta con el complejo RISC a ARNm específicos flotando en el citoplasma
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!shootGameStarted ? (
                  <>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">¡Caza el ARNm!</h3>
                        <p className="text-gray-600 mb-6">
                          En este juego, controlarás el complejo RISC y deberás apuntar y disparar a los ARNm
                          específicos que flotan en el citoplasma. ¡Silencia los ARNm correctos y evita los incorrectos!
                        </p>
                        <img
                          src="/images/shoot-arnm-preview.jpg"
                          alt="Caza el ARNm"
                          className="max-w-md mx-auto rounded-lg shadow-md mb-6"
                        />
                      </div>
                    </div>

                    <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium text-purple-800 mb-2">Instrucciones:</h3>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        <li>Mueve el complejo RISC con el ratón o las flechas del teclado.</li>
                        <li>Dispara microARNs haciendo clic o presionando la barra espaciadora.</li>
                        <li>Apunta solo a los ARNm que coincidan con tu objetivo (mostrado en la parte superior).</li>
                        <li>Gana puntos por silenciar los ARNm correctos y pierde por los incorrectos.</li>
                        <li>¡Cuidado con los obstáculos y el tiempo limitado!</li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <div className="h-[500px] relative bg-gray-50 rounded-lg overflow-hidden">
                    <ShootARNmGame />
                  </div>
                )}
              </CardContent>

              <CardFooter>
                {!shootGameStarted ? (
                  <Button onClick={startShootGame} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Iniciar juego
                  </Button>
                ) : (
                  <Button onClick={() => setShootGameStarted(false)} variant="outline" className="w-full">
                    Volver a instrucciones
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
