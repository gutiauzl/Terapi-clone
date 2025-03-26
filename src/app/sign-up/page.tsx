'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, User, Pen, Mail, Lock, UserCircle, Users, Calendar, Phone, MapPin, CheckCircle } from "lucide-react";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();
  
  const [userType, setUserType] = useState<'client' | 'facilitador' | null>(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Formulario compartido
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  
  // Campos específicos para facilitador
  const [profession, setProfession] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  const handleSelectUserType = (type: 'client' | 'facilitador') => {
    setUserType(type);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  const handleNext = () => {
    // Validación del paso actual
    if (step === 2) {
      if (!email || !password || !confirmPassword) {
        setError('Por favor completa todos los campos.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
    }
    
    setError(null);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Registrar usuario en Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            lastname,
            birthdate,
            phone,
            user_type: userType === 'facilitador' ? 'facilitador' : userType,
            // Datos específicos del facilitador
            profession: userType === 'facilitador' ? profession : null,
            specialties: userType === 'facilitador' ? specialties : null,
            experience: userType === 'facilitador' ? experience : null,
            address: userType === 'facilitador' ? address : null,
            bio: userType === 'facilitador' ? bio : null,
          },
        },
      });
      
      if (error) throw error;
      
      // Si se ha registrado con éxito, mostrar mensaje de éxito
      setSuccess(true);
      
      // Crear perfil en la tabla correspondiente
      if (userType === 'client') {
        const { error: profileError } = await supabase
          .from('client_profiles')
          .insert([{ 
            user_id: data.user?.id,
            name,
            lastname,
            birthdate,
            phone
          }]);
        
        if (profileError) throw profileError;
      } else if (userType === 'facilitador') {
        const { error: profileError } = await supabase
          .from('facilitator_profiles')
          .insert([{ 
            user_id: data.user?.id,
            name,
            lastname,
            birthdate,
            phone,
            profession,
            specialties,
            experience,
            address,
            bio,
            is_verified: false // Los facilitadores requieren verificación
          }]);
        
        if (profileError) throw profileError;
      }
      
    } catch (err: any) {
      console.error('Error al registrar:', err);
      setError(err.message || 'Ha ocurrido un error durante el registro.');
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
            <button
              onClick={handleBack}
              className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] hover:underline natus-body"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              {step === 1 ? 'Volver' : 'Atrás'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#161616] p-8 rounded-xl shadow-lg">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                ¡Registro exitoso!
              </h2>
              <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                Te hemos enviado un correo electrónico con un enlace para verificar tu cuenta.
              </p>
              <div className="mt-5">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 natus-body"
                >
                  Ir a iniciar sesión
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-center text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
                  {step === 1 ? 'Elije tu tipo de cuenta' : (
                    userType === 'client' ? 'Registro de Usuario' : 'Registro de Facilitador'
                  )}
                </h2>
                <p className="mt-2 text-center text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  {step === 1 
                    ? 'Selecciona el tipo de cuenta que deseas crear' 
                    : (step === 2 
                        ? 'Ingresa tus datos de acceso' 
                        : 'Completa tu información personal'
                      )
                  }
                </p>
              </div>

              {/* Indicador de pasos */}
              {step > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                  {Array.from({ length: userType === 'client' ? 3 : 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full ${
                        idx + 2 <= step
                          ? 'w-8 bg-[#142619] dark:bg-[#8A7D68]'
                          : 'w-2 bg-[#D7D7D6] dark:bg-[#3F3F3F]'
                      }`}
                    ></div>
                  ))}
                </div>
              )}

              {/* Paso 1: Selección de tipo de usuario */}
              {step === 1 && (
                <div className="mt-8 grid grid-cols-1 gap-6">
                  <button
                    onClick={() => handleSelectUserType('client')}
                    className="flex flex-col items-center p-6 border-2 border-[#D7D7D6] dark:border-[#3F3F3F] rounded-xl hover:border-[#142619] dark:hover:border-[#8A7D68] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68]"
                  >
                    <UserCircle className="w-16 h-16 text-[#142619] dark:text-[#8A7D68] mb-4" />
                    <h3 className="text-xl font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Usuario</h3>
                    <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] text-center natus-body">
                      Busco ayuda, terapia y/o crecimiento personal
                    </p>
                  </button>

                  <button
                    onClick={() => handleSelectUserType('facilitador')}
                    className="flex flex-col items-center p-6 border-2 border-[#D7D7D6] dark:border-[#3F3F3F] rounded-xl hover:border-[#142619] dark:hover:border-[#8A7D68] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68]"
                  >
                    <Users className="w-16 h-16 text-[#142619] dark:text-[#8A7D68] mb-4" />
                    <h3 className="text-xl font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">Facilitador</h3>
                    <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] text-center natus-body">
                      Soy terapeuta, psicólogo o profesional del bienestar
                    </p>
                  </button>
                </div>
              )}

              {/* Paso 2: Información de cuenta */}
              {step === 2 && (
                <form className="mt-8 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Correo electrónico
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Mail className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Contraseña
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 pr-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Lock className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-2.5 right-3 text-[#6B6B6B] dark:text-[#D7D7D6]"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Confirmar Contraseña
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 pr-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Lock className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm natus-body">
                      {error}
                    </div>
                  )}

                  <div>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              )}

              {/* Paso 3: Información personal básica (para ambos tipos) */}
              {step === 3 && (
                <form className="mt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                          Nombre
                        </label>
                        <div className="mt-1 relative">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                          />
                          <User className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                          Apellido
                        </label>
                        <div className="mt-1 relative">
                          <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                          />
                          <User className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="birthdate" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Fecha de nacimiento
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="birthdate"
                          name="birthdate"
                          type="date"
                          required
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Calendar className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Teléfono
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Phone className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm natus-body">
                      {error}
                    </div>
                  )}

                  <div>
                    {userType === 'client' ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
                      >
                        {loading ? 'Procesando...' : 'Crear cuenta'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Paso 4: Información adicional para facilitadores */}
              {step === 4 && userType === 'facilitador' && (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="profession" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Profesión
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="profession"
                          name="profession"
                          type="text"
                          required
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                          placeholder="Ej: Psicólogo, Terapeuta, Coach"
                        />
                        <Pen className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="specialties" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Especialidades
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="specialties"
                          name="specialties"
                          type="text"
                          required
                          value={specialties}
                          onChange={(e) => setSpecialties(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                          placeholder="Ej: Terapia de pareja, Ansiedad, Depresión"
                        />
                        <Pen className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Años de experiencia
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="experience"
                          name="experience"
                          type="number"
                          required
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          min="0"
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <Calendar className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Dirección profesional
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="block w-full px-3 py-2 pl-10 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                        />
                        <MapPin className="absolute top-2.5 left-3 w-5 h-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">
                        Biografía profesional
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="block w-full px-3 py-2 border border-[#D7D7D6] dark:border-[#3F3F3F] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
                          placeholder="Describe tu trayectoria, filosofía de trabajo, y lo que te hace único como facilitador..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm natus-body">
                      {error}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
                    >
                      {loading ? 'Procesando...' : 'Crear cuenta'}
                    </button>
                  </div>
                </form>
              )}

              {step > 1 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/sign-in" className="text-[#142619] dark:text-[#8A7D68] hover:underline">
                      Inicia sesión
                    </Link>
                  </p>
                </div>
              )}
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