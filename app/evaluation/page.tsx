"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function EvaluationPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  
  const sections = [
    {
      title: "Fundamentos de microARN",
      description: "Evalúa tu conocimiento sobre los conceptos básicos de microARN",
      questions: [
        {
          question: "¿Qué son los microARNs?",
          options: [
            "Moléculas de ARN que codifican proteínas",
            "Pequeñas moléculas de ARN no codificante que regulan la expresión génica",
            "Enzimas que degradan el ARN mensajero",
            "Proteínas que regulan la transcripción del ADN"
          ],
          correctAnswer: "Pequeñas moléculas de ARN no codificante que regulan la expresión génica"
        },
        {
          question: "¿Cuál es el tamaño aproximado de un microARN maduro?",
          options: [
            "10-15 nucleótidos",
            "18-25 nucleótidos",
            "50-100 nucleótidos",
            "200-300 nucleótidos"
          ],
          correctAnswer: "18-25 nucleótidos"
        },
        {
          question: "¿En qué año se descubrió el primer microARN?",
          options: [
            "1983",
            "1993",
            "2003",
            "2013"
          ],
          correctAnswer: "1993"
        }
      ]
    },
    {
      title: "Biogénesis y Función",
      description: "Evalúa tu conocimiento sobre la biogénesis y función de los microARNs",
      questions: [
        {
          question: "¿Qué enzima procesa el pre-miARN en miARN maduro?",
          options: [
            "Drosha",
            "Dicer",
            "Argonauta",
            "Polimerasa II"
          ],
          correctAnswer: "Dicer"
        },
        {
          question: "¿Qué complejo utiliza el miARN para silenciar genes?",
          options: [
            "Complejo de splicing",
            "Complejo RISC",
            "Complejo de transcripción",
            "Complejo ribosómico"
          ],
          correctAnswer: "Complejo RISC"
        },
        {
          question: "¿Cuál es el principal mecanismo de acción de los microARNs?",
          options: [
            "Activación de la transcripción génica",
            "Degradación del ARNm o inhibición de su traducción",
            "Modificación del ADN",
            "Activación de la síntesis de proteínas"
          ],
          correctAnswer: "Degradación del ARNm o inhibición de su traducción"
        }
      ]
    },
    {
      title: "Aplicaciones Clínicas",
      description: "Evalúa tu conocimiento sobre las aplicaciones clínicas de los microARNs",
      questions: [
        {
          question: "¿Qué microARNs están sobreexpresados en cáncer de mama?",
          options: [
            "miR-1 y miR-133",
            "miR-21 y miR-155",
            "miR-29 y miR-107",
            "miR-7 y miR-153"
          ],
          correctAnswer: "miR-21 y miR-155"
        },
        {
          question: "¿Qué microARNs están implicados en la enfermedad de Alzheimer?",
          options: [
            "miR-1 y miR-133",
            "miR-21 y miR-155",
            "miR-29 y miR-107",
            "miR-7 y miR-153"
          ],
          correctAnswer: "miR-29 y miR-107"
        },
        {
          question: "¿Cuál es una aplicación potencial de los microARNs en medicina?",
          options: [
            "Terapia génica para reemplazar genes defectuosos",
            "Biomarcadores para diagnóstico y pronóstico de enfermedades",
            "Sustitutos de antibióticos para tratar infecciones",
            "Agentes para la clonación de organismos"
          ],
          correctAnswer: "Biomarcadores para diagnóstico y pronóstico de enfermedades"
        }
      ]
    }
  ]
  
  const handleAnswerSelection = (answer) => {
    setAnswers({
      ...answers,
      [`${currentSection}-${currentQuestion}`]: answer
    })
  }
  
  const nextQuestion = () => {
    if (currentQuestion < sections[currentSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      setShowResults(true)
    }
  }
  
  const calculateScore = () => {
    let correctAnswers = 0
    let totalQuestions = 0
    
    sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        totalQuestions++
        if (answers[`${sectionIndex}-${questionIndex}`] === question.correctAnswer) {
          correctAnswers++
        }
      })
    })
    
    return {
      score: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100)
    }
  }
  
  const currentSectionQuestions = sections[currentSection].questions
  const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const currentQuestionGlobal = sections.slice(0, currentSection).reduce(
    (acc, section) => acc + section.questions.length, 0
  ) + currentQuestion + 1
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Módulo de Evaluación</h1>
      </div>
      
      {!showResults ? (
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Pregunta {currentQuestionGlobal} de {totalQuestions}</span>
              <span>Progreso: {Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
            </div>
            <Progress value={(currentQuestionGlobal / totalQuestions) * 100} className="h-2" />
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{sections[currentSection].title}</CardTitle>
                  <CardDescription>{sections[currentSection].description}</CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Sección {currentSection + 1} de {sections.length}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {currentQuestionGlobal}. {currentSectionQuestions[currentQuestion].question}
                  </h3>
                  
                  <RadioGroup 
                    value={answers[`${currentSection}-${currentQuestion}`]} 
                    className="space-y-3"
                  >
                    {currentSectionQuestions[currentQuestion].options.map((option, index) => (
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
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1)
                  } else if (currentSection > 0) {
                    setCurrentSection(currentSection - 1)
                    setCurrentQuestion(sections[currentSection - 1].questions.length - 1)
                  }
                }}
                disabled={currentSection === 0 && currentQuestion === 0}
              >
                Anterior
              </Button>
              
              <Button 
                onClick={nextQuestion}
                disabled={!answers[`${currentSection}-${currentQuestion}`]}
                className="bg-green-600 hover:bg-green-700"
              >
                {currentSection === sections.length - 1 && 
                 currentQuestion === sections[currentSection].questions.length - 1 
                  ? "Finalizar" 
                  : "Siguiente"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Resultados de la Evaluación</CardTitle>
              <CardDescription>
                Has completado la evaluación. Aquí están tus resultados.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">¡Evaluación completada!</h3>
                
                <div className="mb-6">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {calculateScore().percentage}%
                  </div>
                  <p className="text-gray-600">
                    Has respondido correctamente {calculateScore().score} de {calculateScore().total} preguntas
                  </p>
                </div>
                
                {calculateScore().percentage >= 80 ? (
                  <div className="bg-green-100 p-4 rounded-lg mb-6">
                    <p className="font-medium text-green-800">
                      ¡Excelente! Has demostrado un gran conocimiento sobre microARN.
                    </p>
                  </div>
                ) : calculateScore().percentage >= 60 ? (
                  <div className="bg-blue-100 p-4 rounded-lg mb-6">
                    <p className="font-medium text-blue-800">
                      ¡Buen trabajo! Tienes un buen conocimiento sobre microARN, pero aún hay espacio para mejorar.
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-100 p-4 rounded-lg mb-6">
                    <p className="font-medium text-amber-800">
                      Te recomendamos revisar el módulo de aprendizaje para mejorar tu comprensión sobre microARN.
                    </p>
                  </div>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h4 className="font-medium text-lg mb-4">Resumen por secciones:</h4>
                
                <div className="space-y-4">
                  {sections.map((section, sectionIndex) => {
                    const sectionQuestions = section.questions.length
                    let sectionCorrect = 0
                    
                    section.questions.forEach((question, questionIndex) => {
                      if (answers[`${sectionIndex}-${questionIndex}`] === question.correctAnswer) {
                        sectionCorrect++
                      }
                    })
                    
                    const sectionPercentage = Math.round((sectionCorrect / sectionQuestions) * 100)
                    
                    return (
                      <div key={sectionIndex} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">{section.title}</h5>
                          <span className="text-sm font-medium">
                            {sectionCorrect}/{sectionQuestions} correctas
                          </span>
                        </div>
                        <Progress value={sectionPercentage} className="h-2 mb-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                \
