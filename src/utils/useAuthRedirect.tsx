'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session) {
        // Redirige vers /auth/signin si l'utilisateur n'est pas connecté
        router.push('/auth/signin');
      }
    };

    checkSession();
  }, [router]);
}
