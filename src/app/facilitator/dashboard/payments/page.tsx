'use client';

import React from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  FileText,
  PlusCircle,
  TrendingUp,
  CreditCard,
  Clock,
  Check,
  X,
  Calendar,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";

export default function FacilitatorPayments() {
  // Datos de ejemplo
  const payments = [
    {
      id: 1,
      patientName: "Ana Silva",
      date: "2023-04-12",
      amount: 45000,
      service: "Terapia individual",
      status: "completed",
      method: "Tarjeta de crédito",
      invoiceIssued: true
    },
    {
      id: 2,
      patientName: "Carlos Mendoza",
      date: "2023-04-10",
      amount: 40000,
      service: "Primera consulta",
      status: "completed",
      method: "Transferencia",
      invoiceIssued: true
    },
    {
      id: 3,
      patientName: "María González",
      date: "2023-04-08",
      amount: 45000,
      service: "Terapia individual",
      status: "completed",
      method: "Tarjeta de débito",
      invoiceIssued: true
    },
    {
      id: 4,
      patientName: "Luis Rodríguez",
      date: "2023-04-05",
      amount: 65000,
      service: "Evaluación psicológica",
      status: "completed",
      method: "Tarjeta de crédito",
      invoiceIssued: true
    },
    {
      id: 5,
      patientName: "Diana Torres",
      date: "2023-04-03",
      amount: 60000,
      service: "Paquete 3 sesiones (pago 1/3)",
      status: "completed",
      method: "Transferencia",
      invoiceIssued: true
    },
    {
      id: 6,
      patientName: "Roberto Pérez",
      date: "2023-04-15",
      amount: 45000,
      service: "Seguimiento",
      status: "pending",
      method: "Esperando pago",
      invoiceIssued: false
    },
    {
      id: 7,
      patientName: "Carolina Soto",
      date: "2023-04-16",
      amount: 45000,
      service: "Terapia individual",
      status: "pending",
      method: "Esperando pago",
      invoiceIssued: false
    },
  ];

  // Datos de estadísticas
  const stats = {
    totalEarnings: 300000,
    pendingPayments: 90000,
    completedPayments: 5,
    pendingCount: 2,
    averagePayment: 45000,
    growthRate: 15
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
            Gestión de pagos
          </h1>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition text-sm natus-body">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <Link
              href="/facilitator/dashboard/payments/create"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-full hover:shadow-lg transition-all duration-300 text-sm font-medium natus-body"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Nuevo pago
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Total cobrado (mes)</p>
              <p className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                ${stats.totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Pendiente por cobrar</p>
              <p className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                ${stats.pendingPayments.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Monto promedio</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                  ${stats.averagePayment.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#142619]/10 dark:bg-[#8A7D68]/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#142619] dark:text-[#8A7D68]" />
            </div>
            <div className="ml-4">
              <p className="text-[#6B6B6B] dark:text-[#D7D7D6] text-sm natus-body">Transacciones (mes)</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                  {stats.completedPayments + stats.pendingCount}
                </p>
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] natus-body">
                  +{stats.growthRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
            </div>
            <input
              type="text"
              placeholder="Buscar pagos o pacientes"
              className="pl-10 w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button className="inline-flex items-center px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition text-sm natus-body">
                <Calendar className="h-4 w-4 mr-2" />
                Fecha
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            
            <div className="relative">
              <button className="inline-flex items-center px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition text-sm natus-body">
                <Filter className="h-4 w-4 mr-2" />
                Estado
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            
            <button className="inline-flex items-center px-3 py-2 bg-[#142619]/10 dark:bg-[#8A7D68]/20 text-[#142619] dark:text-[#8A7D68] rounded-md hover:bg-[#142619]/20 dark:hover:bg-[#8A7D68]/30 transition text-sm font-medium natus-body">
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#D7D7D6] dark:border-[#0E1920]">
          <h2 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">
            Listado de pagos
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#D7D7D6] dark:divide-[#0E1920]">
            <thead className="bg-[#D7D7D6]/10 dark:bg-[#0E1920]/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center cursor-pointer">
                    <span>Paciente</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center cursor-pointer">
                    <span>Fecha</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center cursor-pointer">
                    <span>Servicio</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center cursor-pointer">
                    <span>Método</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center cursor-pointer">
                    <span>Estado</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  <div className="flex items-center justify-end cursor-pointer">
                    <span>Monto</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Boleta
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#6B6B6B] dark:text-[#D7D7D6] uppercase tracking-wider natus-body">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#161616] divide-y divide-[#D7D7D6] dark:divide-[#0E1920]">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#D7D7D6]/5 dark:hover:bg-[#0E1920]/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">{payment.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#161616] dark:text-[#D7D7D6] natus-body">{payment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium natus-body ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {payment.status === 'completed' ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          Completado
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-3 w-3" />
                          Pendiente
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      ${payment.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {payment.invoiceIssued ? (
                      <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm natus-body">
                        <Check className="mr-1 h-4 w-4" />
                        Emitida
                      </span>
                    ) : payment.status === 'completed' ? (
                      <button className="text-[#142619] dark:text-[#8A7D68] hover:underline text-sm flex items-center justify-end w-full natus-body">
                        <FileText className="mr-1 h-4 w-4" />
                        Emitir
                      </button>
                    ) : (
                      <span className="text-[#6B6B6B] dark:text-[#D7D7D6]/50 text-sm natus-body">
                        <X className="mr-1 h-4 w-4 inline" />
                        No aplica
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                        Detalles
                      </button>
                      {payment.status === 'pending' && (
                        <button className="text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                          Registrar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#D7D7D6] dark:border-[#0E1920] flex items-center justify-between">
          <div className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">{payments.length}</span> de <span className="font-medium">{payments.length}</span> resultados
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm natus-body" disabled>
              Anterior
            </button>
            <button className="px-3 py-1 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm natus-body" disabled>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 