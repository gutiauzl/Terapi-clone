import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowUpRight, ArrowRight, Calendar, CreditCard, FileText, BellRing, Package, Store, Star, Check, CheckCircle, MessageSquare, Globe, ChartBar, Users, Brain } from "lucide-react";

const features = [
  {
    title: "Agenda online",
    description: "Ya sea que te agenden online o que lleves la agenda tú mismo, nuestra plataforma añadirá un toque de profesionalismo que encantará a tus pacientes y clientes.",
    icon: <Calendar className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#agenda"
  },
  {
    title: "Pagos online",
    description: "Olvídate de cobrar, nuestro sistema lo hace por ti. Aceptamos todos los medios de pago.",
    icon: <CreditCard className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#pagos"
  },
  {
    title: "Boletas electrónicas",
    description: "Ahorra horas de trabajo dejando que las boletas se emitan automáticamente.",
    icon: <FileText className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#boletas"
  },
  {
    title: "Recordatorios automáticos",
    description: "Dile adiós al 'me olvidé' y acostúmbrate al 'ya te agendé'.",
    icon: <BellRing className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#recordatorios"
  },
  {
    title: "Paquetes de sesiones",
    description: "Genera un compromiso. Ofrece varias sesiones a un precio especial.",
    icon: <Package className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#paquetes"
  },
  {
    title: "Vitrina de eventos y contenido digital",
    description: "Tienes tu propia tienda online. Empieza a vender eventos, talleres, eBooks y más.",
    icon: <Store className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#vitrina"
  },
  {
    title: "Evaluaciones",
    description: "Crea confianza y acumula experiencias, las reseñas hablarán por ti.",
    icon: <Star className="w-8 h-8 text-[#142619] dark:text-[#8A7D68]" />,
    link: "#evaluaciones"
  }
];

export default function ForFacilitators() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#161616]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#D7D7D6]/20 dark:from-[#161616] dark:to-[#0E1920]/20 pt-32 pb-16">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 top-0 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] text-sm font-medium mb-4 natus-body">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Para Facilitadores
            </div>
            <div className="mx-auto text-center max-w-4xl mb-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#161616] dark:text-[#D7D7D6] mb-6 natus-heading">
                De Terapeuta a Líder de Impacto Global:
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#142619] to-[#0E1920] dark:from-[#8A7D68] dark:to-[#D7D7D6]"> Así Escala Tu Misión</span>
              </h1>
              <p className="text-lg md:text-xl text-[#6B6B6B] dark:text-[#D7D7D6] max-w-3xl mx-auto mb-8 natus-body">
                Natus IA Assistant potencia tu práctica con tecnología adaptativa, 
                automatización inteligente y herramientas que escalan tu impacto mientras 
                te concentras en lo que mejor sabes hacer: acompañar y transformar vidas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-white dark:bg-[#161616]/80 shadow-lg rounded-xl p-6 border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <h3 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">Gestión Simplificada</h3>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  Agenda inteligente, pagos automatizados y recordatorios personalizados en un solo lugar.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#161616]/80 shadow-lg rounded-xl p-6 border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <h3 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">Monetización Flexible</h3>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  Vende sesiones individuales, talleres, cursos, productos digitales y servicios premium sin complicaciones.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#161616]/80 shadow-lg rounded-xl p-6 border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <h3 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">Crecimiento Inteligente</h3>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  IA que analiza tendencias, sugiere promociones y te aconseja cómo mejorar tu oferta de servicios.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                href="/facilitator/register" 
                className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 text-base font-medium natus-body"
              >
                Únete como Facilitador
                <Star className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/facilitator/login" 
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-[#161616] border border-[#D7D7D6] dark:border-[#2F2F2F] text-[#161616] dark:text-[#D7D7D6] rounded-full hover:shadow-lg transition-all duration-300 text-base font-medium natus-body"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#D7D7D6]/20 dark:bg-[#0E1920]/80">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] text-sm font-medium mb-4 natus-body">
              <Brain className="w-4 h-4 mr-2" />
              Potenciado por IA
            </div>
            <h2 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              Cómo Natus IA Assistant Transforma tu Práctica
            </h2>
            <p className="text-lg text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
              Nuestra tecnología adaptativa trabaja para ti, automatizando tareas y aumentando tu impacto
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-[#161616] dark:text-[#D7D7D6] mb-8 natus-heading">
                El 85% de los facilitadores no logran dedicarse full-time a su práctica por falta de herramientas digitales
              </h3>

              <ul className="space-y-6">
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Agenda Inteligente + Sistema de Reservas</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Gestiona tu disponibilidad con facilidad. Tus clientes reservan directo de tu calendario, múltiples zonas horarias, sin conflictos.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Olvidate del papeleo. Enfócate en sanar."
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
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Pagos Automáticos + Facturación Electrónica</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Cobra por tus servicios sin complicaciones. Gestiona facturas, seguimiento de pagos y recordatorios automáticos.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Recibe pagos mientras duermes, facturas que cumplen con la normativa."
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
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Marketing Personalizado por IA</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        La IA analiza perfiles de usuarios y recomienda tus servicios a quienes realmente los necesitan, basado en su carta astral, diseño humano y necesidades.
                      </p>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 italic natus-body">
                        "Crea conexiones auténticas con quienes más necesitan tu trabajo."
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-8 shadow-lg border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">Escalando Tu Impacto Global</h3>
              </div>
              
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body italic">
                "Vende desde una sesión de Reiki hasta un retiro en Egipto."
              </p>

              <ul className="space-y-6">
                <li>
                  <div className="flex items-start">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Múltiples Productos y Servicios</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Crea, gestiona y vende una variedad de ofertas: sesiones 1:1, talleres grupales, cursos online, 
                        productos digitales y eventos especiales.
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
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Analítica Impulsada por IA</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Visualiza tendencias de ingresos, servicios más populares, horarios de mayor demanda 
                        y recomendaciones automáticas para optimizar tu oferta.
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
                      <h4 className="font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-heading">Comunidad y Conexiones</h4>
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Únete a una red de facilitadores afines, comparte conocimientos, colabora en eventos 
                        y amplía tu alcance a través de referencias cruzadas.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-6 text-center shadow-md border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
              <h4 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">+40%</h4>
              <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Mayor retención de usuarios con IA personalizada
              </p>
            </div>
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-6 text-center shadow-md border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
              <h4 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">+65%</h4>
              <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Incremento en ingresos para facilitadores
              </p>
            </div>
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-6 text-center shadow-md border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
              <h4 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">-80%</h4>
              <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Reducción en tareas administrativas
              </p>
            </div>
            <div className="bg-white dark:bg-[#161616]/80 rounded-xl p-6 text-center shadow-md border border-[#D7D7D6]/50 dark:border-[#2F2F2F]/50">
              <h4 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">+200</h4>
              <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Facilitadores que escalan su práctica con Natus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-[#161616]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              Transforma Tu Práctica con Natus IA Assistant
            </h2>
            <p className="text-lg text-[#6B6B6B] dark:text-[#D7D7D6] mb-8 natus-body">
              Únete a la revolución del bienestar espiritual. Crea tu perfil de facilitador y comienza a escalar tu impacto global.
            </p>
            <Link 
              href="/facilitator/register" 
              className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium natus-body"
            >
              Únete como Facilitador
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 