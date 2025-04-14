"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import dynamic from "next/dynamic"
import Image from "next/image"

// Use dynamic import with no SSR for the 3D component
const MicroARNVisualization = dynamic(() => import("@/components/micro-arn-visualization"), { ssr: false })

export default function LearnPage() {
  const [glossaryTerm, setGlossaryTerm] = useState("")

  const glossaryTerms = {
    microARN: "Pequeñas moléculas de ARN no codificante que regulan la expresión génica a nivel post-transcripcional.",
    Dicer: "Enzima que procesa el pre-miARN en miARN maduro.",
    RISC: "Complejo de silenciamiento inducido por ARN, que utiliza miARN para identificar y silenciar ARNm específicos.",
    ARNm: "ARN mensajero, molécula que lleva la información genética del ADN a los ribosomas para la síntesis de proteínas.",
    Transcripción: "Proceso por el cual la información del ADN se copia en una molécula de ARN.",
    "Silenciamiento génico": "Proceso de regulación que inhibe la expresión de genes específicos.",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Módulo de Aprendizaje</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="intro">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="intro">Introducción</TabsTrigger>
              <TabsTrigger value="biogenesis">Biogénesis</TabsTrigger>
              <TabsTrigger value="function">Función</TabsTrigger>
              <TabsTrigger value="regulation">Regulación</TabsTrigger>
            </TabsList>

            <TabsContent value="intro" className="space-y-6">
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/microrna-intro.jpg"
                  alt="Estructura de microARN"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4">¿Qué es el microARN?</h2>
              <p className="text-gray-700 mb-4">
                Los microARNs (miARNs) son pequeñas moléculas de ARN no codificante de aproximadamente 22 nucleótidos de
                longitud que juegan un papel crucial en la regulación de la expresión génica a nivel
                post-transcripcional.
              </p>
              <p className="text-gray-700 mb-4">
                Descubiertos por primera vez en 1993 en el nematodo <em>C. elegans</em>, los miARNs han revolucionado
                nuestra comprensión de cómo se regula la expresión génica. Se estima que los miARNs regulan más del 60%
                de los genes que codifican proteínas en humanos.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <h3 className="font-semibold text-green-800">Características clave:</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Pequeño tamaño (18-25 nucleótidos)</li>
                  <li>No codifican proteínas</li>
                  <li>Altamente conservados en la evolución</li>
                  <li>Regulan la expresión génica uniéndose a ARNm diana</li>
                  <li>Un solo miARN puede regular múltiples genes</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="biogenesis">
              <h2 className="text-2xl font-semibold mb-4">Biogénesis del microARN</h2>
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/microrna-biogenesis.jpg"
                  alt="Biogénesis del microARN"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">1. Transcripción</h3>
                  <p>
                    Los genes de miARN son transcritos por la ARN polimerasa II para formar el miARN primario
                    (pri-miARN).
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">2. Procesamiento nuclear</h3>
                  <p>El complejo Drosha-DGCR8 procesa el pri-miARN en pre-miARN con estructura de horquilla.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">3. Exportación al citoplasma</h3>
                  <p>El pre-miARN es exportado al citoplasma por la Exportina-5.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">4. Procesamiento por Dicer</h3>
                  <p>La enzima Dicer corta el pre-miARN para formar un dúplex de miARN maduro.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">5. Formación del complejo RISC</h3>
                  <p>Una hebra del dúplex se incorpora al complejo RISC para guiar el silenciamiento de genes.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="function">
              <h2 className="text-2xl font-semibold mb-4">Función del microARN</h2>
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/microrna-function.jpg"
                  alt="Función del microARN"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <p className="text-gray-700 mb-6">
                Los microARNs funcionan principalmente como reguladores negativos de la expresión génica. Se unen a
                secuencias complementarias en la región 3' UTR (región no traducida) de los ARNm diana, lo que conduce
                a:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Degradación del ARNm</h3>
                    <p className="text-gray-700">
                      Cuando hay complementariedad perfecta entre el miARN y el ARNm diana, el complejo RISC induce la
                      degradación del ARNm, eliminando completamente su capacidad para producir proteínas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Inhibición de la traducción</h3>
                    <p className="text-gray-700">
                      Cuando hay complementariedad parcial, el miARN inhibe la traducción del ARNm sin degradarlo,
                      reduciendo la producción de proteínas sin eliminar el ARNm.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
                <h3 className="font-semibold text-amber-800">Impacto biológico:</h3>
                <p className="text-gray-700 mt-2">
                  A través de estos mecanismos, los miARNs participan en la regulación de numerosos procesos biológicos,
                  incluyendo:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Desarrollo embrionario</li>
                  <li>Diferenciación celular</li>
                  <li>Proliferación y apoptosis</li>
                  <li>Metabolismo</li>
                  <li>Respuesta inmune</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="regulation">
              <h2 className="text-2xl font-semibold mb-4">Regulación de la Expresión Génica</h2>
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/microrna-regulation.jpg"
                  alt="Regulación por microARN"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <p className="text-gray-700 mb-6">
                Los microARNs forman parte de una compleja red de regulación génica. Su expresión está finamente
                regulada y pueden actuar como interruptores moleculares o como ajustadores finos de la expresión génica.
              </p>

              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Redes de Regulación</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Regulación en bucle</p>
                      <p className="text-gray-700 text-sm">
                        Los miARNs pueden formar bucles de retroalimentación con factores de transcripción.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Regulación combinatoria</p>
                      <p className="text-gray-700 text-sm">
                        Múltiples miARNs pueden regular un solo gen, y un solo miARN puede regular múltiples genes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Competencia por sitios de unión</p>
                      <p className="text-gray-700 text-sm">
                        ARNs largos no codificantes pueden competir con ARNm por la unión a miARNs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Implicaciones en Enfermedades</h3>
                <p className="text-gray-700 mb-4">
                  La desregulación de miARNs está implicada en numerosas enfermedades, incluyendo:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="bg-white p-3 rounded shadow-sm">Cáncer</li>
                  <li className="bg-white p-3 rounded shadow-sm">Enfermedades cardiovasculares</li>
                  <li className="bg-white p-3 rounded shadow-sm">Enfermedades neurodegenerativas</li>
                  <li className="bg-white p-3 rounded shadow-sm">Trastornos metabólicos</li>
                  <li className="bg-white p-3 rounded shadow-sm">Enfermedades autoinmunes</li>
                  <li className="bg-white p-3 rounded shadow-sm">Infecciones virales</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Glosario Interactivo</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Haz clic en los términos subrayados en el texto para ver su definición, o explora el glosario completo
                aquí.
              </p>

              <div className="space-y-2">
                {Object.entries(glossaryTerms).map(([term, definition]) => (
                  <TooltipProvider key={term}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => setGlossaryTerm(term)}
                        >
                          {term}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p className="max-w-xs">{definition}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {glossaryTerm && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    <h4 className="font-medium">{glossaryTerm}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{glossaryTerms[glossaryTerm]}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
