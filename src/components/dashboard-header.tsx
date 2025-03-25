'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
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

export default function DashboardHeader({ user }: { user: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="fixed w-full top-0 left-0 right-0 border-b border-[#D7D7D6] dark:border-[#0E1920] bg-white dark:bg-[#0E1920] z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <Image 
                src="/natus-logo.svg" 
                alt="NATUS"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

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
              className="flex items-center px-3 py-2 text-sm font-medium text-[#142619] dark:text-[#8A7D68] border-b-2 border-[#142619] dark:border-[#8A7D68] natus-body"
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className="flex items-center px-3 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] border-b-2 border-transparent hover:border-[#142619] dark:hover:border-[#8A7D68] transition-colors natus-body"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className="flex items-center px-3 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] border-b-2 border-transparent hover:border-[#142619] dark:hover:border-[#8A7D68] transition-colors natus-body"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensajes
            </Link>
          </nav>

          {/* Right side - notifications, theme toggle, profile */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <button className="relative p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
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
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#161616] ring-1 ring-[#D7D7D6] dark:ring-[#0E1920] ring-opacity-5 divide-y divide-[#D7D7D6] dark:divide-[#0E1920]">
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
                      onClick={() => setIsProfileOpen(false)}
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
              className="flex items-center px-3 py-2 text-sm font-medium text-[#142619] dark:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#0E1920]/50 rounded-lg natus-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className="flex items-center px-3 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616] rounded-lg natus-body"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className="flex items-center px-3 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6] dark:hover:bg-[#161616] rounded-lg natus-body"
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