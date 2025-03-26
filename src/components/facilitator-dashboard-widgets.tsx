import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  FileText,
  BellRing,
  Package,
  Store,
  ArrowUpRight,
  ChevronRight,
  Star,
  PlusCircle,
  ArrowRight,
  Banknote,
  TicketCheck,
  TrendingUp,
  Megaphone,
  BadgeCheck,
  FilePlus,
  Clipboard,
  Settings,
  Mail,
  LogOut,
  Lightbulb,
  MessageSquare,
  User
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface FacilitatorDashboardProps {
  user: SupabaseUser;
}

export function FacilitatorDashboardWidgets({ user }: FacilitatorDashboardProps) {
  // Obtener algunos datos del usuario para personalizar
  const facilitatorName = user.user_metadata?.name || user.email?.split('@')[0] || 'Facilitador';
  
  // Datos de ejemplo
  const facilitator = {
    name: "Dr. Juan Pérez",
    profession: "Psicólogo",
    patientCount: 24,
    todayAppointments: 3,
    pendingPayments: 2,
    monthlyEarnings: 450000,
    earningsGrowth: 12.5,
    profileCompletion: 85,
    positiveReviews: 92,
  };

  // Próximas citas
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Ana Silva",
      date: "2023-04-15",
      time: "10:00",
      service: "Terapia individual",
      status: "confirmed",
      paid: true,
    },
    {
      id: 2,
      patientName: "Carlos Mendoza",
      date: "2023-04-15",
      time: "12:00",
      service: "Primera consulta",
      status: "confirmed",
      paid: false,
    },
    {
      id: 3,
      patientName: "María González",
      date: "2023-04-15",
      time: "15:30",
      service: "Terapia individual",
      status: "confirmed",
      paid: true,
    },
  ];

  // Pagos recientes
  const recentPayments = [
    {
      id: 1,
      patientName: "Luis Ramírez",
      amount: 45000,
      date: "2023-04-12",
      service: "Terapia individual",
      method: "Tarjeta de crédito",
    },
    {
      id: 2,
      patientName: "Diana Torres",
      amount: 60000,
      date: "2023-04-10",
      service: "Paquete 3 sesiones",
      method: "Transferencia",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">Bienvenido, {facilitatorName}</h1>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">
            Gestiona tus actividades, pagos y pacientes desde aquí
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] rounded-full">
            <BellRing className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] rounded-full">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] rounded-full">
            <Mail className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] rounded-full">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Ingresos Totales</p>
              <h3 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] mt-1 natus-heading">$560.000</h3>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center mt-1 natus-body">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% este mes
              </p>
            </div>
            <div className="p-3 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
              <CreditCard className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Pacientes Activos</p>
              <h3 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] mt-1 natus-heading">24</h3>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center mt-1 natus-body">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 nuevos
              </p>
            </div>
            <div className="p-3 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
              <Users className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Sesiones Completadas</p>
              <h3 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] mt-1 natus-heading">132</h3>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-xs flex items-center mt-1 natus-body">
                12 esta semana
              </p>
            </div>
            <div className="p-3 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
              <Clipboard className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Valoración Media</p>
              <h3 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] mt-1 natus-heading">4.9</h3>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500" fill="#EAB308" />
                ))}
              </div>
            </div>
            <div className="p-3 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
              <Star className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming appointments */}
        <div className="lg:col-span-2 bg-white dark:bg-[#161616] rounded-xl shadow-sm">
          <div className="p-6 border-b border-[#D7D7D6] dark:border-[#0E1920]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                Próximas Citas
              </h2>
              <Link 
                href="/facilitator/dashboard/agenda"
                className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body"
              >
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            {[
              {
                patientName: "Marina González",
                date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
                type: "Terapia Individual",
                duration: 60,
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                patientName: "Carlos Vega",
                date: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
                type: "Evaluación Psicológica",
                duration: 90,
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                patientName: "Ana Martínez",
                date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                type: "Terapia Familiar",
                duration: 120,
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((appointment, idx) => (
              <div 
                key={idx} 
                className={`flex items-start py-4 ${idx !== 2 ? 'border-b border-[#D7D7D6]/50 dark:border-[#0E1920]/50' : ''}`}
              >
                <Image 
                  src={appointment.image} 
                  alt={appointment.patientName} 
                  width={48} 
                  height={48} 
                  className="rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                    {appointment.patientName}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-[#142619] dark:text-[#8A7D68] font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm natus-body">
                      {appointment.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center text-[#6B6B6B] dark:text-[#D7D7D6] mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm natus-body">
                      {appointment.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      {' • '}{appointment.duration} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ideas para tu práctica (reemplazando la sección de "Acceso Rápido") */}
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm">
          <div className="p-6 border-b border-[#D7D7D6] dark:border-[#0E1920]">
            <h2 className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
              Ideas IA para tu Práctica
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] text-sm natus-heading">
                    Tus Horarios Más Solicitados
                  </h3>
                  <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">
                    Los pacientes prefieren agendar citas después de las 17:00. Considere añadir más disponibilidad en esas horas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] text-sm natus-heading">
                    Pacientes Inactivos
                  </h3>
                  <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">
                    5 pacientes no han reservado citas en los últimos 30 días. Podría enviarles un mensaje personalizado.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] text-sm natus-heading">
                    Oportunidad de Taller Grupal
                  </h3>
                  <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">
                    8 de tus pacientes están trabajando temas de ansiedad. Considera ofrecer un taller grupal sobre técnicas de manejo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Insights & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm">
          <div className="p-6 border-b border-[#D7D7D6] dark:border-[#0E1920]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                Mensajes Recientes
              </h2>
              <Link 
                href="/facilitator/dashboard/messages"
                className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body"
              >
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  name: "Marina González",
                  message: "Gracias por la sesión de ayer, me sentí mucho mejor después de hablar...",
                  time: "10:30 AM",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  unread: true
                },
                {
                  name: "Roberto Silva",
                  message: "¿Podríamos cambiar mi cita del jueves para el viernes a la misma hora?",
                  time: "Ayer",
                  image: "https://randomuser.me/api/portraits/men/45.jpg",
                  unread: false
                },
                {
                  name: "Laura Jiménez",
                  message: "He estado practicando las técnicas que me recomendó y...",
                  time: "Lun",
                  image: "https://randomuser.me/api/portraits/women/63.jpg",
                  unread: false
                }
              ].map((message, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start p-3 ${message.unread ? 'bg-[#142619]/5 dark:bg-[#8A7D68]/10' : ''} rounded-lg hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/20 transition-colors cursor-pointer`}
                >
                  <div className="relative">
                    <Image 
                      src={message.image} 
                      alt={message.name} 
                      width={40} 
                      height={40} 
                      className="rounded-full mr-3 object-cover"
                    />
                    {message.unread && (
                      <span className="absolute -right-1 -top-1 w-3 h-3 bg-[#142619] dark:bg-[#8A7D68] rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] truncate natus-heading">
                        {message.name}
                      </h3>
                      <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] truncate natus-body">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                <Link 
                  href="/facilitator/dashboard/messages"
                  className="flex items-center text-[#142619] dark:text-[#8A7D68] hover:underline text-sm natus-body"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Ir a mensajes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 