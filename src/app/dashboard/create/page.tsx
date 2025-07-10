import React from 'react';
import { PrismaClient } from '@/generated/prisma/client';
import CreateForm from '@/app/(components)/createForm';

export default async function TaskRegisterPage() {
	const prisma = new PrismaClient();
	const role = await prisma.mRole.findMany({});
	const char = await prisma.mChar.findMany({});
	const status = await prisma.mStatus.findMany({});

	return (
		<div className="max-w-3xl mx-auto p-6  rounded-md shadow-md mt-8 bg-white">
			<h1 className="text-2xl font-bold mb-6">タスク登録</h1>
			<CreateForm role={role} char={char} status={status} />
		</div>
	);
}
