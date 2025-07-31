'use server';
import { TaskFormState } from '@/app/(types)/types';
import { PrismaClient } from '../../../generated/prisma/client';
import { auth } from '@/auth';
import { TaskValidate } from '../validate/validate';

export async function updateTask(state: TaskFormState, formData: FormData) {
	const prisma = new PrismaClient();
	const session = await auth();
	const role = await prisma.mRole.findMany({});
	const char = await prisma.mChar.findMany({});
	const status = await prisma.mStatus.findMany({});
	// バリデートルールを受け取る
	const ValidateRule = TaskValidate(role, char, status);
	// バリデートする
	const validateResult = ValidateRule.safeParse({
		title: formData.get('title') as string,
		role: Number(formData.get('role')),
		char: Number(formData.get('character')),
		status: Number(formData.get('status')),
		comment: formData.get('comment') as string,
	});
	if (!validateResult.success) {
		const errors = {
			errors: validateResult.error.flatten().fieldErrors,
			isSuccess: false,
		};
		console.log(errors);
		return errors;
	}
	const user_id = Number(session?.user?.id);
	if (!user_id) {
		throw new Error('ログインしてないよ');
	}
	const task = Number(formData.get('taskId'));
	const dateStr = formData.get('date')?.toString();
	const create_date = dateStr && dateStr !== '' ? new Date(dateStr) : new Date();

	await prisma.tTask.update({
		where: {
			task_id: task,
		},
		data: {
			user_id: user_id,
			title: validateResult.data?.title,
			role_id: validateResult.data?.role,
			char_id: validateResult.data?.char,
			create_date: new Date(create_date),
			status_code: validateResult.data?.status,
			comment: validateResult.data?.comment,
		},
	});
	try {
	} catch (error) {
		throw error;
	}
	return {
		errors: {
			title: [],
			role: [],
			char: [],
			status: [],
			comment: [],
		},
		isSuccess: true,
	};
}
