"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

// Definición de tipos
type ARNm = {
  id: number
  sequence: string
  x: number
  y: number
  speedX: number
  speedY: number
  size: number
  isTarget: boolean
  isHit: boolean
}

type Projectile = {
  id: number
  x: number
  y: number
  speedY: number
  active: boolean
}

type Player = {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

export default function ShootARNmGame() {
  // Referencias
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  // Estados del juego
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [countdown, setCountdown] = useState(3)
  const [targetSequence, setTargetSequence] = useState("")
  const [gameWon, setGameWon] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Estados internos (no reactivos para mejor rendimiento)
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    speed: 5,
  })
  const arnmsRef = useRef<ARNm[]>([])
  const projectilesRef = useRef<Projectile[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const lastShotTimeRef = useRef<number>(0)
  const targetCountRef = useRef<number>(0)
  const hitCountRef = useRef<number>(0)

  // Secuencias de ARNm para el juego
  const arnmSequences = ["AUGCUAGCUAGCUA", "GCUAGCUAGCUAGC", "UAGCUAGCUAGCUA", "CGUACGUACGUACG", "ACGUACGUACGUAC"]

  // Iniciar el juego
  const startGame = () => {
    setGameStarted(true)
    setShowControls(false)

    // Cuenta regresiva
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          initializeGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Inicializar el juego
  const initializeGame = () => {
    if (canvasRef.current && gameAreaRef.current) {
      const canvas = canvasRef.current
      const gameArea = gameAreaRef.current
      const rect = gameArea.getBoundingClientRect()

      canvas.width = rect.width
      canvas.height = rect.height

      // Inicializar jugador
      playerRef.current = {
        x: canvas.width / 2 - 30,
        y: canvas.height - 80,
        width: 60,
        height: 60,
        speed: 5,
      }

      // Seleccionar secuencia objetivo
      const randomIndex = Math.floor(Math.random() * arnmSequences.length)
      const selectedTarget = arnmSequences[randomIndex]
      setTargetSequence(selectedTarget)

      // Inicializar ARNms
      const numARNms = 5 + level * 2
      targetCountRef.current = Math.ceil(numARNms / 3) // 1/3 de los ARNms serán objetivos
      hitCountRef.current = 0

      const newARNms: ARNm[] = []

      for (let i = 0; i < numARNms; i++) {
        const isTarget = i < targetCountRef.current
        let seqIndex = isTarget
          ? arnmSequences.indexOf(targetSequence)
          : Math.floor(Math.random() * arnmSequences.length)

        // Asegurarnos de que el índice sea válido
        if (seqIndex < 0 || seqIndex >= arnmSequences.length) {
          seqIndex = Math.floor(Math.random() * arnmSequences.length)
        }

        newARNms.push({
          id: i,
          sequence: arnmSequences[seqIndex],
          x: Math.random() * (canvas.width - 100) + 50,
          y: Math.random() * (canvas.height / 2 - 100) + 50,
          speedX: (Math.random() - 0.5) * (1 + level * 0.5),
          speedY: (Math.random() - 0.5) * (1 + level * 0.5),
          size: 40,
          isTarget: isTarget && arnmSequences[seqIndex] === targetSequence,
          isHit: false,
        })
      }

      arnmsRef.current = newARNms
      projectilesRef.current = []

      // Iniciar temporizador
      setTimeLeft(60)
      setGameOver(false)
      setGameWon(false)

      // Iniciar bucle del juego
      gameLoop()
    }
  }

  // Bucle principal del juego
  const gameLoop = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Dibujar fondo (citoplasma)
        ctx.fillStyle = "#e6f7ff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Actualizar y dibujar jugador (complejo RISC)
        updatePlayer()
        drawPlayer(ctx)

        // Actualizar y dibujar ARNms
        updateARNms(canvas.width, canvas.height)
        drawARNms(ctx)

        // Actualizar y dibujar proyectiles
        updateProjectiles()
        drawProjectiles(ctx)

        // Comprobar colisiones
        checkCollisions()

        // Comprobar condición de victoria
        if (hitCountRef.current >= targetCountRef.current) {
          if (level < 3) {
            setLevel((prev) => prev + 1)
            setScore((prev) => prev + timeLeft * 10)
            initializeGame()
          } else {
            setGameWon(true)
            cancelAnimationFrame(animationRef.current)
            return
          }
        }
      }

      // Continuar el bucle
      animationRef.current = requestAnimationFrame(gameLoop)
    }
  }

  // Actualizar posición del jugador
  const updatePlayer = () => {
    const player = playerRef.current

    if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) {
      player.x = Math.max(0, player.x - player.speed)
    }
    if (keysRef.current["ArrowRight"] || keysRef.current["d"]) {
      player.x = Math.min(canvasRef.current!.width - player.width, player.x + player.speed)
    }
    if (keysRef.current["ArrowUp"] || keysRef.current["w"]) {
      player.y = Math.max(canvasRef.current!.height / 2, player.y - player.speed)
    }
    if (keysRef.current["ArrowDown"] || keysRef.current["s"]) {
      player.y = Math.min(canvasRef.current!.height - player.height, player.y + player.speed)
    }

    // Disparar
    if (keysRef.current[" "]) {
      shoot()
    }
  }

  // Dibujar el jugador (complejo RISC)
  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const player = playerRef.current

    // Dibujar el complejo RISC
    ctx.fillStyle = "#6366f1" // Color índigo para el complejo RISC
    ctx.beginPath()
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2)
    ctx.fill()

    // Añadir detalles
    ctx.fillStyle = "#4f46e5"
    ctx.beginPath()
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 3, 0, Math.PI * 2)
    ctx.fill()

    // Texto "RISC"
    ctx.fillStyle = "white"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("RISC", player.x + player.width / 2, player.y + player.height / 2 + 5)
  }

  // Actualizar posiciones de ARNms
  const updateARNms = (width: number, height: number) => {
    arnmsRef.current = arnmsRef.current.map((arnm) => {
      if (!arnm || arnm.isHit) return arnm

      let newX = arnm.x + arnm.speedX
      let newY = arnm.y + arnm.speedY

      // Rebotar en los bordes
      if (newX <= 0 || newX >= width - arnm.size) {
        arnm.speedX *= -1
        newX = arnm.x + arnm.speedX
      }

      if (newY <= 0 || newY >= height / 2) {
        arnm.speedY *= -1
        newY = arnm.y + arnm.speedY
      }

      return { ...arnm, x: newX, y: newY }
    })
  }

  // Dibujar ARNms
  const drawARNms = (ctx: CanvasRenderingContext2D) => {
    arnmsRef.current.forEach((arnm) => {
      if (arnm.isHit) return

      // Color según si es objetivo o no
      const color = arnm.sequence === targetSequence ? "#10b981" : "#f43f5e"

      // Dibujar ARNm
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(arnm.x + arnm.size / 2, arnm.y + arnm.size / 2, arnm.size / 2, 0, Math.PI * 2)
      ctx.fill()

      // Texto (secuencia abreviada)
      const displayText = arnm.sequence ? arnm.sequence.substring(0, 5) + "..." : "ARNm"
      ctx.fillStyle = "white"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(displayText, arnm.x + arnm.size / 2, arnm.y + arnm.size / 2 + 3)
    })
  }

  // Disparar proyectil
  const shoot = () => {
    const now = Date.now()
    if (now - lastShotTimeRef.current < 300) return // Limitar velocidad de disparo

    lastShotTimeRef.current = now

    const player = playerRef.current
    const newProjectile: Projectile = {
      id: projectilesRef.current.length,
      x: player.x + player.width / 2 - 5,
      y: player.y,
      speedY: -8,
      active: true,
    }

    projectilesRef.current.push(newProjectile)
  }

  // Actualizar proyectiles
  const updateProjectiles = () => {
    projectilesRef.current = projectilesRef.current
      .map((proj) => ({
        ...proj,
        y: proj.y + proj.speedY,
        active: proj.y > 0 && proj.active,
      }))
      .filter((proj) => proj.active)
  }

  // Dibujar proyectiles
  const drawProjectiles = (ctx: CanvasRenderingContext2D) => {
    projectilesRef.current.forEach((proj) => {
      if (!proj.active) return

      // Dibujar microARN (proyectil)
      ctx.fillStyle = "#8b5cf6" // Color púrpura para microARN
      ctx.beginPath()
      ctx.arc(proj.x, proj.y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Detalles
      ctx.fillStyle = "#7c3aed"
      ctx.beginPath()
      ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // Comprobar colisiones
  const checkCollisions = () => {
    projectilesRef.current.forEach((proj) => {
      if (!proj.active) return

      arnmsRef.current.forEach((arnm) => {
        if (arnm.isHit) return
        if (!arnm || !arnm.sequence) return

        // Comprobar colisión (distancia entre centros)
        const dx = arnm.x + arnm.size / 2 - proj.x
        const dy = arnm.y + arnm.size / 2 - proj.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < arnm.size / 2 + 8) {
          // Colisión detectada
          proj.active = false
          arnm.isHit = true

          // Actualizar puntuación
          if (arnm.sequence === targetSequence) {
            setScore((prev) => prev + 50)
            hitCountRef.current++
          } else {
            setScore((prev) => Math.max(0, prev - 30))
          }
        }
      })
    })
  }

  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true

      // Disparar con espacio
      if (e.key === " " && gameStarted && countdown === 0 && !gameOver && !gameWon) {
        shoot()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameStarted, countdown, gameOver, gameWon])

  // Manejar eventos del ratón
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current && gameAreaRef.current && gameStarted && countdown === 0 && !gameOver && !gameWon) {
        const rect = gameAreaRef.current.getBoundingClientRect()
        const player = playerRef.current

        player.x = Math.max(
          0,
          Math.min(canvasRef.current.width - player.width, e.clientX - rect.left - player.width / 2),
        )
        player.y = Math.max(
          canvasRef.current.height / 2,
          Math.min(canvasRef.current.height - player.height, e.clientY - rect.top - player.height / 2),
        )
      }
    }

    const handleClick = () => {
      if (gameStarted && countdown === 0 && !gameOver && !gameWon) {
        shoot()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [gameStarted, countdown, gameOver, gameWon])

  // Temporizador
  useEffect(() => {
    if (gameStarted && countdown === 0 && !gameOver && !gameWon) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setGameOver(true)
            cancelAnimationFrame(animationRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, countdown, gameOver, gameWon])

  // Limpiar animación al desmontar
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Reiniciar juego
  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setGameWon(false)
    setGameStarted(false)
    setCountdown(3)
    setShowControls(true)
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Barra de estado */}
      <div className="bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 px-3 py-1 rounded-full">
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

      {/* Objetivo actual */}
      {gameStarted && countdown === 0 && !gameOver && !gameWon && (
        <div className="bg-green-100 p-2 text-center">
          <span className="font-medium">Objetivo: Silenciar ARNm con secuencia </span>
          <span className="font-mono bg-white px-2 py-1 rounded">{targetSequence}</span>
        </div>
      )}

      {/* Área de juego */}
      <div ref={gameAreaRef} className="flex-1 relative bg-gradient-to-b from-blue-50 to-green-50 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Superposiciones */}
        {!gameStarted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Caza el ARNm</h2>
            {showControls && (
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mb-6">
                <h3 className="font-bold text-lg mb-3">Controles:</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-gray-200 px-2 py-1 rounded mr-2 text-sm">Ratón</span>
                    <span>Mover el complejo RISC</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-gray-200 px-2 py-1 rounded mr-2 text-sm">Clic</span>
                    <span>Disparar microARN</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-gray-200 px-2 py-1 rounded mr-2 text-sm">Flechas</span>
                    <span>Mover el complejo RISC</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-gray-200 px-2 py-1 rounded mr-2 text-sm">Espacio</span>
                    <span>Disparar microARN</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Objetivo: Silencia los ARNm que coincidan con la secuencia objetivo mostrada en la parte superior.
                </p>
              </div>
            )}
            <Button
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-xl rounded-lg shadow-lg"
            >
              Comenzar Juego
            </Button>
          </div>
        ) : countdown > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-purple-600">{countdown}</div>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">¡Tiempo agotado!</h2>
              <p className="mb-4">Puntuación final: {score}</p>
              <Button onClick={restartGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                Jugar de nuevo
              </Button>
            </div>
          </div>
        ) : gameWon ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades!</h2>
              <p className="mb-2">Has completado todos los niveles</p>
              <p className="text-xl font-bold mb-4">Puntuación final: {score}</p>
              <Button onClick={restartGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                Jugar de nuevo
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Instrucciones */}
      {gameStarted && countdown === 0 && !gameOver && !gameWon && (
        <div className="bg-gray-100 p-2 text-xs text-gray-600">
          <p>Dispara a los ARNm que coincidan con la secuencia objetivo. ¡Cuidado con silenciar los incorrectos!</p>
        </div>
      )}
    </div>
  )
}
