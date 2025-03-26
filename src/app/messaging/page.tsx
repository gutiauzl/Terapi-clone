'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "../../../supabase/client";
import DashboardHeader from '@/components/dashboard-header';
import MessagingClient from '@/components/messaging-client';
import { User } from '@supabase/supabase-js';

export default function MessagingPage() {
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
          console.log("No session found in messaging page");
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

  // Datos de ejemplo para conversaciones (en una aplicación real, estos vendrían de la base de datos)
  const conversations = [
    {
      id: '1',
      participantId: 'therapist1',
      participantName: 'Dra. María González',
      participantImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: {
        content: 'Recuerda practicar los ejercicios que te envié antes de nuestra próxima sesión.',
        timestamp: new Date(Date.now() - 3600000), // 1 hora atrás
        isRead: true,
      },
      isOnline: true,
      unreadCount: 0,
    },
    {
      id: '2',
      participantId: 'therapist2',
      participantName: 'Dr. Alejandro Montero',
      participantImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: {
        content: 'Hola, tengo disponibilidad para tu consulta el viernes a las 15:00h. ¿Te vendría bien?',
        timestamp: new Date(Date.now() - 86400000), // 1 día atrás
        isRead: false,
      },
      isOnline: false,
      unreadCount: 2,
    },
    {
      id: '3',
      participantId: 'therapist3',
      participantName: 'Dra. Laura Jiménez',
      participantImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastMessage: {
        content: 'Gracias por compartir tus avances. Estoy muy orgullosa de tu progreso.',
        timestamp: new Date(Date.now() - 7 * 86400000), // 7 días atrás
        isRead: true,
      },
      isOnline: false,
      unreadCount: 0,
    },
    {
      id: '4',
      participantId: 'therapist4',
      participantName: 'Dr. Carlos Vega',
      participantImage: 'https://randomuser.me/api/portraits/men/52.jpg',
      lastMessage: {
        content: 'Te he enviado algunos recursos adicionales que pueden ayudarte con la meditación.',
        timestamp: new Date(Date.now() - 10 * 86400000), // 10 días atrás
        isRead: true,
      },
      isOnline: true,
      unreadCount: 0,
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">Mensajes</h1>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">
            Comunícate con tus terapeutas y gestiona tus conversaciones
          </p>
        </div>
        
        <MessagingClient 
          userId={user?.id || ''}
          conversations={conversations}
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