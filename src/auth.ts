import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from './generated/prisma/client';
import { validatePrase } from '@/app/lib/validate/validate';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					let user = null;
					const { email, password } = await validatePrase.parseAsync(credentials);
					user = await prisma.tUser.findFirst({
						where: {
							email: email,
						},
					});
					if (!user) {
						throw new Error('ユーザー名が違います');
					}

					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (!passwordsMatch) {
						throw new Error('パスワードが違います');
					}
					return {
						id: String(user.user_id),
						email: user.email,
						name: '名前',
					};
				} catch {
					alert('だめ～');
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
});
