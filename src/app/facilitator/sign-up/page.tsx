'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "../../../../supabase/client";

export default function FacilitatorSignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    password: '',
    passwordConfirm: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validaciones
    if (formData.password !== formData.passwordConfirm) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }
    
    if (!formData.terms) {
      setError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }
    
    try {
      console.log("Registrando facilitador...");
      
      // Registro en Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.firstName,
            lastname: formData.lastName,
            phone: formData.phone,
            profession: formData.profession,
            user_type: 'facilitador', // Importante: establecer tipo de usuario
          },
        },
      });
      
      if (error) throw error;
      
      console.log("Facilitador registrado exitosamente");
      
      // Crear perfil en la tabla de facilitadores
      if (data.user) {
        const { error: profileError } = await supabase
          .from('facilitator_profiles')
          .insert([{ 
            user_id: data.user.id,
            name: formData.firstName,
            lastname: formData.lastName,
            phone: formData.phone,
            profession: formData.profession,
            is_verified: false // Los facilitadores requieren verificación
          }]);
          
        if (profileError) {
          console.error("Error al crear perfil:", profileError);
        }
      }
      
      setSuccess(true);
      
    } catch (err: any) {
      console.error('Error al registrar facilitador:', err);
      setError(err.message || 'Ha ocurrido un error durante el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D7D7D6]/20 dark:bg-[#161616] flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link
              href="/for-facilitators"
              className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] hover:underline natus-body"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#161616] p-8 rounded-xl shadow-lg">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-3 text-lg font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                ¡Registro exitoso!
              </h2>
              <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta.
              </p>
              <div className="mt-5">
                <Link
                  href="/facilitator/sign-in"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 natus-body"
                >
                  Ir a iniciar sesión
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="mt-2 text-center text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                  Crea tu cuenta de Facilitador
                </h2>
                <p className="mt-2 text-center text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  Comienza a ofrecer tus servicios profesionales
                </p>
              </div>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm natus-body">
                  {error}
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Nombre
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Apellido
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    />
                  </div>

                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      Profesión
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      required
                      value={formData.profession}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    >
                      <option value="">Selecciona tu profesión</option>
                      <option value="psychologist">Psicólogo/a</option>
                      <option value="psychiatrist">Psiquiatra</option>
                      <option value="therapist">Terapeuta</option>
                      <option value="nutritionist">Nutricionista</option>
                      <option value="coach">Coach</option>
                      <option value="other">Otra</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    />
                  </div>

                  <div>
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                      Confirmar contraseña
                    </label>
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#142619] dark:text-[#8A7D68] focus:ring-[#142619] dark:focus:ring-[#8A7D68] border-[#D7D7D6] dark:border-[#0E1920] rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    Acepto los{" "}
                    <Link href="#" className="text-[#142619] dark:text-[#8A7D68] hover:underline">
                      términos y condiciones
                    </Link>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
                  >
                    {loading ? "Procesando..." : "Crear cuenta"}
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/facilitator/sign-in" className="text-[#142619] dark:text-[#8A7D68] hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 md:px-8">
        <div className="container mx-auto">
          <p className="text-center text-sm text-[#6B6B6B] dark:text-[#D7D7D6]/70 natus-body">
            &copy; {new Date().getFullYear()} NATUS. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
} 