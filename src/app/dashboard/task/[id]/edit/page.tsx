import React from 'react';
import { PrismaClient } from '@/generated/prisma/client';
import UpdateForm from '@/app/(components)/updateForm';

export default async function TaskUpdatePage(props: { params: Promise<{ id: string }> }) {
	const prisma = new PrismaClient();
	const role = await prisma.mRole.findMany({});
	const char = await prisma.mChar.findMany({});
	const status = await prisma.mStatus.findMany({});
	const params = await props.params;
	const id = Number(params.id);

	const taskData = await prisma.tTask.findUnique({
		where: {
			task_id: id,
		},
		include: {
			status: true,
			char: true,
			role: true,
		},
	});
	if (!taskData) {
		return <p>No TASK!!!!</p>;
	}
	return (
		<div className="max-w-3xl mx-auto p-6  rounded-md shadow-md mt-8 bg-white">
			<h1 className="text-2xl font-bold mb-6">タスク編集</h1>
			<UpdateForm role={role} char={char} status={status} task={taskData} />
		</div>
	);
}
