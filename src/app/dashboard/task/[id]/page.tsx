import React from 'react';
import { PrismaClient } from '@/generated/prisma/client';
import { ja } from 'date-fns/locale/ja';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function TaskDetailPage(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = Number(params.id);
	const prisma = new PrismaClient();

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
		<div className="max-w-3xl mx-auto p-6 rounded-md shadow-md mt-8 bg-white">
			<h1 className="text-2xl font-bold mb-6">タスク詳細</h1>
			<div className="mb-6">
				<div className="rounded-md">
					<div
						className="w-full mt-1 border rounded px-3 py-2 mb-4 break-words break-all"
						style={{ wordBreak: 'keep-all' }}
					>
						<span>{taskData.title}</span>
					</div>

					<div className="border rounded p-8">
						<div className="flex flex-row justify-around">
							<div className="flex-col flex w-6/12 mb-10">
								<span className="font-semibold">ロール</span>
								<span className="">{taskData.role.role_name}</span>
							</div>
							<div className="flex-col flex w-6/12 mb-10">
								<span className="font-semibold">キャラ</span>
								<span className="">{taskData.char.char_name}</span>
							</div>
						</div>
						<div className="flex flex-row justify-around">
							<div className="flex-col flex w-6/12 mb-10">
								<span className="font-semibold">登録日</span>
								<span className="">
									{format(new Date(taskData.create_date), 'yyyy/MM/dd（EEE）', {
										locale: ja,
									})}
								</span>
							</div>
							<div className="flex-col flex w-6/12 mb-10">
								<span className="font-semibold">ステータス</span>
								<span className="">{taskData.status.status_name}</span>
							</div>
						</div>
						<div className="flex flex-row justify-around">
							<div className="w-full mt-2">
								<span className="font-semibold">コメント</span>
								<p
									className="whitespace-pre-wrap break-words break-all"
									style={{ wordBreak: 'keep-all' }}
								>
									{taskData?.comment}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-between">
				<Link
					href={`/dashboard/task/${taskData.task_id}/edit`}
					className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
				>
					編集
				</Link>
				<Link
					href="/dashboard"
					className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
				>
					完了
				</Link>
			</div>
		</div>
	);
}
