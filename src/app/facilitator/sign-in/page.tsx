'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";

// Create a single supabase client instance
const supabase = createClient();

export default function FacilitatorSignIn() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  // Check login status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking facilitator session...");
        
        // Check if we're already handling a redirect to prevent loops
        const redirecting = localStorage.getItem('auth_redirecting');
        if (redirecting) {
          console.log("Already redirecting, preventing redirect loop");
          // Clear the flag after 5 seconds to prevent permanent lockout
          setTimeout(() => {
            localStorage.removeItem('auth_redirecting');
          }, 5000);
          setInitialCheckDone(true);
          return;
        }

        // Get session
        const { data } = await supabase.auth.getSession();
        console.log("Session check result:", data.session ? "Session found" : "No session");
        
        if (!data.session) {
          setInitialCheckDone(true);
          return;
        }
        
        // Set redirecting flag to prevent loops
        localStorage.setItem('auth_redirecting', 'true');
        
        // Explicit facilitator flag for this special page
        localStorage.setItem('is_facilitator', 'true');
        
        // Force metadata update to ensure user is marked as facilitator
        await supabase.auth.updateUser({
          data: { user_type: 'facilitador' }
        });
        
        console.log("User already logged in, redirecting to facilitator dashboard");
        window.location.href = '/facilitator/dashboard';
        
      } catch (error) {
        console.error("Auth check error:", error);
        setInitialCheckDone(true);
      }
    };
    
    checkAuth();
  }, []);

  const handleBack = () => {
    router.push('/facilitator');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log("Attempting facilitator login...");
      
      // Try to sign in with provided credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log("Login successful, checking user type");
      
      // Verificar si el usuario es realmente un facilitador
      const userType = data.user?.user_metadata?.user_type;
      console.log("User type from metadata:", userType);
      
      if (userType !== 'facilitador' && userType !== 'facilitator') {
        console.log("Client user trying to access facilitator dashboard - access denied");
        setError('Esta cuenta es de cliente. Por favor, inicie sesión a través del portal de clientes.');
        setLoading(false);
        return;
      }
      
      console.log("Facilitator login successful");
      
      // Set facilitator flag in localStorage
      localStorage.setItem('is_facilitator', 'true');
      
      // Set redirecting flag
      localStorage.setItem('auth_redirecting', 'true');
      
      // Update user metadata to ensure they are marked as a facilitator
      await supabase.auth.updateUser({
        data: { user_type: 'facilitador' }
      });
      
      console.log("Redirecting to facilitator dashboard");
      window.location.href = '/facilitator/dashboard';
      
    } catch (err: any) {
      console.error('Error during facilitator login:', err);
      setError(err.error_description || err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F3] to-[#D7D7D6]/20 dark:from-[#0E1920] dark:to-[#161616] flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-[#142619] dark:text-[#8A7D68] hover:underline natus-body"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver a facilitadores
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#161616]/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">
              Portal de Facilitadores
            </h2>
            <p className="mt-2 text-center text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
              Accede a tu cuenta para gestionar tus servicios
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
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
                    className="mt-1 block w-full pl-10 px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full pl-10 pr-10 px-3 py-2 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm focus:outline-none focus:ring-[#142619] focus:border-[#142619] dark:focus:ring-[#8A7D68] dark:focus:border-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] dark:bg-[#0E1920]/30 natus-body"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#142619] dark:text-[#8A7D68] focus:ring-[#142619] dark:focus:ring-[#8A7D68] border-[#D7D7D6] dark:border-[#0E1920] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="text-[#142619] dark:text-[#8A7D68] hover:underline natus-body">
                  ¿Olvidaste tu contraseña?
                </Link>
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
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] natus-body"
              >
                {loading ? "Procesando..." : "Iniciar sesión"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D7D7D6] dark:border-[#0E1920]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-[#161616]/80 text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                  O continúa con
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm bg-white dark:bg-[#161616] text-sm font-medium text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/30 natus-body"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-[#D7D7D6] dark:border-[#0E1920] rounded-md shadow-sm bg-white dark:bg-[#161616] text-sm font-medium text-[#161616] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/30 natus-body"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
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
    </div>
  );
} 