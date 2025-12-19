import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb-client';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// Administrator whitelist
const ADMIN_EMAILS = [
  'test@test.pl', // test user
];

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    // ⚠️ DEV ONLY: REMOVE BEFORE PRODUCTION ⚠️
    // Test credentials provider for development
    ...(process.env.NODE_ENV === 'development'
      ? [
        CredentialsProvider({
          name: 'Dev Test Login',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Hasło', type: 'password' },
          },
          async authorize(credentials) {
            // ONLY FOR TESTING - hardcoded test accounts

            // Admin account
            if (
              credentials?.email === 'test@test.pl' &&
              credentials?.password === 'test123'
            ) {
              return {
                id: 'dev-test-admin',
                email: 'test@test.pl',
                name: 'Test Admin',
              };
            }

            // Regular user account
            if (
              credentials?.email === 'user@test.pl' &&
              credentials?.password === 'user123'
            ) {
              return {
                id: 'dev-test-user',
                email: 'user@test.pl',
                name: 'Test User',
              };
            }

            return null;
          },
        }),
      ]
      : []),
    // ⚠️ END DEV ONLY ⚠️
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      await connectDB();


      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        const role = ADMIN_EMAILS.includes(user.email) ? 'admin' : 'customer';

        dbUser = await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          role,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
