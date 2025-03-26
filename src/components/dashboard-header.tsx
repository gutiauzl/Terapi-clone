'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, 
  Calendar, 
  Settings, 
  MessageSquare, 
  LogOut, 
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { createClient } from "../../supabase/client";

export default function DashboardHeader({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleSignOut = async () => {
    try {
      // Cerrar sesión en Supabase
      await supabase.auth.signOut();
      
      // Limpiar exhaustivamente cualquier dato de sesión en localStorage
      for (const key in localStorage) {
        if (key.includes('supabase') || key.includes('sb-') || key.includes('auth')) {
          localStorage.removeItem(key);
        }
      }
      
      // Eliminar cookies específicas
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        if (name.includes('sb-') || name.includes('supabase') || name.includes('auth')) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });
      
      // Esperar un momento para asegurar que la sesión se ha eliminado
      setTimeout(() => {
        // Redireccionar y forzar recarga completa
        window.location.href = '/?logout=true';
      }, 100);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // En caso de error, intentamos la redirección de todos modos
      window.location.href = '/?logout=true';
    }
  };

  // Navegación a la página principal
  const navigateToHome = () => {
    // Usar window.location para navegación tradicional en lugar de router de Next.js
    window.location.href = '/';
  };

  // Cierra los dropdowns al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isProfileOpen && !target.closest('[data-profile-menu]')) {
        setIsProfileOpen(false);
      }
      
      if (isNotificationsOpen && !target.closest('[data-notifications-menu]')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileOpen, isNotificationsOpen]);

  // Datos de ejemplo para notificaciones
  const notifications = [
    {
      id: 1,
      title: 'Recordatorio de cita',
      message: 'Tienes una sesión con Dra. María González mañana a las 15:00.',
      time: '2 horas',
      read: false
    },
    {
      id: 2,
      title: 'Nuevo mensaje',
      message: 'Dr. Alejandro Montero te ha enviado un mensaje.',
      time: '1 día',
      read: false
    },
    {
      id: 3,
      title: 'Pago confirmado',
      message: 'Tu pago para la sesión del 15 de julio ha sido procesado.',
      time: '3 días',
      read: true
    }
  ];

  return (
    <header className="fixed w-full top-0 left-0 right-0 border-b border-[#D7D7D6] dark:border-[#0E1920] bg-white dark:bg-[#0E1920] z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            {/* Reemplazar Link con un botón que usa navegación tradicional */}
            <a 
              href="/"
              className="flex items-center mr-8"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome();
              }}
            >
              <Image 
                src="/natus-logo.svg" 
                alt="NATUS"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>

            <button 
              className="md:hidden p-2 rounded-full bg-[#D7D7D6] dark:bg-[#161616] text-[#6B6B6B] dark:text-[#D7D7D6]"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className={`flex items-center px-3 py-2 text-sm font-medium border-b-2 transition-colors natus-body ${
                isActiveLink("/dashboard") 
                  ? "text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]"
              }`}
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className={`flex items-center px-3 py-2 text-sm font-medium border-b-2 transition-colors natus-body ${
                isActiveLink("/appointments") 
                  ? "text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]"
              }`}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className={`flex items-center px-3 py-2 text-sm font-medium border-b-2 transition-colors natus-body ${
                isActiveLink("/messaging") 
                  ? "text-[#142619] dark:text-[#8A7D68] border-[#142619] dark:border-[#8A7D68]" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] border-transparent hover:text-[#142619] dark:hover:text-[#8A7D68] hover:border-[#142619] dark:hover:border-[#8A7D68]"
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensajes
            </Link>
          </nav>

          {/* Right side - notifications, theme toggle, profile */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <div className="relative" data-notifications-menu>
              <button 
                className="relative p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-[#161616] ring-1 ring-[#D7D7D6] dark:ring-[#0E1920] ring-opacity-5 z-50">
                  <div className="p-3 border-b border-[#D7D7D6] dark:border-[#0E1920]">
                    <h3 className="text-sm font-semibold text-[#161616] dark:text-[#D7D7D6] natus-heading">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-[#D7D7D6] dark:divide-[#0E1920]">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/30 ${
                              !notification.read ? 'bg-[#142619]/5 dark:bg-[#8A7D68]/10' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">{notification.title}</p>
                              <span className="text-xs text-[#6B6B6B] dark:text-[#8A7D68] natus-body">hace {notification.time}</span>
                            </div>
                            <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">{notification.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">No tienes notificaciones nuevas</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-[#D7D7D6] dark:border-[#0E1920] text-center">
                    <button 
                      className="text-xs text-[#142619] dark:text-[#8A7D68] hover:underline natus-body"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      Marcar todas como leídas
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative" data-profile-menu>
              <button 
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#D7D7D6] dark:hover:bg-[#161616] transition-colors"
                onClick={toggleProfile}
              >
                <div className="relative h-8 w-8 bg-[#8A7D68] dark:bg-[#142619] rounded-full overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#D7D7D6] dark:text-[#8A7D68]">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#161616] ring-1 ring-[#D7D7D6] dark:ring-[#0E1920] ring-opacity-5 divide-y divide-[#D7D7D6] dark:divide-[#0E1920] z-50">
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] natus-body">{user.email}</p>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#8A7D68] mt-1">Miembro desde {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/profile-settings" 
                      className="flex items-center px-4 py-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#0E1920] natus-body"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#0E1920] natus-body"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0E1920] pb-3 px-4 border-t border-[#D7D7D6] dark:border-[#0E1920]">
          <nav className="flex flex-col space-y-2 mt-2">
            <Link 
              href="/dashboard" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg natus-body ${
                isActiveLink("/dashboard") 
                  ? "text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#0E1920]/50" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg natus-body ${
                isActiveLink("/appointments") 
                  ? "text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#0E1920]/50" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg natus-body ${
                isActiveLink("/messaging") 
                  ? "text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#0E1920]/50" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensajes
            </Link>
            <Link 
              href="/profile-settings" 
              className="flex items-center px-3 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616] rounded-lg natus-body"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configuración
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 