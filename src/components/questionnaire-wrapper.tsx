'use client';
import { useState, useEffect } from 'react';
import QuestionnaireModal from './questionnaire-modal';
import { createClient } from '../../supabase/client';

export default function QuestionnaireWrapper() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  
  useEffect(() => {
    const checkUserType = async () => {
      try {
        // Check if the questionnaire has been completed
        const questionnaireCompleted = localStorage.getItem('questionnaireCompleted');
        setIsNewUser(questionnaireCompleted !== 'true');
        
        // Check facilitator flag in localStorage (faster check)
        const isFacilitatorFlag = localStorage.getItem('is_facilitator') === 'true';
        
        if (isFacilitatorFlag) {
          console.log("Facilitator flag detected in localStorage - not showing questionnaire");
          setIsFacilitator(true);
          setIsLoaded(true);
          return;
        }
        
        // If no flag present, check user type via Supabase
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        
        if (data.user) {
          const userType = data.user.user_metadata?.user_type;
          const isUserFacilitator = userType === 'facilitador' || userType === 'facilitator';
          
          if (isUserFacilitator) {
            console.log("Facilitator type detected in user metadata - not showing questionnaire");
            // Set the flag for future checks
            localStorage.setItem('is_facilitator', 'true');
          }
          
          setIsFacilitator(isUserFacilitator);
        }
        
        // Set loaded state after checking storage
        setIsLoaded(true);
      } catch (error) {
        console.error('Error checking user type:', error);
        setIsLoaded(true);
      }
    };
    
    checkUserType();
  }, []);
  
  // Don't render anything during the initial check to prevent flashing
  if (!isLoaded) return null;
  
  // If user has completed the questionnaire or is a facilitator, don't show anything
  if (!isNewUser || isFacilitator) return null;
  
  return <QuestionnaireModal />;
} 