'use client';
import React, { useActionState } from 'react';
import { TaskFormState, UpdateTaskProps } from '../(types)/types';
import { useState, useEffect } from 'react';
import { MChar } from '@/generated/prisma';
import { useRouter } from 'next/navigation';
import { updateTask } from '../lib/action/updateTask';
import Link from 'next/link';

const INITIAL_STATE: TaskFormState = {
	errors: {
		title: [],
		role: [],
		char: [],
		status: [],
		comment: [],
	},
	isSuccess: false,
};

const UpdateForm = ({ role, char, status, task }: UpdateTaskProps) => {
	const [filteredChars, setFilteredChars] = useState<MChar[]>([]);

	const [selectedCharId, setSelectedCharId] = useState<number>(task.char_id);

	const [selectedRoleId, setSelectedRoleId] = useState<number>(task.role_id);

	const [state, formAction] = useActionState(updateTask, INITIAL_STATE);

	const router = useRouter();

	// キャラの絞り込み
	const autoCharSelect = (roleId: number) => {
		const activeChars = char.filter((char) => char.role_id === roleId);
		setFilteredChars(activeChars);

		// キャラIDがそのロールに存在しなければ、最初のキャラに設定
		const exists = activeChars.some((char) => char.char_id === task.char_id);
		console.log('キャラ存在チェック:', exists, '選択キャラID:', task.char_id);
		if (!exists && activeChars.length > 0) {
			console.log('キャラIDを最初のキャラに設定:', activeChars[0].char_id);
			setSelectedCharId(activeChars[0].char_id);
		}
	};

	// 初期値セット
	useEffect(() => {
		autoCharSelect(task.role_id);
	}, [task.role_id]);

	useEffect(() => {
		if (state.isSuccess) {
			router.push('/dashboard');
		}
	}, [state.isSuccess]);

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const roleId = Number(e.target.value);
		setSelectedRoleId(roleId);
		autoCharSelect(roleId);
	};

	const handleCharChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCharId(Number(e.target.value));
	};

	return (
		<form className="space-y-4" action={formAction}>
			<input type="hidden" name="taskId" value={task.task_id} />
			<div>
				<label className="block font-semibold">タイトル</label>
				<input
					type="text"
					name="title"
					className="w-full mt-1 border rounded px-3 py-2"
					placeholder="タスクタイトル"
					defaultValue={task.title}
				/>
				{state.errors?.title?.map((err, index) => (
					<p key={index} className="text-red-500 text-xs mt-1">
						{err}
					</p>
				))}
			</div>

			<div className="border p-8">
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block font-semibold">ロール</label>
						<select
							name="role"
							className="w-full mt-1 border rounded px-3 py-2"
							onChange={handleRoleChange}
							value={selectedRoleId}
						>
							{role.map((role) => (
								<option key={role.role_id} value={role.role_id}>
									{role.role_name}
								</option>
							))}
						</select>
						{state.errors?.role?.map((err, index) => (
							<p key={index} className="text-red-500 text-xs mt-1">
								{err}
							</p>
						))}
					</div>

					<div>
						<label className="block font-semibold">キャラ</label>
						<select
							name="character"
							className="w-full mt-1 border rounded px-3 py-2"
							value={selectedCharId}
							onChange={handleCharChange}
						>
							{filteredChars.map((char) => (
								<option key={char.char_id} value={char.char_id}>
									{char.char_name}
								</option>
							))}
						</select>
						{state.errors?.char?.map((err, index) => (
							<p key={index} className="text-red-500 text-xs mt-1">
								{err}
							</p>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block font-semibold">登録日</label>
						<input
							type="date"
							name="date"
							className="w-full mt-1 border rounded px-3 py-2"
							defaultValue={new Date(task.create_date).toISOString().split('T')[0]}
						/>
					</div>

					<div>
						<label className="block font-semibold">ステータス</label>
						<select
							name="status"
							className="w-full mt-1 border rounded px-3 py-2"
							defaultValue={task.status_code}
						>
							{status.map((status) => (
								<option key={status.status_code} value={status.status_code}>
									{status.status_name}
								</option>
							))}
						</select>
						{state.errors?.status?.map((err, index) => (
							<p key={index} className="text-red-500 text-xs mt-1">
								{err}
							</p>
						))}
					</div>
				</div>

				<div className="mb-4">
					<label className="block font-semibold">コメント</label>
					<textarea
						name="comment"
						rows={4}
						className="w-full mt-1 border rounded px-3 py-2"
						defaultValue={task.comment}
					/>
				</div>
			</div>

			<div className="flex justify-between pt-4">
				<Link
					href={`/dashboard/task/${task.task_id}`}
					className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 mr-4"
				>
					キャンセル
				</Link>
				{/* <button
					type="button"
					className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
					onClick={() => router.push('/dashboard')}
				>
					キャンセル
				</button> */}
				<button
					type="submit"
					className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
				>
					完了
				</button>
			</div>
		</form>
	);
};

export default UpdateForm;
