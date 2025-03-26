'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  User, 
  ArrowRight,
  BarChart4, 
  Heart, 
  Brain, 
  BookOpen, 
  Play,
  Download,
  Star,
  PlusCircle,
  MessageSquare
} from "lucide-react";

interface Appointment {
  id: string;
  therapistName: string;
  date: Date;
  imageUrl: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  duration?: string;
  imageUrl: string;
}

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  price: string;
}

interface DashboardWidgetsProps {
  nextAppointment?: Appointment;
  resources: Resource[];
  recommendedTherapists: Therapist[];
  completedSessions: number;
  totalMood: number;
  userName: string;
}

export default function DashboardWidgets({
  nextAppointment,
  resources,
  recommendedTherapists,
  completedSessions,
  totalMood,
  userName
}: DashboardWidgetsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Welcome and Summary */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
        <div className="p-6 relative">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/10 rounded-full opacity-70"></div>
          
          <div className="relative">
            <h2 className="text-xl font-bold text-[#161616] dark:text-white mb-2 natus-heading">
              ¡Bienvenido de nuevo, {userName || 'Usuario'}!
            </h2>
            <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-4 natus-body">
              Has completado {completedSessions} sesiones y tu bienestar ha mejorado un {totalMood}% desde que comenzaste.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-[#8A7D68]/10 dark:bg-[#8A7D68]/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 rounded-lg">
                    <Calendar className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <span className="text-xl font-bold text-[#142619] dark:text-[#8A7D68] natus-heading">{completedSessions}</span>
                </div>
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Sesiones</p>
              </div>
              
              <div className="bg-[#D7D7D6]/30 dark:bg-[#0E1920]/30 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-[#D7D7D6]/50 dark:bg-[#0E1920]/50 rounded-lg">
                    <BarChart4 className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <span className="text-xl font-bold text-[#142619] dark:text-[#8A7D68] natus-heading">{totalMood}%</span>
                </div>
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Mejora</p>
              </div>
              
              <div className="bg-[#8A7D68]/10 dark:bg-[#8A7D68]/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 rounded-lg">
                    <Heart className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <span className="text-xl font-bold text-[#142619] dark:text-[#8A7D68] natus-heading">92%</span>
                </div>
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Bienestar</p>
              </div>
              
              <div className="bg-[#D7D7D6]/30 dark:bg-[#0E1920]/30 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-[#D7D7D6]/50 dark:bg-[#0E1920]/50 rounded-lg">
                    <Brain className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <span className="text-xl font-bold text-[#142619] dark:text-[#8A7D68] natus-heading">4</span>
                </div>
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Ejercicios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Appointment */}
      {nextAppointment ? (
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
          <div className="border-b border-[#D7D7D6] dark:border-[#0E1920] px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#161616] dark:text-white natus-heading">Tu próxima cita</h2>
            <Link href="/appointments" className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body">
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            <div className="flex items-center">
              <div className="relative mr-4">
                <Image 
                  src={nextAppointment.imageUrl} 
                  alt={nextAppointment.therapistName} 
                  width={60} 
                  height={60} 
                  className="rounded-full border-2 border-white dark:border-[#161616] shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#142619] dark:bg-[#8A7D68] p-1 rounded-full border-2 border-white dark:border-[#161616]"></div>
              </div>
              <div>
                <h3 className="font-medium text-[#161616] dark:text-white natus-heading">{nextAppointment.therapistName}</h3>
                <div className="flex items-center text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(nextAppointment.date)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link 
                href={`/appointments/${nextAppointment.id}`}
                className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-lg transition-all duration-300 natus-body"
              >
                Ver detalles
              </Link>
              <Link 
                href={`/messaging/${nextAppointment.id}`}
                className="flex items-center justify-center px-4 py-2 bg-[#D7D7D6]/30 dark:bg-[#0E1920]/30 text-[#161616] dark:text-[#D7D7D6] rounded-lg hover:bg-[#D7D7D6]/50 dark:hover:bg-[#0E1920]/50 transition-colors natus-body"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensaje
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
          <div className="px-6 py-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-[#6B6B6B] dark:text-[#D7D7D6] mb-4" />
            <h2 className="text-lg font-bold text-[#161616] dark:text-white mb-2 natus-heading">No tienes citas próximas</h2>
            <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body">Agenda una sesión con un terapeuta para empezar</p>
            <Link 
              href="/book-appointment"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-lg transition-all duration-300 natus-body"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Agendar una cita
            </Link>
          </div>
        </div>
      )}

      {/* Resources */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
        <div className="border-b border-[#D7D7D6] dark:border-[#0E1920] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#161616] dark:text-white natus-heading">Recursos recomendados</h2>
          <Link href="/resources" className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <Link href={`/resources/${resource.id}`} key={resource.id} className="group">
                <div className="flex bg-[#D7D7D6]/20 dark:bg-[#0E1920]/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 relative">
                    <Image 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      fill
                      className="object-cover"
                    />
                    {resource.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#161616]/30 group-hover:bg-[#161616]/40 transition-colors">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    )}
                    {resource.type === 'pdf' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#161616]/30 group-hover:bg-[#161616]/40 transition-colors">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#161616] dark:text-white group-hover:text-[#142619] dark:group-hover:text-[#8A7D68] transition-colors natus-heading">
                      {resource.title}
                    </h3>
                    <div className="flex items-center text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">
                      {resource.type === 'video' && <Clock className="h-3.5 w-3.5 mr-1" />}
                      {resource.type === 'pdf' && <BookOpen className="h-3.5 w-3.5 mr-1" />}
                      <span>
                        {resource.type === 'video' ? resource.duration : 'Artículo'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Therapists */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
        <div className="border-b border-[#D7D7D6] dark:border-[#0E1920] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#161616] dark:text-white natus-heading">Terapeutas recomendados</h2>
          <Link href="/therapists" className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {recommendedTherapists.map((therapist) => (
              <div key={therapist.id} className="flex items-center justify-between border-b border-[#D7D7D6] dark:border-[#0E1920] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <Image 
                    src={therapist.imageUrl} 
                    alt={therapist.name} 
                    width={50} 
                    height={50} 
                    className="rounded-full border-2 border-white dark:border-[#161616] shadow-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-[#161616] dark:text-white natus-heading">{therapist.name}</h3>
                    <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{therapist.specialty}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(therapist.rating) 
                              ? "text-[#8A7D68] fill-[#8A7D68]" 
                              : "text-[#D7D7D6] dark:text-[#0E1920]"
                          }`} 
                        />
                      ))}
                      <span className="ml-1 text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{therapist.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#161616] dark:text-white natus-heading">{therapist.price}</p>
                  <Link 
                    href={`/therapists/${therapist.id}`}
                    className="inline-flex items-center text-sm text-[#142619] dark:text-[#8A7D68] hover:underline mt-1 natus-body"
                  >
                    Ver perfil
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/mood-tracker" className="bg-gradient-to-br from-[#142619] to-[#0E1920] text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <BarChart4 className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium natus-body">Registrar estado de ánimo</span>
        </Link>
        
        <Link href="/book-appointment" className="bg-gradient-to-br from-[#8A7D68] to-[#142619] text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <Calendar className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium natus-body">Agendar cita</span>
        </Link>
        
        <Link href="/exercises" className="bg-gradient-to-br from-[#0E1920] to-[#161616] text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <Brain className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium natus-body">Ejercicios diarios</span>
        </Link>
        
        <Link href="/profile" className="bg-gradient-to-br from-[#161616] to-[#8A7D68] text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <User className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium natus-body">Mi perfil</span>
        </Link>
      </div>
    </div>
  );
} 