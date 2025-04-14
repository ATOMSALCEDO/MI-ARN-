import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CasesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Casos Reales</h1>
      </div>

      <p className="text-gray-600 max-w-3xl mb-8">
        Explora ejemplos de enfermedades donde los microARNs juegan un papel importante. Estos casos ilustran la
        relevancia clínica de los microARNs y su potencial como dianas terapéuticas y biomarcadores.
      </p>

      <Tabs defaultValue="cancer">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="cancer">Cáncer</TabsTrigger>
          <TabsTrigger value="neuro">Enfermedades Neurodegenerativas</TabsTrigger>
          <TabsTrigger value="cardio">Enfermedades Cardiovasculares</TabsTrigger>
        </TabsList>

        <TabsContent value="cancer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cáncer de Mama</CardTitle>
                <CardDescription>miR-21 y miR-155</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/breast-cancer.jpg"
                    alt="Células de cáncer de mama"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  El miR-21 y miR-155 están sobreexpresados en cáncer de mama. El miR-21 inhibe genes supresores de
                  tumores como PTEN y PDCD4, promoviendo la proliferación celular y la metástasis.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-1">Relevancia clínica:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>Biomarcador para diagnóstico temprano</li>
                    <li>Predictor de respuesta a terapias</li>
                    <li>Potencial diana terapéutica</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leucemia Mieloide Crónica</CardTitle>
                <CardDescription>miR-150 y miR-146a</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/leukemia.jpg"
                    alt="Células de leucemia"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  Los niveles de miR-150 están reducidos en pacientes con leucemia mieloide crónica. Este microARN
                  regula la expresión de c-Myb, un oncogén implicado en la proliferación de células leucémicas.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-1">Relevancia clínica:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>Monitorización de la progresión de la enfermedad</li>
                    <li>Predictor de respuesta a inhibidores de tirosina quinasa</li>
                    <li>Potencial terapéutico mediante restitución de miR-150</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Terapias basadas en microARN en Oncología</CardTitle>
                <CardDescription>Avances y desafíos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Estrategias terapéuticas:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>
                        <span className="font-medium">Inhibición de oncomiRs:</span>
                        <p className="ml-6 text-sm">
                          Uso de antagomiRs y oligonucleótidos antisentido para bloquear microARNs sobreexpresados en
                          cáncer.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Restitución de miARNs supresores de tumores:</span>
                        <p className="ml-6 text-sm">
                          Administración de miméticos de miARN para restaurar la función de miARNs subexpresados.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Terapias combinadas:</span>
                        <p className="ml-6 text-sm">
                          Uso de moduladores de miARN junto con quimioterapia o inmunoterapia.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Desafíos actuales:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>
                        <span className="font-medium">Administración específica:</span>
                        <p className="ml-6 text-sm">
                          Desarrollo de sistemas de entrega que dirijan los moduladores de miARN específicamente a las
                          células tumorales.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Estabilidad in vivo:</span>
                        <p className="ml-6 text-sm">
                          Mejora de la estabilidad de los moduladores de miARN en el torrente sanguíneo.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Efectos fuera del objetivo:</span>
                        <p className="ml-6 text-sm">
                          Minimización de efectos secundarios debido a la regulación de múltiples genes por un solo
                          miARN.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="neuro">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enfermedad de Alzheimer</CardTitle>
                <CardDescription>miR-107 y miR-29</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/alzheimer.jpg"
                    alt="Cerebro con Alzheimer"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  Los niveles de miR-107 disminuyen en las etapas tempranas de la enfermedad de Alzheimer. Este microARN
                  regula la expresión de BACE1, una enzima clave en la producción de péptido beta-amiloide.
                </p>
                <p className="text-gray-700 mb-4">
                  Por otro lado, miR-29 regula la expresión de BACE1 y su disminución se correlaciona con un aumento en
                  los niveles de proteína beta-amiloide en pacientes con Alzheimer.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Aplicaciones potenciales:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>Biomarcadores para diagnóstico temprano</li>
                    <li>Terapias basadas en la restauración de miR-107 y miR-29</li>
                    <li>Monitorización de la progresión de la enfermedad</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enfermedad de Parkinson</CardTitle>
                <CardDescription>miR-7 y miR-153</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/parkinson.jpg"
                    alt="Cerebro con Parkinson"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  miR-7 y miR-153 regulan la expresión de α-sinucleína, una proteína cuya acumulación anormal es
                  característica de la enfermedad de Parkinson. La disminución de estos microARNs contribuye a la
                  patogénesis de la enfermedad.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Hallazgos clave:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>La sobreexpresión de miR-7 protege contra el estrés oxidativo en modelos celulares</li>
                    <li>miR-153 regula directamente la expresión de α-sinucleína</li>
                    <li>Potencial terapéutico mediante la restauración de estos microARNs</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cardio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Infarto de Miocardio</CardTitle>
                <CardDescription>miR-1, miR-133a y miR-208</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/heart-attack.jpg"
                    alt="Corazón con infarto"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  Los niveles circulantes de miR-1, miR-133a y miR-208 aumentan rápidamente después de un infarto de
                  miocardio. Estos microARNs se liberan desde los cardiomiocitos dañados y pueden servir como
                  biomarcadores sensibles y específicos.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-1">Ventajas como biomarcadores:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>Detección temprana (1-4 horas después del inicio de los síntomas)</li>
                    <li>Alta especificidad cardíaca (especialmente miR-208)</li>
                    <li>Correlación con el tamaño del infarto y el pronóstico</li>
                    <li>Estabilidad en la circulación sanguínea</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insuficiencia Cardíaca</CardTitle>
                <CardDescription>miR-21, miR-29 y miR-133</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/images/heart-failure.jpg"
                    alt="Corazón con insuficiencia"
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  La desregulación de varios microARNs contribuye a la remodelación cardíaca y la fibrosis en la
                  insuficiencia cardíaca. miR-21 promueve la fibrosis, mientras que miR-29 la inhibe al regular genes
                  que codifican proteínas de la matriz extracelular.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-1">Aplicaciones terapéuticas:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>Inhibición de miR-21 para reducir la fibrosis cardíaca</li>
                    <li>Restauración de miR-29 para prevenir la fibrosis excesiva</li>
                    <li>Modulación de miR-133 para regular la hipertrofia cardíaca</li>
                    <li>Uso como biomarcadores para monitorizar la progresión de la enfermedad</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Más información <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
