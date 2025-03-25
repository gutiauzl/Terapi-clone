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
    <nav className="fixed w-full top-0 left-0 right-0 border-b border-[#D7D7D6] dark:border-[#0E1920] bg-white dark:bg-[#0E1920] z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          href="/"
          prefetch
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
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className="text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">
            Blog
          </Link>
          <Link href="/for-companies" className="text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">
            Para empresas
          </Link>
          <Link href="/for-psychologists" className="text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body">
            Para psicólogos
          </Link>
        </div>
        
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full transition-all duration-300 natus-body"
              >
                Mi Cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors natus-body"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full transition-all duration-300 natus-body"
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
