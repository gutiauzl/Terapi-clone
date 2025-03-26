'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard-header";
import DashboardWidgets from "@/components/dashboard-widgets";
import QuestionnaireWrapper from "@/components/questionnaire-wrapper";
import { createClient } from "../../../supabase/client";
import { User } from "@supabase/supabase-js";

// Create a single supabase client instance
const supabase = createClient();

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking regular dashboard access...");
        
        // Verificar si hay una sesión activa
        const { data } = await supabase.auth.getSession();
        console.log("Session check result:", data.session ? "Session found" : "No session");
        
        if (!data.session) {
          console.log("No session found - redirecting to sign-in");
          localStorage.removeItem('auth_redirecting');
          window.location.href = "/sign-in";
          return;
        }
        
        // Obtener detalles del usuario desde la sesión actual
        const userData = { user: data.session.user };
        console.log("User data from session:", userData.user.email);
        
        // Verificar el tipo de usuario en metadata
        const userType = userData.user.user_metadata?.user_type;
        console.log("User type from metadata:", userType);
        
        // Redirigir al facilitador a su dashboard específico y denegar acceso
        if (userType === 'facilitador' || userType === 'facilitator') {
          console.log("User is a facilitator - access to client dashboard denied");
          alert("Su cuenta es de facilitador. Redirigiendo al portal de facilitadores.");
          // Redirigir al dashboard del facilitador
          window.location.href = "/facilitator/dashboard";
          return;
        }
        
        // Garantizar que cualquier flag de facilitador se elimine 
        localStorage.removeItem('is_facilitator');
        
        // Establecer datos del usuario para el dashboard del cliente
        setUser(userData.user);
        setLoading(false);
      } catch (error) {
        console.error("Error checking user session:", error);
        localStorage.removeItem('auth_redirecting');
        window.location.href = "/sign-in";
      }
    };
    
    checkUser();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#D7D7D6]/20 dark:bg-[#161616] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#142619] dark:border-t-[#8A7D68] border-[#D7D7D6]/30 dark:border-[#161616]/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Cargando panel de usuario...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar el dashboard
  if (!user) return null;

  // Sample data for dashboard widgets
  const nextAppointment = {
    id: "upcoming-1",
    therapistName: "Dra. Ana Muller",
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    imageUrl: "https://placehold.co/200x200/9F7AEA/FFFFFF?text=AM"
  };

  const resources = [
    {
      id: "1",
      title: "Técnicas de respiración para calmar la ansiedad",
      type: "video",
      duration: "5 min",
      imageUrl: "https://placehold.co/300x200/E6FFFA/333333?text=Ansiedad"
    },
    {
      id: "2",
      title: "Guía para mejorar la calidad del sueño",
      type: "pdf",
      imageUrl: "https://placehold.co/300x200/E6F0FF/333333?text=Sueño"
    },
    {
      id: "3",
      title: "Meditación guiada para reducir el estrés",
      type: "video",
      duration: "10 min",
      imageUrl: "https://placehold.co/300x200/F0E6FF/333333?text=Meditación"
    },
    {
      id: "4",
      title: "Técnicas de comunicación asertiva",
      type: "pdf",
      imageUrl: "https://placehold.co/300x200/FFE6E6/333333?text=Comunicación"
    }
  ];

  const recommendedTherapists = [
    {
      id: "1",
      name: "Dra. Ana Muller",
      specialty: "Psicóloga Clínica • Ansiedad, Depresión",
      rating: 4.9,
      imageUrl: "https://placehold.co/200x200/9F7AEA/FFFFFF?text=AM",
      price: "$40.000 / sesión"
    },
    {
      id: "2",
      name: "Carla Farias",
      specialty: "Psicóloga Infantil • Problemas de Aprendizaje",
      rating: 4.7,
      imageUrl: "https://placehold.co/200x200/9F7AEA/FFFFFF?text=CF",
      price: "$35.000 / sesión"
    },
    {
      id: "3",
      name: "Dr. Juan Perez",
      specialty: "Psicólogo Clínico • Terapia de Pareja",
      rating: 4.8,
      imageUrl: "https://placehold.co/200x200/9F7AEA/FFFFFF?text=JP",
      price: "$42.000 / sesión"
    }
  ];

  return (
    <div className="min-h-screen bg-[#D7D7D6]/20 dark:bg-[#161616]">
      <DashboardHeader user={user} />
      
      {/* Questionnaire for new users */}
      <QuestionnaireWrapper />

      <main className="container mx-auto px-4 py-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Widgets */}
          <DashboardWidgets 
            nextAppointment={nextAppointment}
            resources={resources}
            recommendedTherapists={recommendedTherapists}
            completedSessions={12}
            totalMood={65}
            userName={user.email?.split('@')[0] || 'Usuario'}
          />
        </div>
      </main>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
}
