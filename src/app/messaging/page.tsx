import { redirect } from 'next/navigation';
import { createClient } from "../../../supabase/server";
import DashboardHeader from '@/components/dashboard-header';
import MessagingClient from '@/components/messaging-client';

export default async function MessagingPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mensajes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Comunícate con tus terapeutas y gestiona tus conversaciones
          </p>
        </div>
        
        <MessagingClient 
          userId={user.id}
          conversations={conversations}
        />
      </main>
    </div>
  );
} 