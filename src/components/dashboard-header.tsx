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
    <header className="fixed w-full top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <Image 
                src="https://placehold.co/120x40/8B5CF6/FFFFFF?text=Terapi" 
                alt="Terapi"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <button 
              className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
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
              className="flex items-center px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 border-b-2 border-transparent hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 border-b-2 border-transparent hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensajes
            </Link>
          </nav>

          {/* Right side - notifications, theme toggle, profile */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleProfile}
              >
                <div className="relative h-8 w-8 bg-purple-100 dark:bg-purple-800 rounded-full overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-purple-600 dark:text-purple-200">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700">
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Miembro desde {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/profile-settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <div className="md:hidden bg-white dark:bg-gray-900 pb-3 px-4 border-t border-gray-100 dark:border-gray-800">
          <nav className="flex flex-col space-y-2 mt-2">
            <Link 
              href="/dashboard" 
              className="flex items-center px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Panel
            </Link>
            <Link 
              href="/appointments" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Mis Citas
            </Link>
            <Link 
              href="/messaging" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensajes
            </Link>
            <Link 
              href="/profile-settings" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
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