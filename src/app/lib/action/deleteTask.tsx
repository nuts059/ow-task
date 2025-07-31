'use server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '../../../generated/prisma/client';
// import { auth } from '@/auth';

export async function deleteTask(formData: FormData) {
	const prisma = new PrismaClient();
	// const session = await auth();
	const task = Number(formData.get('taskId'));

	await prisma.tTask.delete({
		where: {
			task_id: task,
		},
	});
	redirect('/dashboard');
}
