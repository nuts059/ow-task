'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { CreateTaskFormState, UpdateTaskProps } from '../(types)/types';
import type { MChar } from '@/generated/prisma';
import { registerTask } from '../lib/action/registerTask';
import { useRouter } from 'next/navigation';

const initialState: CreateTaskFormState = {
	errors: {
		title: [],
		role: [],
		char: [],
		status: [],
		comment: [],
	},
	isSuccess: false,
};
export default function UpdateForm({ role, char, status, task }: UpdateTaskProps) {
	const [state, formAction] = useActionState(registerTask, initialState);

	const [filterChara, setfilterChara] = useState<MChar[]>([]);
	const role_ref = useRef<HTMLSelectElement>(null);
	const char_ref = useRef<HTMLSelectElement>(null);
	// AutoCharaSelectedを呼んでるだけ
	const AutoCharaSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		AutoCharaSelected2(Number(e.target.value));
	};
	// 指定したロールのキャラを取得したい
	const AutoCharaSelected2 = (role_id: number) => {
		const charResalt = char.filter((charMin) => charMin.role_id === Number(role_id));
		setfilterChara(charResalt);
	};
	const createDate = new Date(task.create_date).toISOString().split('T')[0];
	const router = useRouter();
	useEffect(() => {
		AutoCharaSelected2(task.role_id);
	}, [task.role_id]);

	useEffect(() => {
		// console.log();
		if (char_ref.current) {
			char_ref.current.value = String(task.char_id);
		}
	}, [filterChara, task.char_id]);

	useEffect(() => {
		if (state.isSuccess == true) {
			window.location.href = '/Dashboard';
		}
	}, [router, state.isSuccess]);

	return (
		<form className="space-y-4" action={formAction}>
			<div>
				<label className="block font-semibold"></label>
				<input
					type="text"
					name="title"
					className="w-full mt-1 border rounded px-3 py-2"
					placeholder="タスクタイトル"
					defaultValue={task.title}
				/>
				{state.errors?.title?.map((err, index) => (
					<div key={index} className="text-red-600 text-sm" aria-live="polite">
						{err}
					</div>
				))}
			</div>
			<div className="border rounded p-8">
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block font-semibold">ロール</label>
						<select
							onChange={AutoCharaSelected}
							name="role"
							className="w-full mt-1 border rounded px-3 py-2"
							ref={role_ref}
							defaultValue={task.role_id}
						>
							{role.map((role) => (
								<option key={role.role_id} value={role.role_id}>
									{role.role_name}
								</option>
							))}
						</select>
						{state.errors?.role?.map((err, index) => (
							<div key={index} className="text-red-600 text-sm" aria-live="polite">
								{err}
							</div>
						))}
					</div>

					<div>
						<label className="block font-semibold">キャラ</label>
						<select
							name="character"
							ref={char_ref}
							className="w-full mt-1 border rounded px-3 py-2"
							// defaultValue={task.char_id}
						>
							{filterChara.map((char) => (
								<option key={char.char_id} value={char.char_id}>
									{char.char_name}
								</option>
							))}
						</select>
						{state.errors?.char?.map((err, index) => (
							<div key={index} className="text-red-600 text-sm" aria-live="polite">
								{err}
							</div>
						))}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="mb-4">
						<label className="block font-semibold">登録日</label>
						<input
							defaultValue={createDate}
							type="date"
							name="date"
							className="w-full mt-1 border rounded px-3 py-2"
						/>
					</div>

					<div className="mb-4">
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
							<div key={index} className="text-red-600 text-sm" aria-live="polite">
								{err}
							</div>
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
					{state.errors?.comment?.map((err, index) => (
						<div key={index} className="text-red-600 text-sm" aria-live="polite">
							{err}
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-between pt-4">
				<button
					type="button"
					onClick={() => router.push('/Dashboard')}
					className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
				>
					キャンセル
				</button>
				<button
					type="submit"
					className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
				>
					完了
				</button>
			</div>
		</form>
	);
}
