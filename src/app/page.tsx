'use client';

import { useState, useEffect } from "react";
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
  Heart,
  ArrowRight,
  Brain,
  CreditCard,
  BellRing,
  Package,
  MessageSquare
} from "lucide-react";
import { createClient } from "../../supabase/client";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const days = [23, 24, 25, 26, 27, 28, 29, 30, 31, 1];

  return (
    <div className="min-h-screen bg-white dark:bg-[#161616]">
      <Navbar />
      <Hero />

      {/* IA Ecosystem Section */}
      <section className="py-20 bg-[#D7D7D6]/20 dark:bg-[#0E1920]/80">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] text-sm font-medium mb-4 natus-body">
              <Brain className="w-4 h-4 mr-2" />
              Inteligencia Artificial
            </div>
            <h2 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              La plataforma de psicología más completa de latinoamérica
            </h2>
            <p className="text-lg text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
              Terapi es la plataforma de psicología online más completa para cuidar tu bienestar en latinoamérica.<br/>
              Encuentra respuestas con nuestros psicólogos certificados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left column - User benefits */}
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">Usuario</h3>
              </div>
              
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body italic">
                "De la búsqueda a la transformación: Tu Esencia Convertida en Acción"
              </p>

              <ul className="space-y-6">
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Registro y configuración de viaje del usuario</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Ingreso de datos del usuario + carta astral + diseño humano + numerología + descripción de lo que busca en la aplicación.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        IA analiza y crea un mapa de bienestar. La IA te conoce desde el minuto 1.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Recomendaciones personalizadas</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        IA sugiere tipo de meditaciones, afirmaciones, ejercicios, disciplina, consejos, o terapeutas según búsqueda del usuario.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Parte la mañana con este sound healing o esta meditación para reducir tu ansiedad durante el día"
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Seguimiento y Evolución</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        IA envía recordatorios, ajusta recomendaciones y celebra tus logros.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        Tu crecimiento espiritual, monitoreado y potenciado por IA, siempre con el factor humano presente.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right column - Facilitator benefits */}
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">Facilitador</h3>
              </div>
              
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body italic">
                "De Terapeuta a Líder de Impacto Global: Así Escala Tu Misión"
              </p>

              <ul className="space-y-6">
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Gestión Simplificada</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Agenda integrada + pagos automáticos + recordatorios.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Olvídate del papeleo... enfócate en sanar."
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Monetización Flexible</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Sube todos tus productos y servicios: (sesiones, cursos, libros) en minutos.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Vende desde una sesión de Reiki hasta un retiro en Egipto."
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Crecimiento Inteligente</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        IA sugiere promociones, analiza tendencias, envía mensajes a clientes y te aconseja como mejorar.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Tu asistente para escalar tu misión, enfocandote en lo que sabes hacer."
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* IA Connection Example */}
          <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-[#142619]/10 to-[#0E1920]/10 dark:from-[#8A7D68]/20 dark:to-[#D7D7D6]/10 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                El Papel de la IA en Nuestro Ecosistema
              </h3>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 natus-body">
                Ejemplos de cómo nuestra IA conecta usuarios y facilitadores
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow">
                <p className="text-[#161616] dark:text-[#D7D7D6] mb-4 natus-body">
                  <span className="font-medium">AI detecta que un usuario con Mercurio en piscis necesita sanación emocional...</span> 
                  <br/>y le recomienda un taller de journaling con una terapeuta especializada en comunicación.
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#142619] dark:bg-[#8A7D68] flex items-center justify-center mr-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">IA Personalización + Emparejamiento</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#161616] p-6 rounded-lg shadow">
                <p className="text-[#161616] dark:text-[#D7D7D6] mb-4 natus-body">
                  <span className="font-medium">Si la IA detecta el interés de alguien por agendar una sesión 1:1 con un terapeuta,</span> 
                  <br/>genera link de agendamiento automático.
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#142619] dark:bg-[#8A7D68] flex items-center justify-center mr-2">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">IA Automatización + Conexión</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Una app con personalización + terapeutas + IA, genera un 40% más de retención 
                de usuarios que una app sin (solo un 15%)
              </p>
            </div>
          </div>

          {/* Statistic */}
          <div className="mt-16 text-center">
            <p className="text-lg text-[#6B6B6B] dark:text-[#D7D7D6] italic natus-body">
              El 85% de los facilitadores no logran dedicarse full-time a su práctica por falta de herramientas
              digitales para gestionar y promocionar su trabajo (Global Wellness Institute, 2023).
            </p>
            <Link 
              href="/for-facilitators"
              className="inline-flex items-center mt-6 px-6 py-3 text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 text-base font-medium natus-body"
            >
              Descubre cómo NATUS puede ayudarte
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#D7D7D6] dark:from-[#161616] dark:to-[#0E1920]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] rounded-full text-sm font-medium mb-4 natus-body">
              Por qué Terapi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#161616] dark:text-white natus-heading">La plataforma de psicología más completa de latinoamérica</h2>
            <p className="text-[#6B6B6B] dark:text-[#D7D7D6] max-w-3xl mx-auto natus-body">
              Terapi es la plataforma de psicología online más completa para cuidar tu bienestar en latinoamérica. Encuentra respuestas con nuestros psicólogos <span className="font-semibold">certificados</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 p-6 hover:shadow-lg dark:hover:shadow-[#0E1920]/40 transition-all duration-300">
              <div className="bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 p-3 rounded-lg inline-flex mb-5">
                <Users className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#161616] dark:text-white natus-heading">Terapeutas Certificados</h3>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Todos nuestros psicólogos están verificados y tienen amplia experiencia para ayudarte.</p>
            </div>
            
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 p-6 hover:shadow-lg dark:hover:shadow-[#0E1920]/40 transition-all duration-300">
              <div className="bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 p-3 rounded-lg inline-flex mb-5">
                <BrainCircuit className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#161616] dark:text-white natus-heading">Terapia Personalizada</h3>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Nuestro sistema de IA encuentra el terapeuta ideal para tus necesidades específicas.</p>
            </div>
            
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 p-6 hover:shadow-lg dark:hover:shadow-[#0E1920]/40 transition-all duration-300">
              <div className="bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 p-3 rounded-lg inline-flex mb-5">
                <Heart className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#161616] dark:text-white natus-heading">Bienestar Completo</h3>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Abordamos todos los aspectos de tu salud mental para un bienestar integral.</p>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <Link href="/dashboard" className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] hover:text-[#0E1920] dark:hover:text-[#D7D7D6] font-medium group natus-body">
              <span>Conoce más sobre nuestros servicios</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Therapy Types Section */}
      <section className="py-24 bg-white dark:bg-[#161616]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] rounded-full text-sm font-medium mb-4 natus-body">
              Terapias Especializadas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#161616] dark:text-white natus-heading">Soluciones para diversas necesidades</h2>
            <p className="text-[#6B6B6B] dark:text-[#D7D7D6] max-w-3xl mx-auto natus-body">
              Contamos con especialistas en diferentes áreas para brindarte la ayuda que necesitas, sin importar el desafío que enfrentes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/E6FFFA/333333?text=No+Más+Ansiedad" 
                  alt="Terapia para la ansiedad" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium natus-body">Técnicas efectivas para manejar la ansiedad</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-[#161616] dark:text-white natus-heading">No Más Ansiedad</h3>
                <Link href="/anxiety" className="flex items-center text-sm text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/F0E6FF/333333?text=Supera+Depresión" 
                  alt="Supera la depresión" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium natus-body">Apoyo profesional para superar la depresión</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-[#161616] dark:text-white natus-heading">Supera la Depresión</h3>
                <Link href="/depression" className="flex items-center text-sm text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/FFE6E6/333333?text=Mejora+Relación" 
                  alt="Mejora tu relación" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium natus-body">Herramientas para una relación más saludable</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-[#161616] dark:text-white natus-heading">Mejora tu Relación</h3>
                <Link href="/relationships" className="flex items-center text-sm text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image 
                  src="https://placehold.co/300x200/E6F0FF/333333?text=Duerme+Mejor" 
                  alt="Duerme mejor" 
                  width={300} 
                  height={200} 
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium natus-body">Mejora la calidad de tu sueño</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 text-[#161616] dark:text-white natus-heading">Duerme Mejor</h3>
                <Link href="/sleep" className="flex items-center text-sm text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                  <span>Conocer más</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-24 bg-[#D7D7D6] dark:bg-[#0E1920]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#161616] rounded-3xl shadow-xl dark:shadow-[#161616]/30 overflow-hidden">
            <div className="p-10 md:p-14 text-center">
              <span className="inline-block px-3 py-1 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] rounded-full text-sm font-medium mb-4 natus-body">
                Agenda Una Cita
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#161616] dark:text-white natus-heading">Reserva una hora con un psicólogo</h2>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-10 max-w-lg mx-auto natus-body">
                Selecciona para qué día quieres tu sesión y en pocos pasos tendrás tu hora agendada.
              </p>
              
              <div className="flex justify-center space-x-3 mb-10 overflow-x-auto scrollbar-hide">
                {days.map((day, index) => (
                  <button 
                    key={index}
                    className={`flex flex-col items-center justify-center border border-[#8A7D68]/20 dark:border-[#8A7D68]/30 rounded-full w-14 h-14 hover:border-[#142619] dark:hover:border-[#8A7D68] focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] focus:border-transparent transition-all ${
                      index === 4 ? "bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 border-[#142619] dark:border-[#8A7D68]" : ""
                    } natus-body`}
                  >
                    <span className="text-[#142619] dark:text-[#8A7D68] text-sm font-medium">{day}</span>
                    <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6]">{index < 7 ? "Mar" : "Abr"}</span>
                  </button>
                ))}
              </div>
              
              <Link 
                href="/book-appointment/1" 
                className="inline-flex items-center px-8 py-3.5 text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium group natus-body"
              >
                <span>Agendar Ahora</span>
                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-[#161616]">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] rounded-full text-sm font-medium mb-4 natus-body">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#161616] dark:text-white natus-heading">Únete a 100.000 personas que ya se están<br/>Terapiando con nosotros</h2>
          
          <div className="max-w-5xl mx-auto mt-12">
            <p className="mb-12 text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Encuentra un psicólogo en <span className="font-semibold">terapia para la ansiedad</span>, <span className="font-semibold">terapia para la depresión</span>, <span className="font-semibold">terapia de parejas</span>, <span className="font-semibold">terapia de familia</span>, <span className="font-semibold">terapia infantil</span> y mucho más.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#161616] p-8 rounded-xl shadow-md dark:shadow-[#0E1920]/30 border border-[#D7D7D6] dark:border-[#0E1920] hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=SG" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-[#8A7D68]/20 dark:border-[#8A7D68]/30"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-[#8A7D68] fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[#161616] dark:text-white natus-heading">Sofía González</p>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Paciente de Ana Muller</p>
                  </div>
                </div>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-left italic natus-body">
                  "Terapi me ha ayudado enormemente. Mi psicóloga me orientó en el logro de objetivos que realmente quería cumplir, me ayudó a ver una mirada diferente."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-[#142619] dark:text-[#8A7D68] mr-2" />
                  <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Testimonio verificado</span>
                </div>
          </div>

              <div className="bg-white dark:bg-[#161616] p-8 rounded-xl shadow-md dark:shadow-[#0E1920]/30 border border-[#D7D7D6] dark:border-[#0E1920] hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=RQ" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-[#8A7D68]/20 dark:border-[#8A7D68]/30"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-[#8A7D68] fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[#161616] dark:text-white natus-heading">Rodrigo Quiroga</p>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Paciente de Carla Farias</p>
                  </div>
                </div>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-left italic natus-body">
                  "El apoyo me ha ayudado a ser más consciente de los pensamientos y actitudes que estaba evitando. Excelente experiencia."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-[#142619] dark:text-[#8A7D68] mr-2" />
                  <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Testimonio verificado</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#161616] p-8 rounded-xl shadow-md dark:shadow-[#0E1920]/30 border border-[#D7D7D6] dark:border-[#0E1920] hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <Image 
                      src="https://placehold.co/50x50/9F7AEA/FFFFFF?text=CF" 
                      alt="Testimonial" 
                      width={50} 
                      height={50} 
                      className="rounded-full border-2 border-[#8A7D68]/20 dark:border-[#8A7D68]/30"
                    />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-[#8A7D68] fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[#161616] dark:text-white natus-heading">Carla Farias</p>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Psicoterapeuta</p>
                  </div>
            </div>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-left italic natus-body">
                  "Un ambiente comprensivo y hermoso. Aquí uno puede sentir libertad, sentir alegría, solucionar temas, la recomendaría de todas maneras."
                </p>
                <div className="mt-6 flex items-center">
                  <CheckCircle className="w-4 h-4 text-[#142619] dark:text-[#8A7D68] mr-2" />
                  <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Testimonio verificado</span>
                </div>
            </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button className="bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 rounded-full p-4 cursor-pointer hover:bg-[#8A7D68]/30 dark:hover:bg-[#8A7D68]/40 transition-all duration-300 group">
              <Play className="w-10 h-10 text-[#142619] dark:text-[#8A7D68] fill-[#142619] dark:fill-[#8A7D68] group-hover:fill-[#0E1920] dark:group-hover:fill-[#D7D7D6] transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#D7D7D6] dark:bg-[#0E1920] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#161616] rounded-3xl shadow-xl dark:shadow-[#161616]/30 p-10 md:p-14">
            <span className="inline-block px-3 py-1 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] rounded-full text-sm font-medium mb-4 natus-body">
              Personalizado Para Ti
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#161616] dark:text-white natus-heading">¿Te gustaría recibir una recomendación personalizada de terapeuta?</h2>
            <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-10 max-w-2xl mx-auto natus-body">
              Regístrate y contesta unas preguntas, nuestro sistema de Inteligencia Artificial encontrará los terapeutas más adecuados para ti.
            </p>
            
            <Link 
              href="/sign-up" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#142619] dark:border-[#8A7D68] text-[#142619] dark:text-[#8A7D68] bg-transparent hover:bg-[#8A7D68]/10 dark:hover:bg-[#8A7D68]/10 transition-colors font-medium natus-body"
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
