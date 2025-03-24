import DashboardHeader from "@/components/dashboard-header";
import DashboardWidgets from "@/components/dashboard-widgets";
import QuestionnaireWrapper from "@/components/questionnaire-wrapper";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
}
