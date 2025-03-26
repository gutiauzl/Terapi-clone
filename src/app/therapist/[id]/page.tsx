'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle, 
  Video, 
  MessageSquare, 
  MapPin,
  ChevronLeft,
  FileText,
  Award,
  Globe,
  Mail,
  Heart,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

// Datos de muestra para terapeutas (en una aplicación real, esto vendría de una base de datos)
const therapists = [
  {
    id: "1",
    name: "Dra. María González",
    specialty: "Psicóloga Clínica",
    expertise: ["Depresión", "Ansiedad", "Estrés", "Duelo", "Trastornos del sueño"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 124,
    availability: "Hoy",
    price: "$45.000",
    match: 98,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Especialista en terapia cognitivo-conductual con 8 años de experiencia tratando problemas de ansiedad y depresión. Mi enfoque se centra en proporcionar un espacio seguro donde puedas explorar tus pensamientos y emociones, desarrollando estrategias efectivas para gestionar el estrés y mejorar tu bienestar general.",
    education: [
      "Doctorado en Psicología Clínica, Universidad de Chile",
      "Máster en Terapia Cognitivo-Conductual, Universidad Católica"
    ],
    experience: [
      "Centro de Salud Mental Santiago (2018-presente)",
      "Hospital Clínico Universidad de Chile (2015-2018)",
      "Práctica privada (2015-presente)"
    ],
    topics: ["Ansiedad", "Depresión", "Autoestima", "Estrés", "Duelo"],
    languages: ["Español", "Inglés"],
    location: "Santiago Centro",
    nextAvailable: {
      date: "Hoy",
      slots: ["15:00", "17:30", "18:45"]
    },
    testimonials: [
      {
        id: "t1",
        name: "Carolina M.",
        text: "La Dra. González me ha ayudado enormemente a manejar mi ansiedad. Su enfoque es muy práctico y realmente se nota que le importan sus pacientes.",
        rating: 5
      },
      {
        id: "t2",
        name: "Roberto P.",
        text: "Excelente profesional. Me ha dado herramientas muy útiles para gestionar situaciones de estrés en mi trabajo. Totalmente recomendable.",
        rating: 5
      },
      {
        id: "t3",
        name: "Andrea L.",
        text: "He notado una gran mejora en mi estado de ánimo desde que comencé la terapia. La doctora es muy empática y sabe escuchar.",
        rating: 4
      }
    ]
  },
  {
    id: "2",
    name: "Dr. Alejandro Montero",
    specialty: "Psiquiatra",
    expertise: ["Trastornos del sueño", "Depresión", "TDAH", "Trastornos de ansiedad"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 87,
    availability: "Mañana",
    price: "$50.000",
    match: 95,
    sessionTypes: ["videollamada"],
    bio: "Psiquiatra especializado en trastornos del estado de ánimo y del sueño. Enfoque integral combinando terapia y farmacología cuando es necesario. Mi objetivo es ayudar a mis pacientes a comprender la raíz de sus dificultades y desarrollar estrategias efectivas para recuperar el equilibrio emocional y mejorar su calidad de vida.",
    education: [
      "Especialidad en Psiquiatría, Universidad de Chile",
      "Médico Cirujano, Universidad de Santiago"
    ],
    experience: [
      "Clínica Las Condes (2019-presente)",
      "Hospital Salvador (2016-2019)",
      "Instituto Psiquiátrico Dr. José Horwitz Barak (2014-2016)"
    ],
    topics: ["Trastornos del sueño", "Depresión", "TDAH", "Ansiedad", "Fobias"],
    languages: ["Español"],
    location: "Providencia",
    nextAvailable: {
      date: "Mañana",
      slots: ["10:30", "12:00", "16:15"]
    },
    testimonials: [
      {
        id: "t1",
        name: "Fernando S.",
        text: "El Dr. Montero ha sido fundamental en mi tratamiento. Su enfoque combinando terapia y medicación ha sido muy efectivo.",
        rating: 5
      },
      {
        id: "t2",
        name: "Valentina R.",
        text: "Excelente profesional, muy completo en su diagnóstico y tratamiento. Mi insomnio ha mejorado notablemente.",
        rating: 5
      },
      {
        id: "t3",
        name: "Mauricio T.",
        text: "Gran profesional. Me explicó claramente mi condición y las opciones de tratamiento. La medicación que me recetó ha sido muy efectiva.",
        rating: 4
      }
    ]
  },
  {
    id: "3",
    name: "Dra. Laura Jiménez",
    specialty: "Terapeuta Familiar",
    expertise: ["Relaciones de pareja", "Crianza", "Comunicación", "Conflictos familiares"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviews: 56,
    availability: "Jueves",
    price: "$48.000",
    match: 92,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Con más de 10 años de experiencia en terapia familiar y de parejas, utilizando técnicas modernas y efectivas para mejorar la comunicación. Mi especialidad es trabajar con familias y parejas para resolver conflictos, mejorar la comunicación y fortalecer los vínculos emocionales, creando un ambiente seguro donde todos los miembros se sientan escuchados y valorados.",
    education: [
      "Máster en Terapia Familiar Sistémica, Universidad de Barcelona",
      "Licenciatura en Psicología, Universidad Mayor"
    ],
    experience: [
      "Centro de Terapia Familiar (2017-presente)",
      "Fundación para la Familia (2013-2017)",
      "Consultorio privado (2011-presente)"
    ],
    topics: ["Terapia de Parejas", "Comunicación", "Resolución de conflictos", "Crianza", "Divorcio"],
    languages: ["Español", "Portugués"],
    location: "Las Condes",
    nextAvailable: {
      date: "Jueves",
      slots: ["14:00", "16:30", "18:00"]
    },
    testimonials: [
      {
        id: "t1",
        name: "Javier y Carla",
        text: "La Dra. Jiménez nos ha ayudado enormemente a mejorar nuestra comunicación como pareja. Ahora podemos resolver conflictos de manera mucho más constructiva.",
        rating: 5
      },
      {
        id: "t2",
        name: "Familia Rodríguez",
        text: "Excelente terapeuta. Ha sabido guiarnos en momentos difíciles y nos ha dado herramientas muy útiles para comunicarnos mejor como familia.",
        rating: 4
      },
      {
        id: "t3",
        name: "Ana G.",
        text: "Muy profesional y empática. Sus sesiones nos han ayudado a entender mejor a nuestros hijos adolescentes y mejorar la dinámica familiar.",
        rating: 5
      }
    ]
  },
  {
    id: "4",
    name: "Dr. Carlos Vega",
    specialty: "Psicólogo Cognitivo",
    expertise: ["Fobias", "Trastornos de ansiedad", "Estrés post-traumático", "Traumas"],
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.6,
    reviews: 42,
    availability: "Viernes",
    price: "$42.000",
    match: 88,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Especialista en terapias para trastornos de ansiedad y fobias específicas, utilizando técnicas de exposición y reestructuración cognitiva. Me enfoco en ayudar a mis pacientes a superar sus miedos y desarrollar estrategias efectivas para manejar la ansiedad, utilizando un enfoque basado en la evidencia científica y adaptado a las necesidades particulares de cada persona.",
    education: [
      "Doctorado en Psicología Clínica, Universidad Autónoma de Madrid",
      "Licenciatura en Psicología, Universidad de Concepción"
    ],
    experience: [
      "Centro de Ansiedad y Estrés (2016-presente)",
      "Hospital de Carabineros (2013-2016)",
      "Consultorio privado (2012-presente)"
    ],
    topics: ["Fobias", "Ansiedad", "Trauma", "Ataques de pánico", "TOC"],
    languages: ["Español", "Inglés"],
    location: "Ñuñoa",
    nextAvailable: {
      date: "Viernes",
      slots: ["09:00", "11:30", "15:45"]
    },
    testimonials: [
      {
        id: "t1",
        name: "Daniela M.",
        text: "El Dr. Vega me ha ayudado a superar mi fobia a volar. Después de años de intentarlo, finalmente pude tomar un avión sin sentir pánico.",
        rating: 5
      },
      {
        id: "t2",
        name: "Luis F.",
        text: "Gran profesional. Su terapia me ha ayudado mucho con mi trastorno de ansiedad social. Ahora puedo participar en reuniones sin sentir ese miedo paralizante.",
        rating: 4
      },
      {
        id: "t3",
        name: "Camila S.",
        text: "Excelente psicólogo. Me ha dado herramientas muy útiles para manejar mis ataques de pánico. Su enfoque es muy práctico y efectivo.",
        rating: 5
      }
    ]
  }
];

export default function TherapistProfile() {
  const params = useParams();
  const router = useRouter();
  const [therapist, setTherapist] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    if (params.id) {
      // En una aplicación real, aquí harías una llamada a la API
      const foundTherapist = therapists.find(t => t.id === params.id);
      setTherapist(foundTherapist);
      setLoading(false);
    }
  }, [params.id]);

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  const handleBookAppointment = () => {
    if (!selectedTimeSlot) {
      alert('Por favor selecciona un horario antes de agendar.');
      return;
    }
    
    // En una implementación real, aquí harías una llamada a la API
    console.log(`Reservando cita con ${therapist.name} para el horario ${selectedTimeSlot}`);
    
    // Redirige a la página de confirmación
    router.push('/booking-confirmation');
  };

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

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0E1920] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-[#161616] rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Terapeuta no encontrado</h2>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-4 natus-body">El perfil que buscas no está disponible o ha sido eliminado.</p>
          <Link href="/therapist-matches" className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] font-medium hover:underline natus-body">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver a terapeutas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0E1920]">
      <header className="bg-white dark:bg-[#161616] border-b border-[#D7D7D6]/20 dark:border-[#161616]/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/therapist-matches" className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] font-medium natus-body">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Volver a terapeutas
          </Link>
          
          <button className="inline-flex items-center text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] natus-body">
            <Heart className="w-5 h-5 mr-1" />
            Guardar
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#161616]/30 p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <Image 
                    src={therapist.image} 
                    alt={therapist.name} 
                    width={160} 
                    height={160} 
                    className="rounded-xl object-cover border-2 border-[#142619]/10 dark:border-[#8A7D68]/20"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-2 border-white dark:border-[#161616]"></div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">{therapist.name}</h1>
                    <span className="bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] text-xs px-2 py-0.5 rounded-full natus-body">
                      {therapist.match}% match
                    </span>
                  </div>
                  
                  <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-lg mb-2 natus-body">{therapist.specialty}</p>
                  
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-[#161616] dark:text-[#D7D7D6] font-medium ml-1 natus-heading">{therapist.rating}</span>
                    <span className="text-[#6B6B6B] dark:text-[#D7D7D6] ml-1 natus-body">({therapist.reviews} reseñas)</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-[#6B6B6B] dark:text-[#D7D7D6] mr-2 flex-shrink-0" />
                      <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{therapist.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-[#6B6B6B] dark:text-[#D7D7D6] mr-2 flex-shrink-0" />
                      <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Habla {therapist.languages.join(", ")}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-[#6B6B6B] dark:text-[#D7D7D6] mr-2 flex-shrink-0" />
                      <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        Próxima disponibilidad: <span className="font-medium text-[#142619] dark:text-[#8A7D68]">{therapist.nextAvailable.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {therapist.sessionTypes.includes("videollamada") && (
                  <div className="bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] px-3 py-1 rounded-full flex items-center">
                    <Video className="w-4 h-4 mr-1.5" />
                    Videollamada
                  </div>
                )}
                {therapist.sessionTypes.includes("presencial") && (
                  <div className="bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] px-3 py-1 rounded-full flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    Sesión presencial
                  </div>
                )}
                <div className="bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] px-3 py-1 rounded-full flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  Sesión: 45-50 min
                </div>
              </div>
              
              <div className="border-t border-[#D7D7D6]/20 dark:border-[#161616]/50 pt-6">
                <div className="flex overflow-x-auto space-x-6 mb-6 scrollbar-hide">
                  <button 
                    onClick={() => setActiveTab('perfil')}
                    className={`flex items-center whitespace-nowrap px-1 py-2 border-b-2 transition-colors natus-body ${activeTab === 'perfil' 
                      ? 'border-[#142619] dark:border-[#8A7D68] text-[#142619] dark:text-[#8A7D68] font-medium' 
                      : 'border-transparent text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]'}`}
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    Perfil
                  </button>
                  <button 
                    onClick={() => setActiveTab('experiencia')}
                    className={`flex items-center whitespace-nowrap px-1 py-2 border-b-2 transition-colors natus-body ${activeTab === 'experiencia' 
                      ? 'border-[#142619] dark:border-[#8A7D68] text-[#142619] dark:text-[#8A7D68] font-medium' 
                      : 'border-transparent text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]'}`}
                  >
                    <Award className="w-4 h-4 mr-1.5" />
                    Formación y experiencia
                  </button>
                  <button 
                    onClick={() => setActiveTab('testimonios')}
                    className={`flex items-center whitespace-nowrap px-1 py-2 border-b-2 transition-colors natus-body ${activeTab === 'testimonios' 
                      ? 'border-[#142619] dark:border-[#8A7D68] text-[#142619] dark:text-[#8A7D68] font-medium' 
                      : 'border-transparent text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]'}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5" />
                    Testimonios
                  </button>
                </div>
                
                {activeTab === 'perfil' && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Acerca de mí</h2>
                    <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mb-6 natus-body">{therapist.bio}</p>
                    
                    <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Especialidades</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {therapist.topics.map((topic: string) => (
                        <span 
                          key={topic} 
                          className="bg-[#D7D7D6]/20 dark:bg-[#161616]/50 text-[#6B6B6B] dark:text-[#D7D7D6] text-sm px-3 py-1 rounded-full natus-body"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">¿Qué puedo tratar?</h2>
                        <ul className="space-y-2">
                          {therapist.expertise.map((item: string) => (
                            <li key={item} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Mi enfoque</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Terapia basada en evidencia</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Enfoque centrado en soluciones</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Adaptado a tus necesidades específicas</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'experiencia' && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Formación académica</h2>
                    <ul className="space-y-4 mb-6">
                      {therapist.education.map((edu: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <FileText className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{edu}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Experiencia profesional</h2>
                    <ul className="space-y-4">
                      {therapist.experience.map((exp: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Award className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'testimonios' && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-3 natus-heading">Lo que dicen mis pacientes</h2>
                    <div className="space-y-4">
                      {therapist.testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="bg-[#F5F5F5] dark:bg-[#0E1920]/30 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                              <User className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">{testimonial.name}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-[#D7D7D6] dark:text-[#161616]/50'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{testimonial.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Columna derecha - Reserva */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#161616]/30 p-6 sticky top-24"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">Reserva tu cita</h2>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm mt-1 natus-body">Primera sesión con {therapist.name.split(' ')[0]}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Precio por sesión</span>
                  <span className="text-lg font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">{therapist.price}</span>
                </div>
                <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Beneficios con FONASA e ISAPRES</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Selecciona un horario</h3>
                  <span className="text-sm text-[#142619] dark:text-[#8A7D68] natus-body">
                    {therapist.nextAvailable.date}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {therapist.nextAvailable.slots.map((slot: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleTimeSlotSelect(slot)}
                      className={`py-2 px-3 rounded text-sm font-medium transition-colors natus-body
                        ${selectedTimeSlot === slot
                          ? 'bg-[#142619] dark:bg-[#8A7D68] text-white'
                          : 'bg-[#D7D7D6]/20 dark:bg-[#161616]/50 text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#142619]/20 dark:hover:bg-[#8A7D68]/30 hover:text-[#142619] dark:hover:text-[#8A7D68]'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                
                <div className="mt-2 text-center">
                  <Link href="#" className="text-sm text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                    Ver más horarios disponibles
                  </Link>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleBookAppointment}
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow natus-body"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar cita
                </button>
                
                <button className="w-full flex justify-center items-center px-4 py-3 border border-[#D7D7D6] dark:border-[#161616] text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#F5F5F5] dark:hover:bg-[#0E1920]/30 rounded-lg transition-colors natus-body">
                  <Mail className="mr-2 h-5 w-5" />
                  Contactar
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#D7D7D6]/20 dark:border-[#161616]/50 text-center">
                <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] mb-1 natus-body">
                  Primera sesión sin costo adicional
                </p>
                <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  Cancelación gratuita hasta 24h antes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
} 