import Link from "next/link"
import { ArrowRight, BookOpen, FlaskRoundIcon as Flask, GamepadIcon, ListChecks, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">mi ARN Explorer</h1>
              <p className="mt-2 text-green-100">Descubre el fascinante mundo del microARN</p>
            </div>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/learn" className="hover:text-green-200 transition">
                    Aprendizaje
                  </Link>
                </li>
                <li>
                  <Link href="/simulator" className="hover:text-green-200 transition">
                    Simulador
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-green-200 transition">
                    Juegos
                  </Link>
                </li>
                <li>
                  <Link href="/evaluation" className="hover:text-green-200 transition">
                    Evaluación
                  </Link>
                </li>
                <li>
                  <Link href="/cases" className="hover:text-green-200 transition">
                    Casos Reales
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Explora el Mundo del microARN</h2>
              <p className="text-gray-600 mb-6">
                Descubre cómo estas pequeñas moléculas de ARN juegan un papel crucial en la regulación de la expresión
                génica y su impacto en la biología celular.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Visualización de microARN"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Módulos Educativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Módulo de Aprendizaje</CardTitle>
                <CardDescription>Animaciones interactivas y mini-lecciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Explora el proceso de transcripción de miARN, procesamiento por Dicer, formación del complejo RISC y
                  más a través de animaciones interactivas.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/learn">
                  <Button variant="outline">Explorar</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Flask className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Simulador Celular</CardTitle>
                <CardDescription>Experimenta con la expresión génica</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Simula la expresión génica con y sin la acción de miARN. Modifica concentraciones y observa los
                  efectos en proteínas diana.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/simulator">
                  <Button variant="outline">Simular</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <GamepadIcon className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Juegos Educativos</CardTitle>
                <CardDescription>Aprende mientras juegas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Participa en juegos como "Atrapa el ARN" y pon a prueba tus conocimientos con preguntas interactivas.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/games">
                  <Button variant="outline">Jugar</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <ListChecks className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Módulo de Evaluación</CardTitle>
                <CardDescription>Evalúa tu conocimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Completa cuestionarios al final de cada sección y recibe retroalimentación personalizada sobre tu
                  progreso.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/evaluation">
                  <Button variant="outline">Evaluar</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Microscope className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Casos Reales</CardTitle>
                <CardDescription>Aplicaciones en medicina</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Explora ejemplos de enfermedades donde los miARN están implicados, como cáncer y enfermedades
                  neurodegenerativas.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/cases">
                  <Button variant="outline">Descubrir</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} mi ARN Explorer - Software Educativo sobre microARN</p>
        </div>
      </footer>
    </div>
  )
}
