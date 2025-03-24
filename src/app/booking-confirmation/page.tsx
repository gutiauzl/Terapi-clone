import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, ArrowRight, CheckCircle, Download } from "lucide-react";

export default function BookingConfirmation() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Image 
              src="https://placehold.co/120x40/8B5CF6/FFFFFF?text=Terapi" 
              alt="Terapi" 
              width={120} 
              height={40} 
              className="h-8 w-auto" 
            />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
            <div className="bg-green-100 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Reserva confirmada!</h1>
            <p className="text-gray-600 mb-6">
              Tu sesión con la Dra. Ana Muller ha sido agendada exitosamente.
            </p>
            <div className="w-24 h-1 bg-purple-200 mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Detalles de la cita</h2>
            
            <div className="space-y-4">
              <div className="flex items-start py-3 border-b border-gray-100">
                <Image 
                  src="https://placehold.co/200x200/9F7AEA/FFFFFF?text=AM" 
                  alt="Dra. Ana Muller" 
                  width={60} 
                  height={60} 
                  className="rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-800">Dra. Ana Muller</h3>
                  <p className="text-gray-600 text-sm">Psicóloga Clínica</p>
                </div>
              </div>
              
              <div className="flex items-center py-3 border-b border-gray-100">
                <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Miércoles, 27 de Marzo de 2024</h3>
                </div>
              </div>
              
              <div className="flex items-center py-3 border-b border-gray-100">
                <Clock className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">16:00 - 16:45 (45 minutos)</h3>
                </div>
              </div>
              
              <div className="flex items-center py-3 border-b border-gray-100">
                <Video className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Sesión por videollamada</h3>
                  <p className="text-sm text-gray-600">Recibirás un enlace por correo electrónico 10 minutos antes de la sesión</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Información importante</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Política de cancelación</h3>
                <p className="text-sm text-gray-600">Puedes cancelar o reprogramar hasta 24 horas antes de la sesión sin cargo. Cancelaciones posteriores incurrirán en un cargo del 50%.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Preparación para la sesión</h3>
                <p className="text-sm text-gray-600">Asegúrate de tener una conexión estable a internet y estar en un lugar tranquilo y privado para tu sesión. Recomendamos usar auriculares.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Recordatorio</h3>
                <p className="text-sm text-gray-600">Recibirás un recordatorio por correo electrónico y SMS 24 horas antes de tu cita.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Añadir a calendario
            </Button>
            <Link 
              href="/dashboard"
              className="inline-flex justify-center items-center px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Ir al dashboard 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 