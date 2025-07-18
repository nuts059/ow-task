import React from 'react';
import { PrismaClient } from '@/generated/prisma/client';
import { ja } from 'date-fns/locale/ja';
import { format } from 'date-fns';
import Search from '../(components)/search';

const DashboardPage = async (props: {
	searchParams?: Promise<{
		query?: string;
	}>;
}) => {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const prisma = new PrismaClient();
	const taskData = await prisma.tTask.findMany({
		where: {
			OR: [
				{
					title: {
						contains: query,
					},
				},
				{
					comment: {
						contains: query,
					},
				},
				{
					status: {
						status_name: {
							contains: query,
						},
					},
				},
			],
		},
		include: {
			status: true,
		},
		orderBy: {
			task_id: 'desc',
		},
	});
	return (
		<section>
			<h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
				タスク一覧
			</h2>
			<div className="mb-4">
				<Search />
			</div>
			<ul>
				{taskData.map((tasks) => (
					<li
						key={tasks.task_id}
						className="flex justify-between gap-x-6  border border-gray-300 rounded-lg px-5 py-2 mb-4"
					>
						<p>{tasks.title}</p>
						<div className="flex min-w-0 gap-x-24">
							<div>
								{format(new Date(tasks.create_date), 'yyyy/MM/dd（EEE）', {
									locale: ja,
								})}
							</div>
							<div>{tasks.status.status_name}</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default DashboardPage;
