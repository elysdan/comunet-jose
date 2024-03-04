import { db } from '@/db/drizzle-db';
import { createDrizzleAdapter } from '@/auth/drizzle-adapter';
import type { GetServerSidePropsContext } from 'next';
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import LinkedinProvider from 'next-auth/providers/linkedin';
import { log } from 'next-axiom';

export type Role = "ADMIN" | "USER";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      image: string | null;
    } & DefaultSession['user'];
  }
  interface User {
    role: Role;
    image: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role
      },
    }),
  },
  adapter: createDrizzleAdapter(db),
  logger: {
    error(code, metadata) {
      log.error(code, metadata);
    },
  },
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    // EmailProvider(
    //   process.env.NEXTAUTH_URL?.includes('localhost') ? mailhog : workspace,
    // ),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
    // LinkedinProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID!,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    // }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};