import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle, 
  Video, 
  MessageSquare, 
  MapPin, 
  Filter, 
  ArrowUpDown, 
  Search, 
  ChevronRight, 
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard-header";

// Datos de muestra para terapeutas (en una aplicación real, esto vendría de una base de datos)
const therapists = [
  {
    id: "1",
    name: "Dra. María González",
    specialty: "Psicóloga Clínica",
    expertise: ["Depresión", "Ansiedad", "Estrés"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 124,
    availability: "Hoy",
    price: "$45.000",
    match: 98,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Especialista en terapia cognitivo-conductual con 8 años de experiencia tratando problemas de ansiedad y depresión.",
    topics: ["Ansiedad", "Depresión", "Autoestima"],
    languages: ["Español", "Inglés"],
    location: "Santiago Centro",
    nextAvailable: {
      date: "Hoy",
      slots: ["15:00", "17:30", "18:45"]
    }
  },
  {
    id: "2",
    name: "Dr. Alejandro Montero",
    specialty: "Psiquiatra",
    expertise: ["Trastornos del sueño", "Depresión", "TDAH"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 87,
    availability: "Mañana",
    price: "$50.000",
    match: 95,
    sessionTypes: ["videollamada"],
    bio: "Psiquiatra especializado en trastornos del estado de ánimo y del sueño. Enfoque integral combinando terapia y farmacología cuando es necesario.",
    topics: ["Trastornos del sueño", "Depresión", "TDAH"],
    languages: ["Español"],
    location: "Providencia",
    nextAvailable: {
      date: "Mañana",
      slots: ["10:30", "12:00", "16:15"]
    }
  },
  {
    id: "3",
    name: "Dra. Laura Jiménez",
    specialty: "Terapeuta Familiar",
    expertise: ["Relaciones de pareja", "Crianza", "Comunicación"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviews: 56,
    availability: "Jueves",
    price: "$48.000",
    match: 92,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Con más de 10 años de experiencia en terapia familiar y de parejas, utilizando técnicas modernas y efectivas para mejorar la comunicación.",
    topics: ["Terapia de Parejas", "Comunicación", "Resolución de conflictos"],
    languages: ["Español", "Portugués"],
    location: "Las Condes",
    nextAvailable: {
      date: "Jueves",
      slots: ["14:00", "16:30", "18:00"]
    }
  },
  {
    id: "4",
    name: "Dr. Carlos Vega",
    specialty: "Psicólogo Cognitivo",
    expertise: ["Fobias", "Trastornos de ansiedad", "Estrés post-traumático"],
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.6,
    reviews: 42,
    availability: "Viernes",
    price: "$42.000",
    match: 88,
    sessionTypes: ["videollamada", "presencial"],
    bio: "Especialista en terapias para trastornos de ansiedad y fobias específicas, utilizando técnicas de exposición y reestructuración cognitiva.",
    topics: ["Fobias", "Ansiedad", "Trauma"],
    languages: ["Español", "Inglés"],
    location: "Ñuñoa",
    nextAvailable: {
      date: "Viernes",
      slots: ["09:00", "11:30", "15:45"]
    }
  }
];

export default async function TherapistMatches() {
  // Obtener el cliente de Supabase
  const supabase = await createClient();
  
  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3"
            >
              Encuentra al terapeuta ideal para ti
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              Basado en tus respuestas, hemos encontrado profesionales que se adaptan a tus necesidades. 
              Todos los especialistas están verificados y tienen amplia experiencia.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Prueba gratuita de 15 minutos
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Cancelación gratuita hasta 24h antes
              </div>
            </motion.div>
          </div>
          
          {/* Filtros y búsqueda */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o especialidad..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none dark:text-white">
                <option value="">Especialidad</option>
                <option value="clinical">Psicología Clínica</option>
                <option value="family">Terapia Familiar</option>
                <option value="psychiatry">Psiquiatría</option>
                <option value="cognitive">Psicología Cognitiva</option>
              </select>
            </div>
            
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none dark:text-white">
                <option value="match">Ordenar por: Compatibilidad</option>
                <option value="price-asc">Ordenar por: Precio (menor a mayor)</option>
                <option value="price-desc">Ordenar por: Precio (mayor a menor)</option>
                <option value="rating">Ordenar por: Calificación</option>
                <option value="availability">Ordenar por: Disponibilidad</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {therapists.map((therapist, index) => (
            <motion.div 
              key={therapist.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Columna de perfil */}
                <div className="p-6 flex flex-col md:border-r border-gray-100 dark:border-gray-700">
                  <div className="flex items-start">
                    <div className="relative mr-4">
                      <Image 
                        src={therapist.image} 
                        alt={therapist.name} 
                        width={80} 
                        height={80} 
                        className="rounded-xl object-cover border-2 border-purple-100 dark:border-purple-900/50"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{therapist.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{therapist.specialty}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1 text-gray-900 dark:text-white">{therapist.rating}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({therapist.reviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{therapist.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Próxima disponibilidad: <span className="font-medium text-green-600 dark:text-green-400">{therapist.nextAvailable.date}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Sesión: 45-50 min</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {therapist.sessionTypes.includes("videollamada") && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full flex items-center">
                        <Video className="w-3 h-3 mr-1" />
                        Online
                      </div>
                    )}
                    {therapist.sessionTypes.includes("presencial") && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs px-2.5 py-1 rounded-full flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        Presencial
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Columna de compatibilidad */}
                <div className="p-6 flex flex-col justify-between md:border-r border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="flex flex-col mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compatibilidad</span>
                        <span className="text-lg font-bold text-purple-700 dark:text-purple-400">{therapist.match}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-2.5 bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full" 
                          style={{ width: `${therapist.match}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Especialista en {therapist.expertise.slice(0, 2).join(" y ")}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Disponibilidad en tus horarios preferidos
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Habla {therapist.languages.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.expertise.map(topic => (
                        <span 
                          key={topic} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Columna de acción */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Precio por sesión</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{therapist.price}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Beneficios con FONASA e ISAPRES</p>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Próximas horas disponibles</h3>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {therapist.nextAvailable.slots.map((slot, i) => (
                        <button
                          key={i}
                          className="py-1.5 px-2 bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded text-sm text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      className="w-full flex justify-center items-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar cita
                    </button>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 flex justify-center items-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        Ver perfil
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                      <button className="flex justify-center items-center px-3 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
} 