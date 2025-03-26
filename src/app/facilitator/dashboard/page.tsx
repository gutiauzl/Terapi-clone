'use client';

import React, { useState, useEffect } from 'react';
import { FacilitatorDashboardWidgets } from '@/components/facilitator-dashboard-widgets';
import { createClient } from '../../../../supabase/client';

// Create a single supabase client instance
const supabase = createClient();

export default function FacilitatorDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error getting user:", error);
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#142619] dark:border-[#8A7D68]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FacilitatorDashboardWidgets user={user} />
    </div>
  );
} 