'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft, 
  Brain, 
  Heart, 
  Users, 
  Clock,
  Sparkles 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  id: number;
  text: string;
  description?: string;
  icon?: React.ReactNode;
  options: { id: string; text: string; description?: string }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué tipo de terapia estás buscando?",
    description: "Selecciona la opción que mejor se adapte a tu situación actual",
    icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    options: [
      { id: "individual", text: "Terapia individual", description: "Sesiones uno a uno con un terapeuta" },
      { id: "couple", text: "Terapia de pareja", description: "Para mejorar la relación y comunicación" },
      { id: "family", text: "Terapia familiar", description: "Para resolver conflictos familiares" },
      { id: "child", text: "Terapia infantil", description: "Especializada para niños y adolescentes" }
    ]
  },
  {
    id: 2,
    text: "¿Cuál es tu principal motivo de consulta?",
    description: "Esto nos ayudará a encontrar un especialista adecuado",
    icon: <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
    options: [
      { id: "anxiety", text: "Ansiedad", description: "Preocupación excesiva, nerviosismo o miedo" },
      { id: "depression", text: "Depresión", description: "Tristeza persistente, pérdida de interés" },
      { id: "relationship", text: "Problemas de relación", description: "Dificultades en relaciones personales" },
      { id: "stress", text: "Estrés", description: "Sensación de estar abrumado por las presiones diarias" },
      { id: "other", text: "Otro", description: "Cualquier otro motivo no mencionado" }
    ]
  },
  {
    id: 3,
    text: "¿Has asistido a terapia antes?",
    description: "Tu experiencia previa nos ayuda a personalizar mejor la atención",
    icon: <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    options: [
      { id: "yes", text: "Sí", description: "He tenido experiencia previa con terapia" },
      { id: "no", text: "No", description: "Esta será mi primera experiencia en terapia" }
    ]
  },
  {
    id: 4,
    text: "¿Prefieres un terapeuta de algún género específico?",
    description: "Tu comodidad es importante para el proceso terapéutico",
    icon: <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    options: [
      { id: "female", text: "Mujer", description: "Prefiero una terapeuta mujer" },
      { id: "male", text: "Hombre", description: "Prefiero un terapeuta hombre" },
      { id: "no_pref", text: "No tengo preferencia", description: "El género del terapeuta no es relevante para mí" }
    ]
  },
  {
    id: 5,
    text: "¿Qué rango de horarios prefieres para tus sesiones?",
    description: "Selecciona el horario que mejor se adapte a tu rutina",
    icon: <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />,
    options: [
      { id: "morning", text: "Mañana (8am - 12pm)", description: "Horarios durante la mañana" },
      { id: "afternoon", text: "Tarde (12pm - 5pm)", description: "Horarios durante la tarde" },
      { id: "evening", text: "Noche (5pm - 9pm)", description: "Horarios durante la noche" },
      { id: "weekend", text: "Fines de semana", description: "Sábados y domingos" }
    ]
  }
];

export default function QuestionnaireModal() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const router = useRouter();

  // Check localStorage on mount to see if questionnaire has been completed
  useEffect(() => {
    try {
      const questionnaireCompleted = localStorage.getItem('questionnaireCompleted');
      if (questionnaireCompleted === 'true') {
        setShouldShow(false);
      }
      
      // Get any previously saved answers
      const savedAnswers = localStorage.getItem('questionnaireAnswers');
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleSelectOption = (optionId: string) => {
    try {
      // Create new answers object with the current selection
      const updatedAnswers = { ...answers, [currentQuestion.id]: optionId };
      setAnswers(updatedAnswers);
      
      // Save answers to localStorage after each selection
      localStorage.setItem('questionnaireAnswers', JSON.stringify(updatedAnswers));
      
      if (currentQuestionIndex < questions.length - 1) {
        setDirection(1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Mark as completed when we've answered all questions
        setCompleted(true);
        localStorage.setItem('questionnaireCompleted', 'true');
        
        // Redirect after a brief delay
        setTimeout(() => {
          router.push('/therapist-matches');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!shouldShow) {
    return null;
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto relative"
      >
        {!completed ? (
          <>
            {/* Animated background decoration */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 transform -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 dark:opacity-20 transform translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Progress bar */}
            <div className="bg-gray-200 dark:bg-gray-700 h-3 w-full rounded-t-xl relative z-10">
              <div 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 h-3 rounded-tl-xl transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="p-8 md:p-10 relative z-10">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={currentQuestionIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                      {currentQuestion.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentQuestion.text}
                      </h2>
                      {currentQuestion.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {currentQuestion.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.id}
                        className="w-full p-5 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex justify-between items-center group"
                        onClick={() => handleSelectOption(option.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{option.text}</span>
                          {option.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
                          )}
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="mt-10 flex items-center justify-between">
                {currentQuestionIndex > 0 ? (
                  <button 
                    onClick={handleBack}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-10 text-center relative z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              ¡Cuestionario completado!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Estamos analizando tus respuestas para encontrar los terapeutas ideales para ti...
            </p>
            
            <div className="max-w-md mx-auto relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: "10%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Serás redirigido en unos momentos...
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 