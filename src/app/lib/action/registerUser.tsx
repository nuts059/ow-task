'use server';
import { RegisterFormState } from '@/app/(types)/types';
import { PrismaClient } from '../../../generated/prisma/client';
import bcrypt from 'bcrypt';
import { validatePrase } from '../validate/validate';

export async function registerUser(state: RegisterFormState, formData: FormData) {
	const prisma = new PrismaClient();
	const validateResult = validatePrase.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});
	if (!validateResult.success) {
		const errors = {
			errors: validateResult.error.flatten().fieldErrors,
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
	return {
		errors: {
			email: [],
			password: [],
		},
		isSuccess: true,
	};
}
