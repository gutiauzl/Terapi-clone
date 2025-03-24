'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  MessageSquare, 
  Calendar as CalendarComponent, 
  Check, 
  Clock4, 
  Search, 
  Filter,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Appointment {
  id: string;
  therapistName: string;
  specialty: string;
  date: Date;
  duration: number;
  type: string;
  status: string;
  imageUrl: string;
}

interface AppointmentsClientProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  user: any;
}

export default function AppointmentsClient({ 
  upcomingAppointments, 
  pastAppointments, 
  user 
}: AppointmentsClientProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'calendar'>('upcoming');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // Formatear fecha y hora
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const formatTimeOnly = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const formatDateOnly = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Filtrar citas por búsqueda
  const filterAppointments = (appointments: Appointment[]) => {
    if (!searchQuery) return appointments;
    
    return appointments.filter(
      app => app.therapistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             app.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
             app.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredUpcomingAppointments = filterAppointments(upcomingAppointments);
  const filteredPastAppointments = filterAppointments(pastAppointments);

  // Obtener días del mes actual para el calendario
  const getCalendarDays = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    
    // Primer día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    // Último día del mes
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Determinar el primer día a mostrar (puede ser del mes anterior)
    const firstDayToShow = new Date(firstDayOfMonth);
    firstDayToShow.setDate(firstDayToShow.getDate() - firstDayToShow.getDay());
    
    // Determinar el último día a mostrar (puede ser del mes siguiente)
    const lastDayToShow = new Date(lastDayOfMonth);
    const remainingDays = 6 - lastDayToShow.getDay();
    lastDayToShow.setDate(lastDayToShow.getDate() + remainingDays);
    
    const days = [];
    const currentDay = new Date(firstDayToShow);
    
    while (currentDay <= lastDayToShow) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  // Comprobar si hay una cita en una fecha específica
  const getAppointmentsForDay = (day: Date) => {
    return [...upcomingAppointments, ...pastAppointments].filter(app => {
      return app.date.getDate() === day.getDate() &&
             app.date.getMonth() === day.getMonth() &&
             app.date.getFullYear() === day.getFullYear();
    });
  };

  // Comprobar si un día es hoy
  const isToday = (day: Date) => {
    const today = new Date();
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  };

  // Comprobar si un día es del mes actual
  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === selectedMonth.getMonth();
  };

  // Función para navegar al mes anterior o siguiente
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(selectedMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setSelectedMonth(newMonth);
  };

  // Obtener nombre del mes y año
  const getMonthYearString = () => {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      year: 'numeric'
    }).format(selectedMonth);
  };

  // Obtener el estado de una cita con su color y texto
  const getAppointmentStatus = (status: string) => {
    switch(status) {
      case 'confirmada':
        return {
          color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
          text: 'Confirmada'
        };
      case 'pendiente':
        return {
          color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
          icon: <AlertCircle className="w-4 h-4 mr-1" />,
          text: 'Pendiente'
        };
      case 'cancelada':
        return {
          color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
          icon: <XCircle className="w-4 h-4 mr-1" />,
          text: 'Cancelada'
        };
      case 'completada':
        return {
          color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
          icon: <Check className="w-4 h-4 mr-1" />,
          text: 'Completada'
        };
      default:
        return {
          color: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800',
          icon: <Clock4 className="w-4 h-4 mr-1" />,
          text: status
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Citas</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona tus sesiones de terapia pasadas y futuras
          </p>
        </div>
        
        <Link 
          href="/book-appointment"
          className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Agendar nueva cita
        </Link>
      </div>

      {/* Tabs y búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
            <div className="flex space-x-1 mb-4 sm:mb-0">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Próximas citas
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'past'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Citas pasadas
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Calendario
              </button>
            </div>
            
            <div className="flex w-full sm:w-auto">
              <div className="relative flex-1 sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar citas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-9 pr-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-r-lg">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          {/* View toggle (only visible for non-calendar views) */}
          {activeTab !== 'calendar' && (
            <div className="flex justify-end px-4 pb-3">
              <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex space-x-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded ${
                    view === 'grid' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded ${
                    view === 'list' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Upcoming Appointments */}
          {activeTab === 'upcoming' && (
            <div>
              {filteredUpcomingAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tienes citas próximas</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Agenda una cita con uno de nuestros terapeutas.
                  </p>
                  <Link
                    href="/therapist-matches"
                    className="inline-flex items-center text-purple-600 dark:text-purple-400"
                  >
                    Ver terapeutas recomendados
                  </Link>
                </div>
              ) : (
                view === 'list' ? (
                  <div className="space-y-4">
                    {filteredUpcomingAppointments.map((appointment) => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl"
                      >
                        <div className="flex items-start mb-4 md:mb-0">
                          <div className="relative mr-4">
                            <Image 
                              src={appointment.imageUrl} 
                              alt={appointment.therapistName} 
                              width={60} 
                              height={60} 
                              className="rounded-full border-2 border-white dark:border-gray-700 shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-gray-700"></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{appointment.therapistName}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getAppointmentStatus(appointment.status).color}`}>
                                {getAppointmentStatus(appointment.status).icon}
                                {getAppointmentStatus(appointment.status).text}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-center mb-4 md:mb-0">
                          <div className="flex items-center mb-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateOnly(appointment.date)}</span>
                          </div>
                          <div className="flex items-center mb-1">
                            <Clock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatTimeOnly(appointment.date)} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center">
                            {appointment.type === 'videollamada' ? (
                              <Video className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Link 
                            href={`/appointments/${appointment.id}`}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Detalles
                          </Link>
                          <Link 
                            href={`/messaging/${appointment.id}`}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 mr-1" />
                            Mensaje
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUpcomingAppointments.map((appointment) => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start mb-4">
                          <Image 
                            src={appointment.imageUrl} 
                            alt={appointment.therapistName} 
                            width={50} 
                            height={50} 
                            className="rounded-full border-2 border-white dark:border-gray-700 shadow-md mr-3"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{appointment.therapistName}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 mb-4">
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateOnly(appointment.date)}</span>
                          </div>
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatTimeOnly(appointment.date)} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              {appointment.type === 'videollamada' ? (
                                <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              ) : (
                                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getAppointmentStatus(appointment.status).color}`}>
                            {getAppointmentStatus(appointment.status).icon}
                            {getAppointmentStatus(appointment.status).text}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                          <Link 
                            href={`/appointments/${appointment.id}`}
                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Detalles
                          </Link>
                          <Link 
                            href={`/messaging/${appointment.id}`}
                            className="flex-1 inline-flex items-center justify-center px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}

          {/* Past Appointments */}
          {activeTab === 'past' && (
            <div>
              {filteredPastAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tienes citas pasadas</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Aquí verás el historial de tus sesiones de terapia.
                  </p>
                </div>
              ) : (
                view === 'list' ? (
                  <div className="space-y-4">
                    {filteredPastAppointments.map((appointment) => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-start mb-4 md:mb-0">
                          <Image 
                            src={appointment.imageUrl} 
                            alt={appointment.therapistName} 
                            width={60} 
                            height={60} 
                            className="rounded-full border-2 border-white dark:border-gray-700 shadow-md mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{appointment.therapistName}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getAppointmentStatus(appointment.status).color}`}>
                                {getAppointmentStatus(appointment.status).icon}
                                {getAppointmentStatus(appointment.status).text}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-center mb-4 md:mb-0">
                          <div className="flex items-center mb-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateOnly(appointment.date)}</span>
                          </div>
                          <div className="flex items-center mb-1">
                            <Clock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatTimeOnly(appointment.date)} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center">
                            {appointment.type === 'videollamada' ? (
                              <Video className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <Link 
                            href={`/appointments/${appointment.id}`}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            Ver detalles
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPastAppointments.map((appointment) => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col p-5 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-start mb-4">
                          <Image 
                            src={appointment.imageUrl} 
                            alt={appointment.therapistName} 
                            width={50} 
                            height={50} 
                            className="rounded-full border-2 border-white dark:border-gray-700 shadow-md mr-3"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{appointment.therapistName}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 mb-4">
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateOnly(appointment.date)}</span>
                          </div>
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatTimeOnly(appointment.date)} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex">
                            <div className="w-9 flex-shrink-0 flex justify-center">
                              {appointment.type === 'videollamada' ? (
                                <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              ) : (
                                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getAppointmentStatus(appointment.status).color}`}>
                            {getAppointmentStatus(appointment.status).icon}
                            {getAppointmentStatus(appointment.status).text}
                          </span>
                        </div>
                        
                        <div className="flex justify-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                          <Link 
                            href={`/appointments/${appointment.id}`}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            Ver detalles
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}

          {/* Calendar View */}
          {activeTab === 'calendar' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                  {getMonthYearString()}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-gray-500 dark:text-gray-400 py-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getCalendarDays().map((day, index) => {
                  const dayAppointments = getAppointmentsForDay(day);
                  const hasAppointment = dayAppointments.length > 0;
                  
                  return (
                    <div 
                      key={index}
                      className={`
                        relative h-24 p-1 border rounded-lg transition-colors cursor-pointer hover:border-purple-400 dark:hover:border-purple-500
                        ${isCurrentMonth(day) ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'}
                        ${isToday(day) ? 'border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''}
                      `}
                    >
                      <div className="text-right mb-1">
                        <span className={`
                          text-sm inline-block rounded-full w-6 h-6 text-center leading-6
                          ${isToday(day) ? 'bg-purple-600 text-white' : isCurrentMonth(day) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}
                        `}>
                          {day.getDate()}
                        </span>
                      </div>
                      
                      <div className="overflow-y-auto max-h-14 scrollbar-thin text-xs">
                        {dayAppointments.slice(0, 2).map((app, i) => (
                          <Link href={`/appointments/${app.id}`} key={i}>
                            <div className="mb-1 p-1 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 truncate">
                              {formatTimeOnly(app.date)} • {app.therapistName.split(' ')[0]}
                            </div>
                          </Link>
                        ))}
                        {dayAppointments.length > 2 && (
                          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                            +{dayAppointments.length - 2} más
                          </div>
                        )}
                      </div>
                      
                      {hasAppointment && (
                        <div className="absolute bottom-1 right-1 w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 