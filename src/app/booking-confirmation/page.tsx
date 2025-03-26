'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Video, AlertCircle, CalendarPlus, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookingConfirmation() {
  const router = useRouter();

  // Esta información vendría de la base de datos en una implementación real
  const appointment = {
    therapist: {
      name: "Dra. María González",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      specialty: "Psicóloga Clínica"
    },
    date: "Jueves, 20 de Julio de 2023",
    time: "15:30",
    duration: "50 minutos",
    type: "Videollamada",
    cost: "$45.000"
  };

  // Función para agregar al calendario
  const addToCalendar = () => {
    alert("Funcionalidad de agregar al calendario implementada en versión producción");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0E1920] pt-8 pb-16">
      <div className="container mx-auto px-4">
        <header className="flex justify-center mb-8">
          <Link href="/" className="flex items-center">
            <Image 
              src="/natus-logo.svg" 
              alt="Natus Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto" 
            />
          </Link>
        </header>

        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#161616]/30 overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-[#D7D7D6]/20 dark:border-[#161616]/50">
            <div className="flex items-center justify-center bg-[#142619]/10 dark:bg-[#8A7D68]/20 p-3 rounded-full w-14 h-14 mx-auto mb-4">
              <Calendar className="h-8 w-8 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <h1 className="text-2xl font-bold text-center text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">¡Tu cita ha sido agendada!</h1>
            <p className="text-center text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body">
              Hemos enviado un correo de confirmación con todos los detalles a tu email registrado
            </p>

            <div className="bg-[#142619]/5 dark:bg-[#8A7D68]/10 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="relative mr-4">
                  <Image 
                    src={appointment.therapist.image} 
                    alt={appointment.therapist.name} 
                    width={60} 
                    height={60} 
                    className="rounded-full border-2 border-white dark:border-[#161616]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-[#161616]"></div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">{appointment.therapist.name}</h2>
                  <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{appointment.therapist.specialty}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Fecha</p>
                    <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{appointment.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Hora</p>
                    <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{appointment.time} ({appointment.duration})</p>
                  </div>
                </div>

                <div className="flex items-start">
                  {appointment.type === "Videollamada" ? (
                    <Video className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <MapPin className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Tipo de sesión</p>
                    <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{appointment.type}</p>
                    {appointment.type === "Videollamada" && (
                      <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">
                        Recibirás un enlace 15 minutos antes de la sesión
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Información importante</h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-md">
                <div className="flex">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-200 font-medium natus-heading">Política de cancelación</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1 natus-body">
                      Puedes cancelar hasta 24 horas antes sin costo. Cancelaciones posteriores tendrán un cargo del 50%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Prepárate para tu sesión</h3>
              <ul className="space-y-2 text-[#6B6B6B] dark:text-[#D7D7D6] list-disc list-inside pl-1 natus-body">
                <li>Busca un lugar tranquilo y privado para tu sesión</li>
                <li>Asegúrate de tener una buena conexión a internet</li>
                <li>Ten papel y lápiz a mano para tomar notas</li>
                <li>Piensa con antelación en los temas que quieres abordar</li>
              </ul>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#F5F5F5] dark:bg-[#0E1920]/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={addToCalendar}
                className="flex justify-center items-center px-4 py-3 bg-white dark:bg-[#161616] border border-[#D7D7D6] dark:border-[#161616] text-[#161616] dark:text-[#D7D7D6] rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#0E1920] transition-colors natus-body"
              >
                <CalendarPlus className="h-5 w-5 mr-2" />
                Agregar a calendario
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex justify-center items-center px-4 py-3 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow natus-body"
              >
                <Home className="h-5 w-5 mr-2" />
                Ir al dashboard
              </button>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
} 