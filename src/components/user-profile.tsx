'use client'
import { UserCircle } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { createClient } from '../../supabase/client'
import { useRouter } from 'next/navigation'

export default function UserProfile() {
    const supabase = createClient()
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={async () => {
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
                }}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}