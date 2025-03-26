'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, ChevronDown, ArrowUpRight, PlusCircle, UserPlus, Users, FileText } from 'lucide-react';
import { createClient } from '../../../../../supabase/client';

// Create a single supabase client instance
const supabase = createClient();

export default function FacilitatorPatients() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        // Solo cargamos los datos necesarios para la página
        const { data } = await supabase.auth.getSession();
        setLoading(false);
      } catch (error) {
        console.error("Error getting user:", error);
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  // Datos de ejemplo de pacientes
  const patients = [
    {
      id: 1,
      name: "Ana Silva",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      age: 32,
      since: "12 Mar 2023",
      lastSession: "24 Mar 2023",
      nextSession: "15 Abr 2023",
      sessionCount: 4,
      status: "active"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      age: 45,
      since: "05 Feb 2023",
      lastSession: "30 Mar 2023",
      nextSession: "18 Abr 2023",
      sessionCount: 8,
      status: "active"
    },
    {
      id: 3,
      name: "María González",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      age: 29,
      since: "20 Ene 2023",
      lastSession: "28 Mar 2023",
      nextSession: "20 Abr 2023",
      sessionCount: 12,
      status: "active"
    },
    {
      id: 4,
      name: "Luis Ramírez",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      age: 37,
      since: "08 Mar 2023",
      lastSession: "05 Abr 2023",
      nextSession: null,
      sessionCount: 5,
      status: "inactive"
    },
    {
      id: 5,
      name: "Diana Torres",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      age: 41,
      since: "15 Feb 2023",
      lastSession: "01 Abr 2023",
      nextSession: "22 Abr 2023",
      sessionCount: 7,
      status: "active"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#142619] dark:border-[#8A7D68]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">Pacientes</h1>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">
            Gestiona tu lista de pacientes y su información
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-[#142619] dark:bg-[#8A7D68] text-white rounded-lg hover:bg-[#142619]/90 dark:hover:bg-[#8A7D68]/90 transition-colors">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Paciente
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Total Pacientes</p>
              <p className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                {patients.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Pacientes Activos</p>
              <p className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Citas Este Mes</p>
              <p className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Nuevos este mes</p>
              <p className="text-xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                2
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtrado */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] dark:text-[#D7D7D6]" />
          <input 
            type="text" 
            placeholder="Buscar paciente por nombre o correo" 
            className="w-full pl-10 pr-4 py-2 border border-[#D7D7D6] dark:border-[#242C34] bg-white dark:bg-[#161616] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] natus-body"
          />
        </div>
        <button className="px-4 py-2 border border-[#D7D7D6] dark:border-[#242C34] bg-white dark:bg-[#161616] rounded-lg hover:bg-[#D7D7D6]/10 dark:hover:bg-[#242C34]/80 transition-colors text-[#6B6B6B] dark:text-[#D7D7D6] flex items-center natus-body">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </div>

      {/* Lista de pacientes */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#D7D7D6] dark:divide-[#242C34]">
            <thead className="bg-[#D7D7D6]/10 dark:bg-[#242C34]/40">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Edad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Cliente desde
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Sesiones
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Última sesión
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Próxima sesión
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#161616] divide-y divide-[#D7D7D6] dark:divide-[#242C34]">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-[#D7D7D6]/10 dark:hover:bg-[#242C34]/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image 
                          src={patient.image} 
                          alt={patient.name} 
                          width={40} 
                          height={40}
                          className="h-10 w-10 rounded-full object-cover" 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                          {patient.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    {patient.since}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    {patient.sessionCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    {patient.lastSession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.nextSession ? (
                      <span className="text-[#142619] dark:text-[#8A7D68] font-medium natus-body">
                        {patient.nextSession}
                      </span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400 natus-body">
                        No agendada
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium natus-body ${
                      patient.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300'
                    }`}>
                      {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#142619] dark:text-[#8A7D68] hover:text-[#142619]/80 dark:hover:text-[#8A7D68]/80 natus-body">
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 