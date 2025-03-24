import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 opacity-90" />
      
      {/* Animated particles/circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Encuentra ayuda profesional en minutos
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              Encuentra a tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                Psicólogo Ideal
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              En Terapi encontrarás terapeutas profesionales que te ayudarán a lograr todos tus objetivos. 
              Responde un pequeño cuestionario y encontraremos al terapeuta ideal para ti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-3.5 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium group"
              >
                <span>COMENZAR</span>
                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/for-psychologists"
                className="inline-flex items-center px-8 py-3.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:shadow-md transition-all duration-300 text-lg font-medium"
              >
                Soy Psicólogo
              </Link>
            </div>

            <div className="flex justify-center items-center mb-12">
              <div className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Image 
                      key={i}
                      src={`https://placehold.co/100x100/9F7AEA/FFFFFF?text=U${i}`}
                      alt="User" 
                      width={32} 
                      height={32} 
                      className="rounded-full border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Más de 100 mil usuarios satisfechos</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
              <div className="flex flex-col items-center">
                <Image 
                  src="https://placehold.co/140x42/333333/FFFFFF?text=Google+Play" 
                  alt="Google Play" 
                  width={140} 
                  height={42} 
                  className="mb-2 rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="flex flex-col items-center">
                <Image 
                  src="https://placehold.co/140x42/000000/FFFFFF?text=App+Store" 
                  alt="App Store" 
                  width={140} 
                  height={42} 
                  className="mb-2 rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Hablan de Nosotros</span>
                <Image 
                  src="https://placehold.co/70x30/CC0000/FFFFFF?text=CNN" 
                  alt="CNN" 
                  width={70} 
                  height={30}
                  className="rounded hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Usa tus beneficios de:</span>
                <Image 
                  src="https://placehold.co/70x30/0066CC/FFFFFF?text=Seguros" 
                  alt="Insurance Company" 
                  width={70} 
                  height={30}
                  className="rounded hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
