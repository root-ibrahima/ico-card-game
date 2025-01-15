import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Connexion via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Connexion réussie', user: data.user }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json({ message: 'Erreur interne du serveur', error: (error as Error).message }, { status: 500 });
  }
}
