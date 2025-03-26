'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Send, Paperclip, MoreVertical, ChevronDown, Phone, Video, Users, Star, Clock } from 'lucide-react';
import { createClient } from '../../../../../supabase/client';

// Create a single supabase client instance
const supabase = createClient();

export default function FacilitatorMessages() {
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<number | null>(1); // ID del chat activo
  const [messageInput, setMessageInput] = useState('');
  
  useEffect(() => {
    const getUser = async () => {
      try {
        // Solo cargamos los datos necesarios para la página
        const { data } = await supabase.auth.getSession();
        setLoading(false);
      } catch (error) {
        console.error("Error getting user:", error);
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  // Datos de ejemplo de contactos
  const contacts = [
    {
      id: 1,
      name: "Ana Silva",
      lastMessage: "¿Podemos agendar una cita la próxima semana?",
      time: "10:30 AM",
      unread: 2,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      online: true
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      lastMessage: "Gracias por la sesión de ayer, me siento mucho mejor",
      time: "Ayer",
      unread: 0,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      online: false
    },
    {
      id: 3,
      name: "María González",
      lastMessage: "¿Tiene disponibilidad para el viernes?",
      time: "Lun",
      unread: 0,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      online: true
    },
    {
      id: 4,
      name: "Luis Ramírez",
      lastMessage: "Necesito cambiar mi cita para la próxima semana",
      time: "2 Abr",
      unread: 0,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      online: false
    },
    {
      id: 5,
      name: "Diana Torres",
      lastMessage: "He practicado los ejercicios que me recomendó",
      time: "28 Mar",
      unread: 0,
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      online: false
    }
  ];

  // Datos de ejemplo de mensajes
  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Hola Dr., espero que esté bien. Me gustaría agendar una sesión para la próxima semana.",
      time: "10:20 AM",
      date: "Hoy"
    },
    {
      id: 2,
      senderId: "me",
      text: "Hola Ana, estoy bien gracias. Por supuesto, tengo disponibilidad el martes y jueves por la tarde.",
      time: "10:22 AM",
      date: "Hoy"
    },
    {
      id: 3,
      senderId: 1,
      text: "Perfecto, el martes me vendría bien. ¿Podría ser a las 5 PM?",
      time: "10:25 AM",
      date: "Hoy"
    },
    {
      id: 4,
      senderId: "me",
      text: "Sí, 5 PM está disponible. Lo agendo en el sistema.",
      time: "10:26 AM",
      date: "Hoy"
    },
    {
      id: 5,
      senderId: 1,
      text: "¡Muchas gracias! Nos vemos el martes.",
      time: "10:28 AM",
      date: "Hoy"
    },
    {
      id: 6,
      senderId: 1,
      text: "Por cierto, ¿podríamos repasar los ejercicios de respiración en la próxima sesión? He notado que me ayudan mucho.",
      time: "10:30 AM",
      date: "Hoy"
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    // Aquí se manejaría el envío del mensaje
    console.log("Mensaje enviado:", messageInput);
    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#142619] dark:border-[#8A7D68]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#161616] dark:text-[#D7D7D6] natus-heading">Mensajes</h1>
          <p className="text-[#6B6B6B] dark:text-[#D7D7D6] mt-1 natus-body">
            Gestiona tus conversaciones con pacientes
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161616] rounded-xl shadow-sm overflow-hidden h-[calc(100vh-220px)] min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Lista de contactos */}
          <div className="border-r border-[#D7D7D6] dark:border-[#242C34]">
            <div className="p-4 border-b border-[#D7D7D6] dark:border-[#242C34]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                <input 
                  type="text" 
                  placeholder="Buscar conversación" 
                  className="w-full pl-10 pr-4 py-2 border border-[#D7D7D6] dark:border-[#242C34] bg-white dark:bg-[#161616] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] natus-body"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-76px)]">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`flex items-center p-4 hover:bg-[#D7D7D6]/10 dark:hover:bg-[#242C34]/40 transition-colors cursor-pointer border-b border-[#D7D7D6]/30 dark:border-[#242C34]/30 ${activeChat === contact.id ? 'bg-[#D7D7D6]/20 dark:bg-[#242C34]/50' : ''}`}
                >
                  <div className="relative">
                    <Image 
                      src={contact.image} 
                      alt={contact.name} 
                      width={48} 
                      height={48} 
                      className="rounded-full object-cover h-12 w-12" 
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-[#161616]"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#161616] dark:text-[#D7D7D6] truncate natus-heading">
                        {contact.name}
                      </h3>
                      <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                        {contact.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] truncate natus-body">
                        {contact.lastMessage}
                      </p>
                      {contact.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#142619] dark:bg-[#8A7D68] text-white text-xs">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Área de chat */}
          <div className="col-span-2 flex flex-col h-full">
            {activeChat ? (
              <>
                {/* Encabezado de chat */}
                <div className="p-4 border-b border-[#D7D7D6] dark:border-[#242C34] flex justify-between items-center">
                  <div className="flex items-center">
                    <Image 
                      src={contacts.find(c => c.id === activeChat)?.image || ''} 
                      alt={contacts.find(c => c.id === activeChat)?.name || ''} 
                      width={40} 
                      height={40} 
                      className="rounded-full mr-3 object-cover h-10 w-10" 
                    />
                    <div>
                      <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                        {contacts.find(c => c.id === activeChat)?.name}
                      </h3>
                      <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] flex items-center natus-body">
                        {contacts.find(c => c.id === activeChat)?.online ? (
                          <>
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                            En línea
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Última vez hoy a las 9:45 AM
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full bg-[#D7D7D6]/10 dark:bg-[#242C34]/30 text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/20 dark:hover:bg-[#242C34]/50 transition-colors">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full bg-[#D7D7D6]/10 dark:bg-[#242C34]/30 text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/20 dark:hover:bg-[#242C34]/50 transition-colors">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full bg-[#D7D7D6]/10 dark:bg-[#242C34]/30 text-[#6B6B6B] dark:text-[#D7D7D6] hover:bg-[#D7D7D6]/20 dark:hover:bg-[#242C34]/50 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#F9F7F3]/50 dark:bg-[#0E1920]/30">
                  {messages.map((message, index) => {
                    const isMe = message.senderId === "me";
                    // Mostrar fecha si es el primer mensaje o si cambia la fecha
                    const showDate = index === 0 || messages[index - 1].date !== message.date;
                    
                    return (
                      <React.Fragment key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="px-3 py-1 bg-[#D7D7D6]/30 dark:bg-[#242C34]/50 rounded-full text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                              {message.date}
                            </span>
                          </div>
                        )}
                        <div className={`flex mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {!isMe && (
                            <div className="flex-shrink-0 mr-3">
                              <Image 
                                src={contacts.find(c => c.id === message.senderId)?.image || ''} 
                                alt={contacts.find(c => c.id === message.senderId)?.name || ''} 
                                width={36} 
                                height={36} 
                                className="rounded-full h-9 w-9 object-cover" 
                              />
                            </div>
                          )}
                          <div className={`max-w-[70%] ${isMe ? 'bg-[#142619] dark:bg-[#8A7D68] text-white' : 'bg-white dark:bg-[#161616] text-[#161616] dark:text-[#D7D7D6]'} p-3 rounded-lg shadow-sm natus-body`}>
                            <p>{message.text}</p>
                            <div className={`text-xs mt-1 text-right ${isMe ? 'text-white/80' : 'text-[#6B6B6B] dark:text-[#D7D7D6]/80'}`}>
                              {message.time}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Input de mensaje */}
                <div className="p-4 border-t border-[#D7D7D6] dark:border-[#242C34]">
                  <div className="flex items-end">
                    <button className="p-2 text-[#6B6B6B] dark:text-[#D7D7D6] hover:text-[#142619] dark:hover:text-[#8A7D68] transition-colors">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <div className="flex-1 mx-2">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Escribe un mensaje..."
                        className="w-full px-4 py-2 border border-[#D7D7D6] dark:border-[#242C34] bg-white dark:bg-[#161616] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] text-[#161616] dark:text-[#D7D7D6] resize-none h-10 max-h-32 natus-body"
                        rows={1}
                      />
                    </div>
                    <button 
                      onClick={handleSendMessage}
                      className={`p-2 rounded-full ${messageInput.trim() ? 'bg-[#142619] dark:bg-[#8A7D68] text-white' : 'bg-[#D7D7D6]/30 dark:bg-[#242C34]/50 text-[#6B6B6B] dark:text-[#D7D7D6]'} transition-colors`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <Users className="h-16 w-16 text-[#D7D7D6]/30 dark:text-[#242C34]/50 mb-4" />
                <h3 className="text-lg font-medium text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">
                  Selecciona una conversación
                </h3>
                <p className="text-[#6B6B6B] dark:text-[#D7D7D6] max-w-md natus-body">
                  Elige un paciente de la lista para ver y responder sus mensajes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 