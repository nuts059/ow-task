'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { CreateTaskFormState, TaskProps } from '../(types)/types';
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
export default function CreateForm({ role, char, status }: TaskProps) {
	const [state, formAction] = useActionState(registerTask, initialState);

	const [filterChara, setfilterChara] = useState<MChar[]>([]);
	const selectRef = useRef<HTMLSelectElement>(null);
	const AutoCharaSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const charResalt = char.filter((charMin) => charMin.role_id === Number(e.target.value));
		setfilterChara(charResalt);
	};
	const today = new Date().toISOString().split('T')[0];
	useEffect(() => {
		if (selectRef.current) {
			const event = new Event('change', { bubbles: true });
			selectRef.current.dispatchEvent(event);
		}
	}, []);

	const router = useRouter();
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
				/>
				{state.errors?.title?.map((err, index) => (
					<div key={index} className="text-red-600 text-sm" aria-live="polite">
						{err}
					</div>
				))}
			</div>
			<div className="border p-8">
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block font-semibold">ロール</label>
						<select
							onChange={AutoCharaSelected}
							name="role"
							className="w-full mt-1 border rounded px-3 py-2"
							ref={selectRef}
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
						<select name="character" className="w-full mt-1 border rounded px-3 py-2">
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
							defaultValue={today}
							type="date"
							name="date"
							className="w-full mt-1 border rounded px-3 py-2"
						/>
					</div>

					<div className="mb-4">
						<label className="block font-semibold">ステータス</label>
						<select name="status" className="w-full mt-1 border rounded px-3 py-2">
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
					<textarea name="comment" rows={4} className="w-full mt-1 border rounded px-3 py-2" />
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
