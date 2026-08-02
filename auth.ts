import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from '@/lib/prismaClient';
import { loginSchema } from '@/lib/schema';

// Auth.js stores the signed-in identity in an encrypted JWT cookie.
export const { auth, handlers } = NextAuth({
  callbacks: {
    authorized({ auth: session, request }) {
      // Protect dashboard requests before the page is rendered.
      if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return Boolean(session?.user);
      }

      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate untrusted form values before querying PostgreSQL.
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        // Read only the fields needed to verify the user.
        const user = await prisma.user.findUnique({
          where: { email: parsedCredentials.data.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user) {
          return null;
        }

        // Compare the submitted password with the stored bcrypt hash.
        const passwordMatches = await bcrypt.compare(
          parsedCredentials.data.password,
          user.password,
        );

        if (!passwordMatches) {
          return null;
        }

        // Return safe identity fields; never put the password in the session.
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
