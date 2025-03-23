import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle, Brain } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-2xl font-bold flex items-center text-teal-600"
        >
          <Brain className="mr-2 h-6 w-6" />
          Terapi
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/#features" className="text-gray-600 hover:text-teal-600">
            Cómo Funciona
          </Link>
          <Link href="/#pricing" className="text-gray-600 hover:text-teal-600">
            Planes
          </Link>
          <Link href="/#" className="text-gray-600 hover:text-teal-600">
            Terapeutas
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Mi Cuenta
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
