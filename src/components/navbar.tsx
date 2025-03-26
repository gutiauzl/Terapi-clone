'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { createClient } from "../../supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Determinar qué opción está activa basada en la ruta
  const isForUsers = !pathname.includes('/for-facilitators') && !pathname.includes('/facilitator');
  const isForPsychologists = pathname.includes('/for-facilitators') || pathname.includes('/facilitator');

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      
      // Verificar si estamos en proceso de logout
      const isLogout = searchParams.get('logout') === 'true';
      
      // Si hay un parámetro de logout, realizar una limpieza adicional
      if (isLogout) {
        // Limpiar datos de localStorage relacionados con la sesión
        for (const key in localStorage) {
          if (key.includes('supabase') || key.includes('sb-') || key.includes('auth')) {
            localStorage.removeItem(key);
          }
        }
        
        // Limpiar cookies relacionadas con la sesión
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          if (name.includes('sb-') || name.includes('supabase') || name.includes('auth')) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }
        });
      }
      
      try {
        // Verificar la sesión de Supabase
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session) {
          const { data } = await supabase.auth.getUser();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUser();
  }, [searchParams]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 left-0 right-0 border-b border-[#D7D7D6] dark:border-[#0E1920] bg-white dark:bg-[#0E1920] z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 relative">
        {/* Logo - Left side */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center"
          >
            <Image 
              src="/natus-logo.svg" 
              alt="NATUS"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        {/* Navigation - Centered */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors natus-body py-1 px-2 ${
                isForUsers 
                  ? "text-[#142619] dark:text-[#8A7D68] border-b-2 border-[#142619] dark:border-[#8A7D68]" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]"
              }`}
            >
              Para Usuarios
            </Link>
            <Link 
              href="/for-facilitators" 
              className={`font-medium transition-colors natus-body py-1 px-2 ${
                isForPsychologists 
                  ? "text-[#142619] dark:text-[#8A7D68] border-b-2 border-[#142619] dark:border-[#8A7D68]" 
                  : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]"
              }`}
            >
              Para Psicólogos
            </Link>
          </div>
        </div>
        
        {/* User controls - Right side */}
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          
          {isLoading ? (
            <div className="w-24 h-9 bg-[#D7D7D6]/30 dark:bg-[#0E1920]/30 rounded-full animate-pulse"></div>
          ) : user ? (
            <>
              <Link
                href={isForPsychologists ? "/facilitator/dashboard" : "/dashboard"}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full transition-all duration-300 natus-body"
              >
                Mi Cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                href={isForPsychologists ? "/facilitator/sign-in" : "/sign-in"}
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body"
              >
                Iniciar Sesión
              </Link>
              <Link
                href={isForPsychologists ? "/facilitator/sign-up" : "/sign-up"}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full transition-all duration-300 natus-body"
              >
                Registrarse
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0E1920] border-t border-[#D7D7D6] dark:border-[#0E1920]">
          <div className="py-2 px-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`py-2 font-medium transition-colors natus-body ${
                  isForUsers 
                    ? "text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6]/30 dark:bg-[#142619]/30 px-3 rounded-lg" 
                    : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]"
                }`}
                onClick={toggleMenu}
              >
                Para Usuarios
              </Link>
              <Link 
                href="/for-facilitators" 
                className={`py-2 font-medium transition-colors natus-body ${
                  isForPsychologists 
                    ? "text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6]/30 dark:bg-[#142619]/30 px-3 rounded-lg" 
                    : "text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68]"
                }`}
                onClick={toggleMenu}
              >
                Para Psicólogos
              </Link>
              {!user && !isLoading && (
                <Link
                  href={isForPsychologists ? "/facilitator/sign-in" : "/sign-in"}
                  className="text-[#6B6B6B] dark:text-[#D7D7D6] py-2 hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body"
                  onClick={toggleMenu}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
