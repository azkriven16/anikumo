import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/db/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
    user: User;
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize({ email, password }: any) {
                let user = await getUser(email);
                let passwordsMatch = await compare(password, user?.password!);
                if (passwordsMatch) return user as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({
            session,
            token,
        }: {
            session: ExtendedSession;
            token: any;
        }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },
});
