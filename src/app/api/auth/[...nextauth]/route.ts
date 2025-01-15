import NextAuth, { User as NextAuthUser, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

interface ExtendedUser extends NextAuthUser {
  createdAt?: Date;
}

interface ExtendedSession extends NextAuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    createdAt?: Date;
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            return {
              id: user.id.toString(),
              name: user.username,
              email: user.email,
              createdAt: user.createdAt,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
    callbacks: {
      async jwt({ token, user }: { token: JWT, user?: ExtendedUser }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.createdAt = user.createdAt;
        }
        return token;
      },
      async session({ session, token }: { session: Session, token: JWT }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
          session.user.name = token.name as string;
          session.user.createdAt = token.createdAt as Date | undefined;
        }
        session.expires = token.expires as string;
        return session;
      },
    },
  };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
