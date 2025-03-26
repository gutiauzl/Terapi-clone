import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  AlertCircle,
  User,
  FileText,
  CreditCard,
  CalendarClock,
  CheckCircle
} from "lucide-react";

export default function CreateInvoice() {
  // Datos de ejemplo para el formulario
  const patients = [
    { id: 1, name: "Ana Silva" },
    { id: 2, name: "Carlos Mendoza" },
    { id: 3, name: "María González" },
    { id: 4, name: "Luis Rodríguez" },
    { id: 5, name: "Diana Torres" },
    { id: 6, name: "Roberto Pérez" },
  ];

  // Servicios
  const services = [
    { id: 1, name: "Terapia individual", defaultPrice: 45000 },
    { id: 2, name: "Primera consulta", defaultPrice: 40000 },
    { id: 3, name: "Evaluación psicológica", defaultPrice: 65000 },
    { id: 4, name: "Seguimiento", defaultPrice: 45000 },
    { id: 5, name: "Paquete 3 sesiones", defaultPrice: 120000 },
    { id: 6, name: "Taller grupal", defaultPrice: 35000 },
  ];

  // Métodos de pago
  const paymentMethods = [
    { id: 1, name: "Tarjeta de crédito" },
    { id: 2, name: "Tarjeta de débito" },
    { id: 3, name: "Transferencia bancaria" },
    { id: 4, name: "Efectivo" },
  ];

  return (
    <div className="min-h-screen bg-[#D7D7D6]/20 dark:bg-[#161616] pb-12">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              href="/facilitator/dashboard/payments" 
              className="mr-4 text-[#142619] dark:text-[#8A7D68] hover:underline flex items-center natus-body"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver a Pagos
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
              Emitir boleta electrónica
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#D7D7D6] dark:border-[#0E1920]">
                <h2 className="text-xl font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                  Detalles de la boleta
                </h2>
                <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">
                  Complete los datos para generar una boleta electrónica.
                </p>
              </div>

              <form className="p-6 space-y-6">
                {/* Patient Section */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-[#161616] dark:text-[#D7D7D6] flex items-center natus-heading">
                    <User className="w-5 h-5 mr-2 text-[#142619] dark:text-[#8A7D68]" />
                    Información del paciente
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="patient" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Paciente
                      </label>
                      <select 
                        id="patient" 
                        name="patient" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      >
                        <option value="">Seleccione un paciente</option>
                        {patients.map(patient => (
                          <option key={patient.id} value={patient.id}>{patient.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="rut" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        RUT
                      </label>
                      <input 
                        type="text" 
                        id="rut" 
                        name="rut" 
                        placeholder="12.345.678-9" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Correo electrónico
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="ejemplo@correo.com" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Teléfono
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="+56 9 1234 5678" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Section */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-[#161616] dark:text-[#D7D7D6] flex items-center natus-heading">
                    <FileText className="w-5 h-5 mr-2 text-[#142619] dark:text-[#8A7D68]" />
                    Detalles del servicio
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Servicio
                      </label>
                      <select 
                        id="service" 
                        name="service" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      >
                        <option value="">Seleccione un servicio</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Fecha del servicio
                      </label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Monto ($)
                      </label>
                      <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder="45000" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>

                    <div>
                      <label htmlFor="payment_method" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Método de pago
                      </label>
                      <select 
                        id="payment_method" 
                        name="payment_method" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      >
                        <option value="">Seleccione método de pago</option>
                        {paymentMethods.map(method => (
                          <option key={method.id} value={method.id}>{method.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                      Descripción adicional
                    </label>
                    <textarea 
                      id="description" 
                      name="description" 
                      rows={3} 
                      placeholder="Detalles adicionales sobre el servicio..." 
                      className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    ></textarea>
                  </div>
                </div>

                {/* Tax Information */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-[#161616] dark:text-[#D7D7D6] flex items-center natus-heading">
                    <Receipt className="w-5 h-5 mr-2 text-[#142619] dark:text-[#8A7D68]" />
                    Información tributaria
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="invoice_type" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Tipo de documento
                      </label>
                      <select 
                        id="invoice_type" 
                        name="invoice_type" 
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      >
                        <option value="boleta">Boleta Electrónica</option>
                        <option value="factura">Factura Electrónica</option>
                        <option value="honorarios">Boleta de Honorarios</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="giro" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] mb-1 natus-body">
                        Giro
                      </label>
                      <input 
                        type="text" 
                        id="giro" 
                        name="giro" 
                        placeholder="Servicios profesionales" 
                        defaultValue="Servicios profesionales de psicología"
                        className="w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <input 
                        id="include_tax" 
                        name="include_tax" 
                        type="checkbox" 
                        className="h-4 w-4 text-[#142619] dark:text-[#8A7D68] focus:ring-[#142619] dark:focus:ring-[#8A7D68] border-[#D7D7D6] dark:border-[#0E1920] rounded"
                      />
                      <label htmlFor="include_tax" className="ml-2 block text-sm text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Incluir IVA (19%)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="rounded-md bg-amber-50 dark:bg-amber-900/30 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-400 dark:text-amber-300" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 natus-body">Información importante</h3>
                      <div className="mt-2 text-sm text-amber-700 dark:text-amber-200 natus-body">
                        <p>
                          Al emitir esta boleta, el documento será enviado al SII y al correo electrónico del cliente. Asegúrese de que todos los datos sean correctos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/facilitator/dashboard/payments"
                    className="px-4 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/20 transition natus-body"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-md hover:shadow-lg transition-all duration-300 font-medium natus-body"
                  >
                    Emitir boleta
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Information Column */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
                Vista previa
              </h2>
              
              <div className="border border-dashed border-[#D7D7D6] dark:border-[#0E1920] rounded-lg p-4 mb-4">
                <div className="text-center">
                  <Receipt className="w-10 h-10 text-[#142619] dark:text-[#8A7D68] mx-auto mb-2" />
                  <h3 className="text-base font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Boleta Electrónica</h3>
                  <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">Completa el formulario para visualizar</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">Subtotal:</span>
                  <span className="text-sm text-[#161616] dark:text-[#D7D7D6] font-medium natus-body">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">IVA (19%):</span>
                  <span className="text-sm text-[#161616] dark:text-[#D7D7D6] font-medium natus-body">$0</span>
                </div>
                <div className="border-t border-[#D7D7D6] dark:border-[#0E1920] pt-3 flex justify-between">
                  <span className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Total:</span>
                  <span className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">$0</span>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-gradient-to-br from-[#142619]/10 to-[#0E1920]/10 dark:from-[#8A7D68]/20 dark:to-[#D7D7D6]/10 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">
                Información útil
              </h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">Pagos registrados</h3>
                    <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">
                      Las boletas deben emitirse para cada pago completado. Puede revisar los pagos pendientes en la sección de pagos.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CalendarClock className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">Plazos tributarios</h3>
                    <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">
                      Recuerda que las boletas electrónicas deben emitirse dentro del mismo período tributario en que se realizó el servicio.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[#142619] dark:text-[#8A7D68]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">Confirmación automática</h3>
                    <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">
                      Una vez emitida, la boleta se enviará automáticamente al correo electrónico del cliente y se registrará en el SII.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 