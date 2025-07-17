import type { MChar, MRole, MStatus } from '@/generated/prisma';

export type RegisterFormState = {
	errors?: {
		email?: string[];
		password?: string[];
	};
	isSuccess: boolean;
};
export type TaskProps = {
	role: MRole[];
	char: MChar[];
	status: MStatus[];
};
export type CreateTaskFormState = {
	errors?: {
		title?: string[];
		role?: string[];
		char?: string[];
		status?: string[];
		comment?: string[];
	};
	isSuccess: boolean;
};
