'use server';
import { RegisterFormState } from '@/app/(types)/types';
import { PrismaClient } from '../../../generated/prisma/client';
import bcrypt from 'bcrypt';
import { validatePrase } from '../validate/validate';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function registerUser(state: RegisterFormState, formData: FormData) {
	const prisma = new PrismaClient();
	const validateResult = validatePrase.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});
	if (!validateResult.success) {
		const errors = {
			errors: {
				...validateResult.error.flatten().fieldErrors,
				...{ message: ['どっちも違います。'] },
			},
			isSuccess: false,
		};
		return errors;
	}

	const hashedPassword = await bcrypt.hash(validateResult.data.password, 10);

	await prisma.tUser.create({
		data: {
			email: validateResult.data.email,
			password: hashedPassword,
		},
	});
	try {
		await signIn('credentials', {
			redirect: false,
			email: validateResult.data.email,
			password: validateResult.data.password,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						errors: {
							email: [],
							password: [],
							message: [],
						},
						isSuccess: false,
					};
				default:
					return {
						errors: {
							email: [],
							password: [],
							message: [],
						},
						isSuccess: false,
					};
			}
		}
		throw error;
	}
	return {
		errors: {
			email: [],
			password: [],
			message: [],
		},
		isSuccess: true,
	};
}
