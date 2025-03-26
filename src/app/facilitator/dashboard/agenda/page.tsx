'use client';

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Filter, 
  Search,
  ArrowLeft
} from "lucide-react";

export default function FacilitatorAgenda() {
  // Datos de ejemplo para el mes actual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Nombre del mes actual
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const currentMonthName = monthNames[currentMonth];
  
  // Días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  
  // Citas de ejemplo
  const appointments = [
    {
      id: 1,
      patientName: "Ana Silva",
      date: "2023-04-15",
      time: "10:00",
      duration: 60,
      service: "Terapia individual",
      status: "confirmed",
      paid: true,
    },
    {
      id: 2,
      patientName: "Carlos Mendoza",
      date: "2023-04-15",
      time: "12:00",
      duration: 45,
      service: "Primera consulta",
      status: "confirmed",
      paid: false,
    },
    {
      id: 3,
      patientName: "María González",
      date: "2023-04-15",
      time: "15:30",
      duration: 60,
      service: "Terapia individual",
      status: "confirmed",
      paid: true,
    },
    {
      id: 4,
      patientName: "Luis Rodríguez",
      date: "2023-04-16",
      time: "09:00",
      duration: 90,
      service: "Evaluación psicológica",
      status: "confirmed",
      paid: true,
    },
    {
      id: 5,
      patientName: "Diana Torres",
      date: "2023-04-16",
      time: "11:00",
      duration: 60,
      service: "Terapia individual",
      status: "confirmed",
      paid: true,
    },
    {
      id: 6,
      patientName: "Roberto Pérez",
      date: "2023-04-17",
      time: "14:00",
      duration: 60,
      service: "Seguimiento",
      status: "pending",
      paid: false,
    },
  ];

  // Generar días del mes para el calendario
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    let day = new Date(year, month, 1).getDay();
    // Convert to Mon-Sun format (0 for Monday, 6 for Sunday)
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Crear array para el calendario
  const calendarDays = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Filtrar citas para la fecha seleccionada (usamos el 15 como ejemplo)
  const selectedDate = "2023-04-15";
  const filteredAppointments = appointments.filter(appointment => appointment.date === selectedDate);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
            Agenda de citas
          </h1>
          <div className="mt-4 md:mt-0">
            <Link
              href="/facilitator/dashboard/agenda/create"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-full hover:shadow-lg transition-all duration-300 text-sm font-medium natus-body"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Nueva cita
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar and appointments grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Column */}
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">
              {currentMonthName} {currentYear}
            </h2>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20">
                <ChevronLeft className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
              </button>
              <button className="p-1 rounded-full hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20">
                <ChevronRight className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Weekday headers */}
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className="text-center text-sm py-2 text-[#6B6B6B] dark:text-[#D7D7D6] font-medium natus-body"
              >
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`
                  text-center py-2 text-sm rounded-full
                  ${day === 15 ? 'bg-[#142619] dark:bg-[#8A7D68] text-white' : 'hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20'}
                  ${day ? 'cursor-pointer text-[#161616] dark:text-[#D7D7D6]' : 'text-transparent'}
                  natus-body
                `}
              >
                {day}
                {/* Show dot if there are appointments on this day */}
                {day && appointments.some(app => app.date === `2023-04-${day < 10 ? '0' + day : day}`) && day !== 15 && (
                  <div className="h-1 w-1 bg-[#142619] dark:bg-[#8A7D68] rounded-full mx-auto mt-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* Appointment stats */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Esta semana</p>
                <p className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">12 citas</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Horas reservadas</p>
                <p className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">16 horas</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Pacientes atendidos</p>
                <p className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">8 pacientes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date header */}
          <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              15 de Abril, 2023
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar citas o pacientes"
                  className="pl-10 w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition natus-body">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </button>
            </div>
          </div>

          {/* Appointments list */}
          <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              Citas programadas
            </h3>
            
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="border border-[#D7D7D6] dark:border-[#0E1920] rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start mb-4 sm:mb-0">
                      <div className="w-12 h-12 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center mr-4">
                        <span className="font-medium text-[#142619] dark:text-[#8A7D68] natus-body">
                          {appointment.patientName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[#161616] dark:text-[#D7D7D6] font-medium natus-body">
                          {appointment.patientName}
                        </h4>
                        <p className="text-[#6B6B6B] dark:text-[#D7D7D6]/70 text-sm natus-body">
                          {appointment.service}
                        </p>
                        <div className="flex flex-wrap items-center mt-2">
                          <span className="inline-flex items-center text-[#6B6B6B] dark:text-[#D7D7D6]/70 text-xs mr-3 natus-body">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time} ({appointment.duration} min)
                          </span>
                          <span className={`inline-flex items-center text-xs rounded-full px-2 py-0.5 ${appointment.paid ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'} natus-body`}>
                            {appointment.paid ? 'Pagado' : 'Pendiente de pago'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm rounded-full bg-[#142619] text-white hover:bg-[#142619]/90 dark:bg-[#8A7D68] dark:hover:bg-[#8A7D68]/90 transition natus-body">
                        Iniciar
                      </button>
                      <button className="px-3 py-1 text-sm rounded-full border border-[#D7D7D6] dark:border-[#0E1920] text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition natus-body">
                        Reprogramar
                      </button>
                      <button className="px-3 py-1 text-sm rounded-full border border-[#D7D7D6] dark:border-[#0E1920] text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition natus-body">
                        Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-[#D7D7D6] dark:text-[#0E1920] mx-auto mb-4" />
                <h4 className="text-lg font-medium text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">
                  No hay citas programadas
                </h4>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6]/70 max-w-md mx-auto natus-body">
                  No tienes citas programadas para esta fecha. Puedes crear una nueva cita haciendo clic en el botón de arriba.
                </p>
              </div>
            )}
          </div>

          {/* Time slots */}
          <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
              Horarios disponibles
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"].map((time, index) => {
                // Check if the time slot is booked
                const isBooked = filteredAppointments.some(app => app.time === time);
                
                return (
                  <div 
                    key={index} 
                    className={`
                      text-center py-2 rounded-md border 
                      ${isBooked 
                        ? 'border-[#D7D7D6] dark:border-[#0E1920] bg-[#D7D7D6]/20 dark:bg-[#0E1920]/20 text-[#6B6B6B] dark:text-[#D7D7D6]/50 cursor-not-allowed' 
                        : 'border-[#142619] dark:border-[#8A7D68] text-[#142619] dark:text-[#8A7D68] hover:bg-[#142619]/10 dark:hover:bg-[#8A7D68]/10 cursor-pointer'
                      }
                      text-sm font-medium natus-body
                    `}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 