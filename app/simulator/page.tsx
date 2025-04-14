"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import CellSimulator from "@/components/cell-simulator"

export default function SimulatorPage() {
  const [miRNALevel, setMiRNALevel] = useState(50)
  const [targetGene, setTargetGene] = useState("PTEN")
  const [isSimulating, setIsSimulating] = useState(false)
  const [showLabels, setShowLabels] = useState(true)

  const startSimulation = () => {
    setIsSimulating(true)
    // Simulation logic would be implemented here
    setTimeout(() => {
      setIsSimulating(false)
    }, 3000)
  }

  const resetSimulation = () => {
    setMiRNALevel(50)
    setIsSimulating(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Simulador Celular</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Visualización de la Célula</CardTitle>
              <CardDescription>Observa cómo el microARN afecta la expresión génica en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <CellSimulator
                  miRNALevel={miRNALevel}
                  targetGene={targetGene}
                  isSimulating={isSimulating}
                  showLabels={showLabels}
                />
              </div>

              <div className="flex justify-between mt-4">
                <Toggle pressed={showLabels} onPressedChange={setShowLabels}>
                  Mostrar etiquetas
                </Toggle>

                <div className="space-x-2">
                  <Button onClick={startSimulation} disabled={isSimulating} className="bg-green-600 hover:bg-green-700">
                    <Play className="mr-2 h-4 w-4" /> Iniciar
                  </Button>
                  <Button variant="outline" onClick={resetSimulation}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultados de la Simulación</CardTitle>
              <CardDescription>Análisis de los efectos del microARN en la expresión génica</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="graph">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="graph">Gráfico</TabsTrigger>
                  <TabsTrigger value="data">Datos</TabsTrigger>
                  <TabsTrigger value="analysis">Análisis</TabsTrigger>
                </TabsList>

                <TabsContent value="graph">
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de expresión génica vs. nivel de miARN</p>
                  </div>
                </TabsContent>

                <TabsContent value="data">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Nivel de miARN (%)</th>
                          <th className="border p-2 text-left">ARNm (unidades)</th>
                          <th className="border p-2 text-left">Proteína (unidades)</th>
                          <th className="border p-2 text-left">Efecto celular</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">0</td>
                          <td className="border p-2">100</td>
                          <td className="border p-2">100</td>
                          <td className="border p-2">Normal</td>
                        </tr>
                        <tr>
                          <td className="border p-2">25</td>
                          <td className="border p-2">75</td>
                          <td className="border p-2">70</td>
                          <td className="border p-2">Leve inhibición</td>
                        </tr>
                        <tr>
                          <td className="border p-2">50</td>
                          <td className="border p-2">50</td>
                          <td className="border p-2">40</td>
                          <td className="border p-2">Inhibición moderada</td>
                        </tr>
                        <tr>
                          <td className="border p-2">75</td>
                          <td className="border p-2">25</td>
                          <td className="border p-2">15</td>
                          <td className="border p-2">Inhibición fuerte</td>
                        </tr>
                        <tr>
                          <td className="border p-2">100</td>
                          <td className="border p-2">10</td>
                          <td className="border p-2">5</td>
                          <td className="border p-2">Silenciamiento casi completo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="analysis">
                  <div className="space-y-4">
                    <p>
                      El análisis muestra una relación inversamente proporcional entre los niveles de miARN y la
                      expresión de la
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Ajusta los parámetros de la simulación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Nivel de microARN (%)
                </div>
                <Slider
                  defaultValue={[miRNALevel]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMiRNALevel(value[0])}
                  disabled={isSimulating}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
