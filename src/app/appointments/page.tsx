import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from "../../../supabase/server";
import DashboardHeader from '@/components/dashboard-header';
import AppointmentsClient from '@/components/appointments-client';

export default async function AppointmentsPage() {
  // Obtener el cliente de Supabase
  const supabase = await createClient();
  
  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  // Si no hay usuario autenticado, redirigir a inicio de sesión
  if (!user) {
    redirect('/sign-in');
  }

  // Datos de ejemplo para citas (en una aplicación real, estos vendrían de la base de datos)
  const upcomingAppointments = [
    {
      id: '1',
      therapistName: 'Dra. María González',
      specialty: 'Psicóloga Clínica',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana
      duration: 60,
      type: 'videollamada',
      status: 'confirmada',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      therapistName: 'Dr. Alejandro Montero',
      specialty: 'Psiquiatra',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // En 3 días
      duration: 45,
      type: 'presencial',
      status: 'pendiente',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '3',
      therapistName: 'Dra. Laura Jiménez',
      specialty: 'Terapeuta Familiar',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // En una semana
      duration: 90,
      type: 'videollamada',
      status: 'confirmada',
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  const pastAppointments = [
    {
      id: '4',
      therapistName: 'Dr. Carlos Vega',
      specialty: 'Psicólogo Cognitivo',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Hace 5 días
      duration: 60,
      type: 'videollamada',
      status: 'completada',
      imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    {
      id: '5',
      therapistName: 'Dra. Sofía López',
      specialty: 'Psicoterapeuta',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // Hace 12 días
      duration: 45,
      type: 'presencial',
      status: 'completada',
      imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    {
      id: '6',
      therapistName: 'Dr. José Martínez',
      specialty: 'Psicólogo Clínico',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Hace 20 días
      duration: 60,
      type: 'videollamada',
      status: 'cancelada',
      imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <AppointmentsClient 
          upcomingAppointments={upcomingAppointments}
          pastAppointments={pastAppointments}
          user={user}
        />
      </main>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
} 