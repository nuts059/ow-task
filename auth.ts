import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from './src/generated/prisma/client';
import { validatePrase } from '@/app/lib/validate/validate';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
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
					const pwHash = await bcrypt.hash(password, 10);

					user = await prisma.tUser.findFirst({
						where: {
							email: email,
						},
					});
					if (!user) {
						throw new Error('ユーザー名が違います');
					}
					if (user.password == pwHash) {
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
});
