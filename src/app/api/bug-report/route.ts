import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        // Récupération des données envoyées par l'utilisateur
        const { name, email, subject, description, priority } = await request.json();

        // Vérification que tous les champs nécessaires sont remplis
        if (!name || !subject || !description || !priority) {
            return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
        }

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_APP_USER, // Adresse Gmail utilisée pour envoyer les emails
                pass: process.env.EMAIL_APP_PASSWORD, // Mot de passe d'application généré
            },
        });

        // Contenu de l'email pour l'administrateur
        const adminMailOptions = {
            from: `${name} <${email || process.env.EMAIL_APP_USER}>`, // Nom et email de l'utilisateur ou email par défaut
            to: 'alexandre.meme@eemi.com', // Adresse de réception (admin)
            subject: `Rapport de bug - ${subject} (Priorité: ${priority})`, // Objet de l'email
            text: `Nom: ${name}\nEmail: ${email || 'Non fourni'}\nSujet: ${subject}\nPriorité: ${priority}\n\nDescription:\n${description}`, // Contenu en texte brut
        };

        // Contenu de l'email pour l'utilisateur (confirmation)
        const userMailOptions = email
            ? {
                  from: process.env.EMAIL_APP_USER, // Adresse de l'expéditeur
                  to: email, // Adresse email de l'utilisateur
                  subject: "Confirmation de réception de votre rapport de bug",
                  text: `Bonjour ${name},\n\nNous avons bien reçu votre rapport de bug avec le sujet "${subject}" et la description suivante :\n\n"${description}"\n\nNotre équipe va analyser votre message et revenir vers vous si nécessaire.\n\nMerci de contribuer à améliorer notre service.\n\nCordialement,\nL'équipe ICO.`,
              }
            : null; // Pas d'email de confirmation si aucun email utilisateur n'a été fourni

        // Envoi de l'email à l'administrateur
        await transporter.sendMail(adminMailOptions);

        // Envoi de l'email de confirmation à l'utilisateur (si un email est fourni)
        if (userMailOptions) {
            await transporter.sendMail(userMailOptions);
        }

        // Initialiser le client Supabase
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Utilisez la clé de rôle de service
        );

        // Insertion des données dans la table BugReport
        const { error } = await supabase
            .from('BugReport')
            .insert({
                user: name,
                email: email || null, // Enregistre null si l'email n'est pas fourni
                subject: subject,
                description: description,
                priority: priority,
            });

        if (error) {
            console.error("Erreur lors de l'insertion dans Supabase :", error);
            return NextResponse.json(
                { error: "Une erreur est survenue lors de l'enregistrement du rapport de bug." },
                { status: 500 }
            );
        }

        // Retour en cas de succès
        return NextResponse.json({ message: "Le rapport de bug a été envoyé avec succès." });
    } catch (error) {
        console.error("Erreur lors du traitement du rapport de bug :", error);
        return NextResponse.json(
            { error: "Une erreur est survenue. Veuillez réessayer." },
            { status: 500 }
        );
    }
}
