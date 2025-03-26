'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video,
  MoreVertical, 
  ChevronLeft,
  Smile,
  Image as ImageIcon,
  File,
  Calendar,
  Clock,
  Check,
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantImage: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  isOnline: boolean;
  unreadCount: number;
}

interface MessagingClientProps {
  userId: string;
  conversations: Conversation[];
}

export default function MessagingClient({ userId, conversations }: MessagingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cargar mensajes de ejemplo cuando se selecciona una conversación
  useEffect(() => {
    if (selectedConversation) {
      // En una aplicación real, aquí cargaríamos los mensajes de la base de datos
      const sampleMessages: Message[] = [
        {
          id: '1',
          senderId: selectedConversation.participantId,
          content: 'Hola, ¿cómo estás hoy?',
          timestamp: new Date(Date.now() - 86400000), // Ayer
          status: 'read',
        },
        {
          id: '2',
          senderId: userId,
          content: 'Estoy bien, gracias por preguntar. ¿Cómo va todo con las técnicas de respiración que practicamos?',
          timestamp: new Date(Date.now() - 85400000),
          status: 'read',
        },
        {
          id: '3',
          senderId: selectedConversation.participantId,
          content: 'Han sido muy útiles. Me han ayudado a manejar la ansiedad antes de las reuniones importantes.',
          timestamp: new Date(Date.now() - 84400000),
          status: 'read',
        },
        {
          id: '4',
          senderId: userId,
          content: 'Me alegra escuchar eso. Recuerda practicar regularmente, incluso cuando no sientas ansiedad, para que se convierta en un hábito.',
          timestamp: new Date(Date.now() - 80000000),
          status: 'read',
        },
        {
          id: '5',
          senderId: selectedConversation.participantId,
          content: 'Lo haré, gracias por el consejo.',
          timestamp: new Date(Date.now() - 79000000),
          status: 'read',
        },
        {
          id: '6',
          senderId: selectedConversation.participantId,
          content: 'Por cierto, quería compartir contigo el progreso que he tenido esta semana.',
          timestamp: new Date(Date.now() - 78000000),
          status: 'read',
          attachments: [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3',
              name: 'Progreso semanal'
            }
          ]
        },
        {
          id: '7',
          senderId: userId,
          content: 'Se ve muy bien. Estás haciendo un gran trabajo manteniendo la consistencia.',
          timestamp: new Date(Date.now() - 77000000),
          status: 'read',
        },
        {
          id: '8',
          senderId: userId,
          content: 'Te he preparado un documento con algunos ejercicios adicionales que podemos revisar en nuestra próxima sesión.',
          timestamp: new Date(Date.now() - 76000000),
          status: 'read',
          attachments: [
            {
              type: 'file',
              url: '#',
              name: 'Ejercicios-Mindfulness.pdf'
            }
          ]
        },
        {
          id: '9',
          senderId: selectedConversation.participantId,
          content: 'Perfecto, los revisaré antes de nuestra próxima sesión. ¿Hay algo específico en lo que debería enfocarme?',
          timestamp: new Date(Date.now() - 75000000),
          status: 'read',
        },
        {
          id: '10',
          senderId: userId,
          content: 'Enfócate principalmente en los ejercicios de la sección 3, que están diseñados para situaciones de estrés agudo.',
          timestamp: new Date(Date.now() - 74000000),
          status: 'delivered',
        },
      ];
      
      setMessages(sampleMessages);
    }
  }, [selectedConversation, userId]);

  // Desplazarse al final de los mensajes cuando se cargan o se envía uno nuevo
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Formatear tiempo relativo
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Ahora';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Hace ${diffInHours} h`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'Ayer';
    }
    
    if (diffInDays < 7) {
      return `Hace ${diffInDays} días`;
    }
    
    // Para fechas más antiguas, mostrar la fecha completa
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: diffInDays > 365 ? 'numeric' : undefined,
    });
  };

  // Formatear hora
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Verificar si un mensaje es del mismo día que el anterior
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Verificar si debemos mostrar la fecha para un mensaje
  const shouldShowDate = (message: Message, index: number): boolean => {
    if (index === 0) return true;
    
    const prevMessage = messages[index - 1];
    return !isSameDay(message.timestamp, prevMessage.timestamp);
  };

  // Agrupar mensajes consecutivos del mismo remitente
  const isConsecutive = (message: Message, index: number): boolean => {
    if (index === 0) return false;
    
    const prevMessage = messages[index - 1];
    return (
      message.senderId === prevMessage.senderId &&
      (message.timestamp.getTime() - prevMessage.timestamp.getTime()) < 300000 // 5 minutos
    );
  };

  // Enviar un nuevo mensaje
  const sendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userId,
      content: messageInput.trim(),
      timestamp: new Date(),
      status: 'sent',
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  // Manejar tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-96px)] bg-white dark:bg-[#161616] rounded-xl shadow-md dark:shadow-[#0E1920]/30 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar de conversaciones */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full md:w-80 lg:w-96 border-r border-[#D7D7D6] dark:border-[#0E1920] flex flex-col"
            >
              <div className="p-4 border-b border-[#D7D7D6] dark:border-[#0E1920]">
                <h2 className="text-lg font-semibold text-[#161616] dark:text-[#D7D7D6] mb-4 natus-heading">Mensajes</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar conversaciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-9 pr-3 bg-[#D7D7D6]/20 dark:bg-[#0E1920]/50 border border-[#D7D7D6] dark:border-[#0E1920] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] focus:border-transparent dark:text-[#D7D7D6] natus-body"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">No se encontraron conversaciones</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        if (window.innerWidth < 768) {
                          setShowSidebar(false);
                        }
                      }}
                      className={`w-full flex items-start p-4 hover:bg-[#D7D7D6]/10 dark:hover:bg-[#0E1920]/30 transition-colors relative ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-[#D7D7D6]/20 dark:bg-[#0E1920]/50'
                          : ''
                      }`}
                    >
                      <div className="relative mr-3">
                        <Image
                          src={conversation.participantImage}
                          alt={conversation.participantName}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 bg-[#142619] dark:bg-[#8A7D68] p-1.5 rounded-full border-2 border-white dark:border-[#161616]"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                            {formatRelativeTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p 
                          className={`text-sm truncate natus-body ${
                            conversation.unreadCount > 0
                              ? 'text-[#161616] dark:text-[#D7D7D6] font-medium'
                              : 'text-[#6B6B6B] dark:text-[#D7D7D6]/80'
                          }`}
                        >
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute top-4 right-4 min-w-5 h-5 flex items-center justify-center bg-[#142619] dark:bg-[#8A7D68] text-white dark:text-[#161616] text-xs font-medium rounded-full px-1.5">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Área de la conversación */}
        <motion.div 
          layout
          className="flex-1 flex flex-col h-full"
        >
          {selectedConversation ? (
            <>
              {/* Encabezado de la conversación */}
              <div className="flex items-center justify-between p-4 border-b border-[#D7D7D6] dark:border-[#0E1920]">
                <div className="flex items-center">
                  {!showSidebar && (
                    <button
                      onClick={() => setShowSidebar(true)}
                      className="p-2 mr-2 rounded-full hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/50 transition-colors md:hidden"
                    >
                      <ChevronLeft className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                    </button>
                  )}
                  <div className="relative">
                    <Image
                      src={selectedConversation.participantImage}
                      alt={selectedConversation.participantName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 bg-[#142619] dark:bg-[#8A7D68] p-1 rounded-full border-2 border-white dark:border-[#161616]"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-[#161616] dark:text-[#D7D7D6] natus-heading">
                      {selectedConversation.participantName}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] dark:text-[#D7D7D6] natus-body">
                      {selectedConversation.isOnline ? 'En línea' : 'Desconectado'}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <button className="p-2 rounded-full hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/50 transition-colors">
                    <Phone className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/50 transition-colors">
                    <Video className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[#D7D7D6]/20 dark:hover:bg-[#0E1920]/50 transition-colors">
                    <MoreVertical className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                  </button>
                </div>
              </div>

              {/* Lista de mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => {
                  const isUser = message.senderId === userId;
                  const consecutive = isConsecutive(message, index);
                  
                  return (
                    <div key={message.id} className="space-y-2">
                      {shouldShowDate(message, index) && (
                        <div className="flex justify-center my-4">
                          <span className="px-3 py-1 bg-[#D7D7D6]/20 dark:bg-[#0E1920]/30 text-[#6B6B6B] dark:text-[#D7D7D6] text-xs rounded-full natus-body">
                            {message.timestamp.toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end">
                          {!isUser && !consecutive && (
                            <div className="flex-shrink-0 mr-2">
                              <Image
                                src={selectedConversation.participantImage}
                                alt={selectedConversation.participantName}
                                width={28}
                                height={28}
                                className="rounded-full object-cover"
                              />
                            </div>
                          )}
                          {!isUser && consecutive && <div className="w-[36px]"></div>}
                          
                          <div className={`max-w-[80%] ${consecutive ? (isUser ? 'mr-0' : 'ml-0') : ''}`}>
                            <div
                              className={`rounded-xl px-4 py-2 inline-block natus-body ${
                                isUser
                                  ? 'bg-gradient-to-r from-[#142619] to-[#0E1920] text-white rounded-br-none'
                                  : 'bg-[#D7D7D6]/20 dark:bg-[#0E1920]/30 text-[#161616] dark:text-[#D7D7D6] rounded-bl-none'
                              }`}
                            >
                              <p className="whitespace-pre-wrap break-words">{message.content}</p>
                              
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment, i) => (
                                    <div key={i} className="rounded-lg overflow-hidden">
                                      {attachment.type === 'image' ? (
                                        <div className="relative">
                                          <Image
                                            src={attachment.url}
                                            alt={attachment.name || 'Imagen adjunta'}
                                            width={300}
                                            height={200}
                                            className="rounded-lg max-h-48 w-auto object-cover"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="p-2 bg-white rounded-full">
                                              <ImageIcon className="h-4 w-4 text-[#161616]" />
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <a
                                          href={attachment.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`flex items-center p-2 rounded-lg natus-body ${
                                            isUser
                                              ? 'bg-[#0E1920] hover:bg-[#142619]'
                                              : 'bg-[#D7D7D6]/30 dark:bg-[#0E1920]/50 hover:bg-[#D7D7D6]/50 dark:hover:bg-[#0E1920]/70'
                                          } transition-colors`}
                                        >
                                          <File className="h-4 w-4 mr-2" />
                                          <span className="text-sm truncate">
                                            {attachment.name || 'Archivo adjunto'}
                                          </span>
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className={`text-xs mt-1 flex items-center ${isUser ? 'justify-end' : 'justify-start'}`}>
                              <span className="text-[#6B6B6B] dark:text-[#D7D7D6] mr-1 natus-body">
                                {formatTime(message.timestamp)}
                              </span>
                              {isUser && (
                                <span className="text-[#6B6B6B] dark:text-[#D7D7D6]">
                                  {message.status === 'sent' && <Check className="h-3 w-3" />}
                                  {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                                  {message.status === 'read' && <CheckCheck className="h-3 w-3 text-[#142619] dark:text-[#8A7D68]" />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>

              {/* Área de entrada de mensaje */}
              <div className="p-4 border-t border-[#D7D7D6] dark:border-[#0E1920]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full py-3 px-4 pr-24 bg-[#D7D7D6]/20 dark:bg-[#0E1920]/50 border border-[#D7D7D6] dark:border-[#0E1920] rounded-full focus:outline-none focus:ring-2 focus:ring-[#142619] dark:focus:ring-[#8A7D68] focus:border-transparent dark:text-[#D7D7D6] natus-body"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button className="p-1.5 rounded-full hover:bg-[#D7D7D6]/30 dark:hover:bg-[#0E1920]/70 transition-colors">
                      <Smile className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-[#D7D7D6]/30 dark:hover:bg-[#0E1920]/70 transition-colors">
                      <Paperclip className="h-5 w-5 text-[#6B6B6B] dark:text-[#D7D7D6]" />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!messageInput.trim()}
                      className={`p-1.5 rounded-full ${
                        messageInput.trim()
                          ? 'bg-[#142619] hover:bg-[#0E1920] text-white'
                          : 'bg-[#D7D7D6]/50 dark:bg-[#0E1920]/70 text-[#6B6B6B] dark:text-[#D7D7D6]/50 cursor-not-allowed'
                      } transition-colors`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-[#6B6B6B] dark:text-[#D7D7D6]">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#142619]/10 dark:bg-[#8A7D68]/20">
                <MessageSquare className="h-8 w-8 text-[#142619] dark:text-[#8A7D68]" />
              </div>
              <h3 className="text-lg font-medium text-[#161616] dark:text-[#D7D7D6] mb-2 natus-heading">Tus mensajes</h3>
              <p className="max-w-md mb-4 natus-body">
                Selecciona una conversación para ver tus mensajes o comienza una nueva conversación con tu terapeuta.
              </p>
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#142619] to-[#0E1920] hover:from-[#0E1920] hover:to-[#142619] text-white rounded-full transition-colors natus-body"
                >
                  Ver conversaciones
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 