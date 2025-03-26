'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Calendar, MessageSquare, FileText, Settings, LogOut, Menu, X, User, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '../../../../supabase/client';

// Create a single supabase client instance
const supabase = createClient();

export default function FacilitatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking facilitator dashboard session...");
      try {
        // Also verify the user session
        const { data } = await supabase.auth.getSession();
        console.log("Session check result:", data.session ? "Session found" : "No session");
        
        if (!data.session) {
          console.log("No session found, redirecting to facilitator sign-in");
          localStorage.removeItem('auth_redirecting');
          window.location.href = '/facilitator/sign-in';
          return;
        }
        
        // Get the user
        const user = data.session.user;
        console.log("User data:", user.email);

        // Check if this is a facilitator account by checking metadata
        const userType = user.user_metadata?.user_type;
        console.log("User type from metadata:", userType);

        // Strict verification - only allow facilitators
        if (userType !== 'facilitador' && userType !== 'facilitator') {
          console.log("User is not a facilitator, access denied");
          alert("Su cuenta no tiene permisos de facilitador. Redirigiendo al portal de clientes.");
          localStorage.removeItem('is_facilitator');
          window.location.href = '/dashboard';
          return;
        }
        
        // User is a verified facilitator, set the flag
        localStorage.setItem('is_facilitator', 'true');
        
        // Set user state and finish loading
        setUser(user);
        setLoading(false);
        
      } catch (error) {
        console.error("Auth check error:", error);
        // In case of error, redirect to sign-in
        localStorage.removeItem('auth_redirecting');
        window.location.href = '/facilitator/sign-in';
      }
    };
    
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      // Remove the facilitator flag
      localStorage.removeItem('is_facilitator');
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear any auth tokens or session data
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('auth_redirecting');
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Verificar si la ruta actual coincide con alguna de las rutas de navegación
  const isActive = (path: string) => {
    if (path === '/facilitator/dashboard' && pathname === '/facilitator/dashboard') {
      return true;
    }
    if (path !== '/facilitator/dashboard' && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9F7F3] dark:bg-[#0E1920]">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#142619] dark:border-[#8A7D68]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3] dark:bg-[#0E1920]">
      {/* Fixed Header */}
      <header className="fixed w-full top-0 left-0 right-0 border-b border-[#D7D7D6] dark:border-[#242C34] bg-white dark:bg-[#161616] shadow-sm z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/facilitator/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-[#142619] dark:text-[#8A7D68] natus-heading">NATUS</span>
              <span className="ml-1 text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">facilitador</span>
            </Link>

            {/* Center-aligned Nav Links */}
            <nav className="hidden md:flex items-center flex-1 justify-center">
              <div className="flex space-x-6">
                <Link 
                  href="/facilitator/dashboard"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  Panel
                </Link>
                <Link 
                  href="/facilitator/dashboard/agenda"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard/agenda')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  Agenda
                </Link>
                <Link 
                  href="/facilitator/dashboard/patients"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard/patients')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  <User className="mr-1 h-4 w-4" />
                  Pacientes
                </Link>
                <Link 
                  href="/facilitator/dashboard/messages"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard/messages')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Mensajes
                </Link>
                <Link 
                  href="/facilitator/dashboard/payments"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard/payments')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  <FileText className="mr-1 h-4 w-4" />
                  Pagos
                </Link>
                <Link 
                  href="/facilitator/dashboard/invoices/create"
                  className={`flex items-center px-3 py-2 border-b-2 transition-colors natus-body ${
                    isActive('/facilitator/dashboard/invoices/create')
                      ? 'text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]'
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]'
                  }`}
                >
                  <FileText className="mr-1 h-4 w-4" />
                  Facturación
                </Link>
              </div>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button
                className="relative rounded-full p-1 text-[#6B6B6B] dark:text-[#A3A3A3] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors"
                onClick={() => {}}
              >
                <span className="sr-only">Notificaciones</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
              </button>

              <div className="relative">
                <button
                  className="flex items-center space-x-2 rounded-full focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-9 w-9 rounded-full bg-[#142619] dark:bg-[#8A7D68] flex items-center justify-center text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className="h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-[#1E2731] shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link 
                        href="/facilitator/dashboard/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-[#142619] dark:text-[#D7D7D6] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] natus-body"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Mi perfil
                      </Link>
                      <Link
                        href="/facilitator/dashboard/settings"
                        className="block w-full text-left px-4 py-2 text-sm text-[#142619] dark:text-[#D7D7D6] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] natus-body"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="inline-block mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] natus-body"
                      >
                        <LogOut className="inline-block mr-2 h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#6B6B6B] dark:text-[#A3A3A3] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Abrir menú</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white dark:bg-[#161616] border-b border-[#D7D7D6] dark:border-[#242C34]">
          <nav className="px-4 py-3">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/facilitator/dashboard"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel
                </Link>
              </li>
              <li>
                <Link
                  href="/facilitator/dashboard/agenda"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard/agenda') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="inline-block mr-2 h-4 w-4" />
                  Agenda
                </Link>
              </li>
              <li>
                <Link
                  href="/facilitator/dashboard/patients"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard/patients') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="inline-block mr-2 h-4 w-4" />
                  Pacientes
                </Link>
              </li>
              <li>
                <Link
                  href="/facilitator/dashboard/messages"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard/messages') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="inline-block mr-2 h-4 w-4" />
                  Mensajes
                </Link>
              </li>
              <li>
                <Link
                  href="/facilitator/dashboard/payments"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard/payments') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="inline-block mr-2 h-4 w-4" />
                  Pagos
                </Link>
              </li>
              <li>
                <Link
                  href="/facilitator/dashboard/invoices/create"
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    isActive('/facilitator/dashboard/invoices/create') 
                      ? 'text-[#142619] dark:text-[#8A7D68] font-medium bg-[#F9F7F3] dark:bg-[#242C34]' 
                      : 'text-[#6B6B6B] dark:text-[#A3A3A3] hover:bg-[#F9F7F3] dark:hover:bg-[#242C34] hover:text-[#142619] dark:hover:text-[#8A7D68]'
                  } natus-body transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="inline-block mr-2 h-4 w-4" />
                  Facturación
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content - adjust padding to account for fixed header */}
      <main className="pt-20">
        {children}
      </main>

      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#8A7D68]/30 dark:bg-[#8A7D68]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-10 w-72 h-72 bg-[#D7D7D6]/40 dark:bg-[#D7D7D6]/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
} 