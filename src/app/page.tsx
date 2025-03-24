import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Star,
  Play,
  CheckCircle,
  Users,
  BrainCircuit,
  Heart
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const days = [23, 24, 25, 26, 27, 28, 29, 30, 31, 1];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              Por qué Terapi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">La plataforma de psicología más completa de latinoamérica</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Terapi es la plataforma de psicología online más completa para cuidar tu bienestar en latinoamérica. Encuentra respuestas con nuestros psicólogos <span className="font-semibold">certificados</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 p-6 hover:shadow-lg dark:hover:shadow-gray-800/40 transition-all duration-300">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg inline-flex mb-5">
                <Users className="w-6 h-6 text-purple-700 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Terapeutas Certificados</h3>
              <p className="text-gray-600 dark:text-gray-400">Todos nuestros psicólogos están verificados y tienen amplia experiencia para ayudarte.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 p-6 hover:shadow-lg dark:hover:shadow-gray-800/40 transition-all duration-300">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg inline-flex mb-5">
                <BrainCircuit className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Terapia Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-400">Nuestro sistema de IA encuentra el terapeuta ideal para tus necesidades específicas.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 p-6 hover:shadow-lg dark:hover:shadow-gray-800/40 transition-all duration-300">
              <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-lg inline-flex mb-5">
                <Heart className="w-6 h-6 text-pink-700 dark:text-pink-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Bienestar Completo</h3>
              <p className="text-gray-600 dark:text-gray-400">Abordamos todos los aspectos de tu salud mental para un bienestar integral.</p>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <Link href="/dashboard" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium group">
              <span>Conoce más sobre nuestros servicios</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Therapy Types Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              Terapias Especializadas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Soluciones para diversas necesidades</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Contamos con especialistas en diferentes áreas para brindarte la ayuda que necesitas, sin importar el desafío que enfrentes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/E6FFFA/333333?text=No+Más+Ansiedad" 
                  alt="Terapia para la ansiedad" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Técnicas efectivas para manejar la ansiedad</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">No Más Ansiedad</h3>
                <Link href="/anxiety" className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/F0E6FF/333333?text=Supera+Depresión" 
                  alt="Supera la depresión" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Apoyo profesional para superar la depresión</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Supera la Depresión</h3>
                <Link href="/depression" className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/FFE6E6/333333?text=Mejora+Relación" 
                  alt="Mejora tu relación" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Herramientas para una relación más saludable</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Mejora tu Relación</h3>
                <Link href="/relationships" className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-800/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/E6F0FF/333333?text=Duerme+Mejor" 
                  alt="Duerme mejor" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Mejora la calidad de tu sueño</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Duerme Mejor</h3>
                <Link href="/sleep" className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900/30 overflow-hidden">
            <div className="p-10 md:p-14 text-center">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                Agenda Una Cita
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Reserva una hora con un psicólogo</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto">
                Selecciona para qué día quieres tu sesión y en pocos pasos tendrás tu hora agendada.
              </p>
              
              <div className="flex justify-center space-x-3 mb-10 overflow-x-auto scrollbar-hide">
                {days.map((day, index) => (
                  <button 
                    key={index}
                    className={`flex flex-col items-center justify-center border border-purple-200 dark:border-purple-700 rounded-full w-14 h-14 hover:border-purple-500 dark:hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      index === 4 ? "bg-purple-100 dark:bg-purple-900/50 border-purple-500 dark:border-purple-500" : ""
                    }`}
                  >
                    <span className="text-purple-800 dark:text-purple-300 text-sm font-medium">{day}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{index < 7 ? "Mar" : "Abr"}</span>
                  </button>
                ))}
              </div>
              
              <Link 
                href="/book-appointment/1" 
                className="inline-flex items-center px-8 py-3.5 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium group"
              >
                <span>Agendar Ahora</span>
                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Únete a 100.000 personas que ya se están<br/>Terapiando con nosotros</h2>
          
          <div className="max-w-5xl mx-auto mt-12">
            <p className="mb-12 text-gray-600 dark:text-gray-400">Encuentra un psicólogo en <span className="font-semibold">terapia para la ansiedad</span>, <span className="font-semibold">terapia para la depresión</span>, <span className="font-semibold">terapia de parejas</span>, <span className="font-semibold">terapia de familia</span>, <span className="font-semibold">terapia infantil</span> y mucho más.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-800/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=SG" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-purple-100 dark:border-purple-900"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Sofía González</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Paciente de Ana Muller</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-left italic">
                  "Terapi me ha ayudado enormemente. Mi psicóloga me orientó en el logro de objetivos que realmente quería cumplir, me ayudó a ver una mirada diferente."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Testimonio verificado</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-800/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=RQ" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-purple-100 dark:border-purple-900"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Rodrigo Quiroga</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Paciente de Carla Farias</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-left italic">
                  "El apoyo me ha ayudado a ser más consciente de los pensamientos y actitudes que estaba evitando. Excelente experiencia."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Testimonio verificado</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-800/30 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=CF" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-purple-100 dark:border-purple-900"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Carla Farias</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Psicoterapeuta</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-left italic">
                  "Un ambiente comprensivo y hermoso. Aquí uno puede sentir libertad, sentir alegría, solucionar temas, la recomendaría de todas maneras."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Testimonio verificado</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-4 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-300 group">
              <Play className="w-10 h-10 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400 group-hover:fill-purple-700 dark:group-hover:fill-purple-300 transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900/30 p-10 md:p-14">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              Personalizado Para Ti
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">¿Te gustaría recibir una recomendación personalizada de terapeuta?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Regístrate y contesta unas preguntas, nuestro sistema de Inteligencia Artificial encontrará los terapeutas más adecuados para ti.
            </p>
            
            <Link 
              href="/sign-up" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors font-medium"
            >
              Regístrate para recibir recomendaciones
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
