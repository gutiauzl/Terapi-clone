'use client';
import { useState, useEffect } from 'react';
import QuestionnaireModal from './questionnaire-modal';

export default function QuestionnaireWrapper() {
  const [isNewUser, setIsNewUser] = useState(true);
  
  useEffect(() => {
    // Check if the questionnaire has been completed
    const questionnaireCompleted = localStorage.getItem('questionnaireCompleted');
    setIsNewUser(questionnaireCompleted !== 'true');
  }, []);
  
  if (!isNewUser) return null;
  return <QuestionnaireModal />;
} 