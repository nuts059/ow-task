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
