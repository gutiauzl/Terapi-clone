'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles, Brain, Users, Heart, BrainCircuit, Star, CircleUser } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#D7D7D6]/20 dark:from-[#161616] dark:to-[#0E1920]/20 pt-32 pb-16">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-0 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#D7D7D6]/30 dark:bg-[#8A7D68]/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8A7D68]/20 dark:bg-[#8A7D68]/30 text-[#142619] dark:text-[#D7D7D6] text-sm font-medium mb-4 natus-body">
            <Brain className="w-4 h-4 mr-2" />
            Natus IA Assistant
          </div>
          <div className="mx-auto text-center max-w-4xl mb-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#161616] dark:text-[#D7D7D6] mb-6 natus-heading">
              Ecosistema de IA que Democratiza el Bienestar Espiritual y Mental
            </h1>
            <p className="text-lg md:text-xl text-[#6B6B6B] dark:text-[#D7D7D6] max-w-3xl mx-auto mb-8 natus-body">
              Herramientas personalizadas para usuarios y tecnología adaptativa para potenciar 
              a terapeutas, conectados por nuestra IA revolucionaria.
            </p>
          </div>
          
          {/* IA Ecosystem Visualization */}
          <div className="relative my-12 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full border-4 border-dashed border-[#8A7D68]/40 dark:border-[#8A7D68]/30 animate-spin-slow"></div>
            </div>
            
            {/* Outer Circle */}
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#142619]/20 dark:border-[#8A7D68]/20 flex items-center justify-center">
                
                {/* User Node - Left */}
                <div className="absolute -left-16 sm:-left-10 transform -translate-y-1/4">
                  <div className="bg-white dark:bg-[#161616] shadow-lg rounded-xl p-3 sm:p-4 w-32 sm:w-40">
                    <div className="flex items-center mb-2">
                      <CircleUser className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-2" />
                      <span className="font-medium text-[#161616] dark:text-[#D7D7D6] text-sm sm:text-base natus-heading">Usuario</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Bienestar personal</p>
                  </div>
                </div>
                
                {/* Facilitator Node - Right */}
                <div className="absolute -right-16 sm:-right-10 transform -translate-y-1/4">
                  <div className="bg-white dark:bg-[#161616] shadow-lg rounded-xl p-3 sm:p-4 w-32 sm:w-40">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#142619] dark:text-[#8A7D68] mr-2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      <span className="font-medium text-[#161616] dark:text-[#D7D7D6] text-sm sm:text-base natus-heading">Facilitador</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">Impacto global</p>
                  </div>
                </div>
                
                {/* Central IA Element */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#142619] to-[#0E1920] dark:from-[#8A7D68] dark:to-[#D7D7D6]/90 flex items-center justify-center text-white z-10">
                  <div className="text-center">
                    <Brain className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-xs font-semibold uppercase">IA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quote */}
          <div className="bg-gradient-to-r from-[#142619]/10 to-[#0E1920]/10 dark:from-[#8A7D68]/20 dark:to-[#D7D7D6]/10 p-6 rounded-xl max-w-3xl mx-auto mb-10 natus-body italic">
            <p className="text-center text-[#6B6B6B] dark:text-[#D7D7D6]">
              "Un ecosistema donde cada interacción alimenta la IA... y la IA alimenta el crecimiento de todos."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/auth/login" 
              className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] rounded-full hover:shadow-lg transition-all duration-300 text-base font-medium natus-body"
            >
              Comenzar Ahora
              <Star className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/for-facilitators" 
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-[#161616] border border-[#D7D7D6] dark:border-[#2F2F2F] text-[#161616] dark:text-[#D7D7D6] rounded-full hover:shadow-lg transition-all duration-300 text-base font-medium natus-body"
            >
              Para Facilitadores
              <Users className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
