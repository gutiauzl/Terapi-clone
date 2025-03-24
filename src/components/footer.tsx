import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Phone, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-16">
      <div className="container mx-auto px-4">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="https://placehold.co/120x40/8B5CF6/FFFFFF?text=Terapi" 
                alt="Terapi" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
              La plataforma de psicología online más completa de latinoamérica
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@terapi.com" className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Sobre Nosotros</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Políticas de Privacidad</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Prensa y Medios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Para Empresas</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terapi para Empresas</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Para Psicólogos</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Programa de Afiliados</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Ayuda y Soporte</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Emergencias</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Descargar App</h3>
            <div className="space-y-3">
              <Link href="#" className="block">
                <Image 
                  src="https://placehold.co/120x40/000000/FFFFFF?text=App+Store" 
                  alt="App Store" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto rounded hover:opacity-90 transition-opacity"
                />
              </Link>
              <Link href="#" className="block">
                <Image 
                  src="https://placehold.co/120x40/333333/FFFFFF?text=Google+Play" 
                  alt="Google Play" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto rounded hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
                <a href="mailto:prensa@terapi.com" className="text-sm text-purple-600 dark:text-purple-400 font-medium">prensa@terapi.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
                <a href="tel:+56912345678" className="text-sm text-purple-600 dark:text-purple-400 font-medium">+56 9 1234 5678</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">© {currentYear} Psyquefeel SPA. Todos los derechos reservados.</p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" />
            <span>para que encuentres la ayuda que mereces</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
