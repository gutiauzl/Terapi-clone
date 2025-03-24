import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed w-full top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          href="/"
          prefetch
          className="flex items-center"
        >
          <Image 
            src="https://placehold.co/120x40/8B5CF6/FFFFFF?text=Terapi" 
            alt="Terapi"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Blog
          </Link>
          <Link href="/for-companies" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Para empresas
          </Link>
          <Link href="/for-psychologists" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Para psicólogos
          </Link>
        </div>
        
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full transition-all duration-300"
              >
                Mi Cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full transition-all duration-300"
              >
                Registrarse
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
