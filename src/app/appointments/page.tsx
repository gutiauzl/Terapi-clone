'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "../../../supabase/client";
import DashboardHeader from '@/components/dashboard-header';
import AppointmentsClient from '@/components/appointments-client';
import { User } from '@supabase/supabase-js';

export default function AppointmentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        
        // Verificar si hay una sesión activa
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found in appointments page");
          router.push('/sign-in');
          return;
        }
        
        // Obtener los datos del usuario
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error checking user session:', error);
        router.push('/sign-in');
      }
    };
    
    checkUser();
  }, [router]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0E1920] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#142619] dark:border-t-[#8A7D68] border-[#D7D7D6]/30 dark:border-[#161616]/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D7D7D6]/20 dark:bg-[#161616]">
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
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
} 