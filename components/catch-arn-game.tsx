"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"

// Definición de tipos
type ARNMensajero = {
  id: number
  sequence: string
  x: number
  y: number
  shouldBeSilenced: boolean
  isCaught: boolean
  isCorrect?: boolean
}

type MicroARN = {
  id: number
  sequence: string
  complementary: string
  isDragging: boolean
  position: { x: number; y: number }
}

export default function CatchARNGame() {
  // Estados del juego
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [arnMensajeros, setArnMensajeros] = useState<ARNMensajero[]>([])
  const [microARNs, setMicroARNs] = useState<MicroARN[]>([])
  const [activeMicroARN, setActiveMicroARN] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success")
  const [gameStarted, setGameStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Secuencias de ARN para el juego
  const arnSequences = [
    { sequence: "AUGCUAGCUAGCUAGCUA", complementary: "UACGAUCGAUCGAUCGAU" },
    { sequence: "GCUAGCUAGCUAGCUAGC", complementary: "CGAUCGAUCGAUCGAUCG" },
    { sequence: "UAGCUAGCUAGCUAGCUA", complementary: "AUCGAUCGAUCGAUCGAU" },
    { sequence: "CGUACGUACGUACGUACG", complementary: "GCAUGCAUGCAUGCAUGC" },
    { sequence: "ACGUACGUACGUACGUA", complementary: "UGCAUGCAUGCAUGCAU" },
  ]

  // Iniciar el juego con cuenta regresiva
  const startGame = () => {
    setGameStarted(true)
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          initializeLevel(1)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Inicializar nivel
  const initializeLevel = (level: number) => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect()

      // Crear ARN mensajeros para este nivel
      const numARNs = Math.min(3 + level, 8) // Aumenta con el nivel, máximo 8
      const newARNs: ARNMensajero[] = []

      for (let i = 0; i < numARNs; i++) {
        const randomIndex = Math.floor(Math.random() * arnSequences.length)
        const shouldBeSilenced = Math.random() > 0.5

        newARNs.push({
          id: i,
          sequence: arnSequences[randomIndex].sequence,
          x: Math.random() * (width - 150) + 50,
          y: Math.random() * (height - 150) + 50,
          shouldBeSilenced,
          isCaught: false,
        })
      }

      // Crear microARNs
      const newMicroARNs: MicroARN[] = []
      const silencedCount = newARNs.filter((arn) => arn.shouldBeSilenced).length

      // Asegurarse de que haya suficientes microARNs para los ARNm que deben ser silenciados
      for (let i = 0; i < silencedCount; i++) {
        const targetARN = newARNs.find(
          (arn) =>
            arn.shouldBeSilenced &&
            !newMicroARNs.some(
              (m) => m.complementary === arnSequences.find((s) => s.sequence === arn.sequence)?.complementary,
            ),
        )

        if (targetARN) {
          const complementarySequence = arnSequences.find((s) => s.sequence === targetARN.sequence)?.complementary || ""

          newMicroARNs.push({
            id: i,
            sequence: complementarySequence,
            complementary: targetARN.sequence,
            isDragging: false,
            position: { x: 50 + i * 80, y: height - 80 },
          })
        }
      }

      // Añadir algunos microARNs adicionales para confundir
      const additionalCount = Math.min(2, 5 - silencedCount)
      for (let i = 0; i < additionalCount; i++) {
        const randomIndex = Math.floor(Math.random() * arnSequences.length)

        newMicroARNs.push({
          id: silencedCount + i,
          sequence: arnSequences[randomIndex].complementary,
          complementary: arnSequences[randomIndex].sequence,
          isDragging: false,
          position: { x: 50 + (silencedCount + i) * 80, y: height - 80 },
        })
      }

      setArnMensajeros(newARNs)
      setMicroARNs(newMicroARNs)
      setTimeLeft(60)
      setGameOver(false)
      setGameWon(false)
    }
  }

  // Efecto para el temporizador
  useEffect(() => {
    if (gameStarted && countdown === 0 && !gameOver && !gameWon) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setGameOver(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, countdown, gameOver, gameWon])

  // Comprobar si se ha ganado el nivel
  useEffect(() => {
    if (gameStarted && countdown === 0 && !gameOver && !gameWon) {
      const silencedARNs = arnMensajeros.filter((arn) => arn.shouldBeSilenced && arn.isCaught)
      const incorrectlySilenced = arnMensajeros.filter((arn) => !arn.shouldBeSilenced && arn.isCaught)

      // Si todos los ARNm que deben ser silenciados han sido atrapados y no hay incorrectos
      if (
        silencedARNs.length === arnMensajeros.filter((arn) => arn.shouldBeSilenced).length &&
        incorrectlySilenced.length === 0
      ) {
        setGameWon(true)
        setScore((prevScore) => prevScore + level * 100 + timeLeft * 5)

        // Mostrar feedback
        setFeedbackMessage("¡Nivel completado! +100 puntos")
        setFeedbackType("success")
        setShowFeedback(true)

        setTimeout(() => {
          setShowFeedback(false)
          if (level < 3) {
            setLevel((prevLevel) => prevLevel + 1)
            setCountdown(3)
            setTimeout(() => {
              initializeLevel(level + 1)
            }, 1000)
          } else {
            // Juego completado
            setFeedbackMessage("¡Felicidades! Has completado todos los niveles")
            setFeedbackType("success")
            setShowFeedback(true)
          }
        }, 2000)
      }
    }
  }, [arnMensajeros, gameStarted, countdown, gameOver, gameWon, level, timeLeft])

  // Manejar el inicio del arrastre
  const handleDragStart = (id: number) => {
    setActiveMicroARN(id)
    setMicroARNs((prev) => prev.map((microARN) => (microARN.id === id ? { ...microARN, isDragging: true } : microARN)))
  }

  // Manejar el fin del arrastre
  const handleDragEnd = (event: any, info: any) => {
    if (activeMicroARN !== null) {
      const microARN = microARNs.find((m) => m.id === activeMicroARN)

      if (microARN) {
        // Comprobar si el microARN se ha soltado sobre un ARNm
        const collidedARN = arnMensajeros.find((arn) => {
          const distance = Math.sqrt(Math.pow(arn.x - info.point.x, 2) + Math.pow(arn.y - info.point.y, 2))
          return distance < 50 && !arn.isCaught
        })

        if (collidedARN) {
          // Comprobar si el microARN es complementario al ARNm
          const isComplementary = microARN.complementary === collidedARN.sequence
          const shouldBeSilenced = collidedARN.shouldBeSilenced

          // Actualizar ARNm
          setArnMensajeros((prev) =>
            prev.map((arn) =>
              arn.id === collidedARN.id
                ? { ...arn, isCaught: true, isCorrect: isComplementary && shouldBeSilenced }
                : arn,
            ),
          )

          // Eliminar el microARN usado
          setMicroARNs((prev) => prev.filter((m) => m.id !== activeMicroARN))

          // Actualizar puntuación
          if (isComplementary && shouldBeSilenced) {
            setScore((prev) => prev + 50)
            setFeedbackMessage("¡Correcto! +50 puntos")
            setFeedbackType("success")
          } else {
            setScore((prev) => Math.max(0, prev - 30))
            setFeedbackMessage("¡Incorrecto! -30 puntos")
            setFeedbackType("error")
          }

          setShowFeedback(true)
          setTimeout(() => setShowFeedback(false), 1500)
        } else {
          // Devolver el microARN a su posición original
          setMicroARNs((prev) => prev.map((m) => (m.id === activeMicroARN ? { ...m, isDragging: false } : m)))
        }
      }

      setActiveMicroARN(null)
    }
  }

  // Reiniciar el juego
  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setGameWon(false)
    setGameStarted(false)
    setCountdown(3)
  }

  // Renderizar el juego
  return (
    <div className="w-full h-full flex flex-col">
      {/* Barra de estado */}
      <div className="bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <span className="font-medium">Nivel: {level}/3</span>
          </div>
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="font-medium">Puntuación: {score}</span>
          </div>
        </div>
        <div className="bg-red-100 px-3 py-1 rounded-full">
          <span className="font-medium">Tiempo: {timeLeft}s</span>
        </div>
      </div>

      {/* Área de juego */}
      <div ref={gameAreaRef} className="flex-1 relative bg-gradient-to-b from-blue-50 to-green-50 overflow-hidden">
        {!gameStarted ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl rounded-lg shadow-lg"
            >
              Comenzar Juego
            </Button>
          </div>
        ) : countdown > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-green-600">{countdown}</div>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Tiempo agotado!</h2>
              <p className="mb-4">Puntuación final: {score}</p>
              <Button onClick={restartGame} className="bg-green-600 hover:bg-green-700">
                Jugar de nuevo
              </Button>
            </div>
          </div>
        ) : gameWon && level >= 3 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades!</h2>
              <p className="mb-2">Has completado todos los niveles</p>
              <p className="text-xl font-bold mb-4">Puntuación final: {score}</p>
              <Button onClick={restartGame} className="bg-green-600 hover:bg-green-700">
                Jugar de nuevo
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* ARN mensajeros */}
            {arnMensajeros.map((arn) => (
              <div
                key={arn.id}
                className={`absolute px-3 py-2 rounded-lg text-xs font-mono ${
                  arn.isCaught
                    ? arn.isCorrect
                      ? "bg-green-200 border-2 border-green-500"
                      : "bg-red-200 border-2 border-red-500"
                    : arn.shouldBeSilenced
                      ? "bg-yellow-100 border border-yellow-300"
                      : "bg-blue-100 border border-blue-300"
                }`}
                style={{
                  left: arn.x,
                  top: arn.y,
                  transition: "all 0.3s ease",
                  cursor: "default",
                  zIndex: 10,
                }}
              >
                <div className="flex items-center space-x-1">
                  <span>{arn.sequence}</span>
                  {arn.shouldBeSilenced && (
                    <span className="bg-yellow-200 text-yellow-800 text-[10px] px-1 rounded">Silenciar</span>
                  )}
                </div>
              </div>
            ))}

            {/* MicroARNs */}
            {microARNs.map((microARN) => (
              <motion.div
                key={microARN.id}
                className="absolute px-3 py-2 bg-green-100 border border-green-300 rounded-lg text-xs font-mono cursor-grab"
                style={{
                  left: microARN.position.x,
                  top: microARN.position.y,
                  zIndex: microARN.isDragging ? 20 : 15,
                }}
                drag
                dragConstraints={gameAreaRef}
                onDragStart={() => handleDragStart(microARN.id)}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0,0,0,0.2)" }}
              >
                {microARN.sequence}
              </motion.div>
            ))}

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white font-bold ${
                  feedbackType === "success" ? "bg-green-600" : "bg-red-600"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {feedbackMessage}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Instrucciones */}
      {gameStarted && countdown === 0 && !gameOver && !gameWon && (
        <div className="bg-gray-100 p-2 text-xs text-gray-600">
          <p>Arrastra los microARN hacia los ARNm que deben ser silenciados. Los ARNm a silenciar están marcados.</p>
        </div>
      )}
    </div>
  )
}
