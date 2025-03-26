import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Phone, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0E1920] border-t border-[#D7D7D6] dark:border-[#161616] py-16">
      <div className="container mx-auto px-4">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/natus-logo.svg" 
                alt="NATUS" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mt-2 max-w-sm natus-body">
              La plataforma de psicología online más completa de latinoamérica
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-[#6B6B6B] hover:text-[#142619] dark:hover:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#161616] p-2 rounded-full transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#6B6B6B] hover:text-[#142619] dark:hover:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#161616] p-2 rounded-full transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#6B6B6B] hover:text-[#142619] dark:hover:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#161616] p-2 rounded-full transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@natus.com" className="text-[#6B6B6B] hover:text-[#142619] dark:hover:text-[#8A7D68] bg-[#D7D7D6] dark:bg-[#161616] p-2 rounded-full transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div>
            <h3 className="font-medium text-[#161616] dark:text-white mb-4 natus-heading">Sobre Nosotros</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Políticas de Privacidad</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Prensa y Medios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#161616] dark:text-white mb-4 natus-heading">Para Empresas</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">NATUS para Empresas</Link></li>
              <li><Link href="/for-facilitators" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Para Psicólogos</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Programa de Afiliados</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#161616] dark:text-white mb-4 natus-heading">Ayuda y Soporte</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Centro de Ayuda</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">Emergencias</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#161616] dark:text-white mb-4 natus-heading">Descargar App</h3>
            <div className="space-y-3">
              <Link href="#" className="block">
                <Image 
                  src="https://placehold.co/120x40/0E1920/FFFFFF?text=App+Store" 
                  alt="App Store" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto rounded hover:opacity-90 transition-opacity"
                />
              </Link>
              <Link href="#" className="block">
                <Image 
                  src="https://placehold.co/120x40/142619/FFFFFF?text=Google+Play" 
                  alt="Google Play" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto rounded hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-[#161616] dark:text-white mb-4 natus-heading">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-[#142619] dark:text-[#8A7D68] mr-2" />
                <a href="mailto:prensa@natus.com" className="text-sm text-[#142619] dark:text-[#8A7D68] font-medium natus-body">prensa@natus.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-[#142619] dark:text-[#8A7D68] mr-2" />
                <a href="tel:+56912345678" className="text-sm text-[#142619] dark:text-[#8A7D68] font-medium natus-body">+56 9 1234 5678</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#D7D7D6] dark:border-[#161616] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#6B6B6B] dark:text-[#D7D7D6] mb-4 md:mb-0 natus-body">© {currentYear} NATUS HEALTH SPA. Todos los derechos reservados.</p>
          <div className="flex items-center text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" />
            <span>para que encuentres la ayuda que mereces</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
