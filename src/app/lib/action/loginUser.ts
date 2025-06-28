'use server';
import { RegisterFormState } from '@/app/(types)/types';
import { validatePrase } from '../validate/validate';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function loginUser(state: RegisterFormState, formData: FormData) {
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
						},
						isSuccess: false,
					};
				default:
					return {
						errors: {
							email: [],
							password: [],
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
		},
		isSuccess: true,
	};
}
