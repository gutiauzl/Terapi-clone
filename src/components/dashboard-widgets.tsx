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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
        <div className="p-6 relative">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-70"></div>
          
          <div className="relative">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bienvenido de nuevo, {userName || 'Usuario'}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Has completado {completedSessions} sesiones y tu bienestar ha mejorado un {totalMood}% desde que comenzaste.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-300">{completedSessions}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sesiones</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-300">{totalMood}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mejora</p>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-pink-100 dark:bg-pink-800 rounded-lg">
                    <Heart className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                  </div>
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-300">92%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bienestar</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                    <Brain className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <span className="text-xl font-bold text-yellow-600 dark:text-yellow-300">4</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ejercicios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Appointment */}
      {nextAppointment ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tu próxima cita</h2>
            <Link href="/appointments" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center">
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
                  className="rounded-full border-2 border-white dark:border-gray-700 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-gray-700"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{nextAppointment.therapistName}</h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(nextAppointment.date)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link 
                href={`/appointments/${nextAppointment.id}`}
                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Ver detalles
              </Link>
              <Link 
                href={`/messaging/${nextAppointment.id}`}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensaje
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
          <div className="px-6 py-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No tienes citas próximas</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Agenda una sesión con un terapeuta para empezar</p>
            <Link 
              href="/book-appointment"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Agendar una cita
            </Link>
          </div>
        </div>
      )}

      {/* Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recursos recomendados</h2>
          <Link href="/resources" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <Link href={`/resources/${resource.id}`} key={resource.id} className="group">
                <div className="flex bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 relative">
                    <Image 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      fill
                      className="object-cover"
                    />
                    {resource.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    )}
                    {resource.type === 'pdf' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {resource.title}
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Terapeutas recomendados</h2>
          <Link href="/therapists" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {recommendedTherapists.map((therapist) => (
              <div key={therapist.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <Image 
                    src={therapist.imageUrl} 
                    alt={therapist.name} 
                    width={50} 
                    height={50} 
                    className="rounded-full border-2 border-white dark:border-gray-700 shadow-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{therapist.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{therapist.specialty}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(therapist.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300 dark:text-gray-600"
                          }`} 
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{therapist.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{therapist.price}</p>
                  <Link 
                    href={`/therapists/${therapist.id}`}
                    className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline mt-1"
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
        <Link href="/mood-tracker" className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <BarChart4 className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Registrar estado de ánimo</span>
        </Link>
        
        <Link href="/book-appointment" className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <Calendar className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Agendar cita</span>
        </Link>
        
        <Link href="/exercises" className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <Brain className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Ejercicios diarios</span>
        </Link>
        
        <Link href="/profile" className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow text-center">
          <User className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Mi perfil</span>
        </Link>
      </div>
    </div>
  );
} 