import type { MChar, MRole, MStatus, TTask } from '@/generated/prisma';

export type RegisterFormState = {
	errors?: {
		email?: string[];
		password?: string[];
		message?: string[];
	};
	isSuccess: boolean;
};
export type CreateTaskProps = {
	role: MRole[];
	char: MChar[];
	status: MStatus[];
};
export type UpdateTaskProps = {
	role: MRole[];
	char: MChar[];
	status: MStatus[];
	task: TTask;
};
export type TaskFormState = {
	errors?: {
		title?: string[];
		role?: string[];
		char?: string[];
		status?: string[];
		comment?: string[];
	};
	isSuccess: boolean;
};
