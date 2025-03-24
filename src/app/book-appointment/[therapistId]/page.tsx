'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

// Sample therapist data (in a real app, this would be fetched based on therapistId)
const therapist = {
  id: "1",
  name: "Dra. Ana Muller",
  specialty: "Psicóloga Clínica",
  image: "https://placehold.co/200x200/9F7AEA/FFFFFF?text=AM",
  rating: 4.9,
  reviews: 124,
  price: "$45.000",
  sessionLength: "50 minutos",
};

export default function BookAppointment({ params }: { params: { therapistId: string } }) {
  // In a real app, you would fetch therapist data using the therapistId
  const therapistId = params.therapistId;
  
  // Sample time slots data
  const days = [
    { day: "Lunes", date: "25 Mar", available: true },
    { day: "Martes", date: "26 Mar", available: true },
    { day: "Miércoles", date: "27 Mar", available: true },
    { day: "Jueves", date: "28 Mar", available: true },
    { day: "Viernes", date: "29 Mar", available: true },
    { day: "Sábado", date: "30 Mar", available: true },
    { day: "Domingo", date: "31 Mar", available: true }
  ];

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
    { time: "18:00", available: true }
  ];

  const [selectedDay, setSelectedDay] = useState(2); // Default to Wednesday (index 2)
  const [selectedTime, setSelectedTime] = useState(5); // Default to 16:00 (index 5)
  const [sessionType, setSessionType] = useState("videollamada"); // Default to videollamada

  // Format the selected date and time for the summary section
  const formattedDate = days[selectedDay].day + ", " + days[selectedDay].date;
  const formattedTime = timeSlots[selectedTime].time + " - " + 
    (parseInt(timeSlots[selectedTime].time.split(':')[0]) + 1) + ":00";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="https://placehold.co/120x40/8B5CF6/FFFFFF?text=Terapi" 
              alt="Terapi"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <Link href="/therapist-matches" className="text-purple-600 font-medium flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a resultados
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pt-24 pb-16">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Image 
                src={therapist.image} 
                alt={therapist.name} 
                width={60} 
                height={60} 
                className="rounded-lg mr-4"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{therapist.name}</h1>
                <p className="text-gray-600">{therapist.specialty}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">Precio por sesión</p>
              <p className="text-xl font-bold text-gray-800">{therapist.price}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6" id="days-section">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Selecciona un día</h2>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      index === selectedDay 
                        ? "bg-purple-100 border-2 border-purple-600 text-purple-800" 
                        : "bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    <div className="text-sm font-medium">{day.day}</div>
                    <div className="text-xs">{day.date}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6" id="time-section">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Selecciona una hora</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(index)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      index === selectedTime 
                        ? "bg-purple-100 border-2 border-purple-600 text-purple-800" 
                        : "bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6" id="session-type-section">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Tipo de sesión</h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSessionType("videollamada")}
                  className={`p-4 rounded-lg flex items-center justify-center ${
                    sessionType === "videollamada" 
                      ? "bg-purple-100 border-2 border-purple-600" 
                      : "bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  <Video className={`w-5 h-5 mr-2 ${sessionType === "videollamada" ? "text-purple-600" : "text-gray-500"}`} />
                  <span className={`font-medium ${sessionType === "videollamada" ? "text-purple-800" : "text-gray-500"}`}>
                    Videollamada
                  </span>
                </button>
                <button 
                  onClick={() => setSessionType("presencial")}
                  className={`p-4 rounded-lg flex items-center justify-center ${
                    sessionType === "presencial" 
                      ? "bg-purple-100 border-2 border-purple-600" 
                      : "bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  <span className={`font-medium ${sessionType === "presencial" ? "text-purple-800" : "text-gray-500"}`}>
                    Presencial
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen de la reserva</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">{formattedDate}</span>
                  </div>
                  <button 
                    className="text-xs text-purple-600"
                    onClick={() => document.getElementById('days-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Cambiar
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">{formattedTime}</span>
                  </div>
                  <button 
                    className="text-xs text-purple-600"
                    onClick={() => document.getElementById('time-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Cambiar
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <Video className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">
                      Sesión por {sessionType === "videollamada" ? "videollamada" : "presencial"}
                    </span>
                  </div>
                  <button 
                    className="text-xs text-purple-600"
                    onClick={() => document.getElementById('session-type-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Cambiar
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100 mb-6">
                <span className="text-sm font-bold text-gray-700">Total</span>
                <span className="text-lg font-bold text-purple-700">{therapist.price}</span>
              </div>
              
              <Link 
                href="/booking-confirmation"
                className="w-full inline-flex justify-center items-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Confirmar reserva
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Al confirmar, aceptas nuestros términos de servicio y políticas de cancelación.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 