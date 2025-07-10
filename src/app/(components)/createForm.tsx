'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TaskProps } from '../(types)/types';
import type { MChar } from '@/generated/prisma';

export default function CreateForm({ role, char, status }: TaskProps) {
	const [filterChara, setfilterChara] = useState<MChar[]>([]);
	const selectRef = useRef<HTMLSelectElement>(null);
	const AutoCharaSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const charResalt = char.filter((charMin) => charMin.role_id === Number(e.target.value));
		setfilterChara(charResalt);
	};

	useEffect(() => {
		if (selectRef.current) {
			const event = new Event('change', { bubbles: true });
			selectRef.current.dispatchEvent(event);
		}
	}, []);
	return (
		<form className="space-y-4">
			<div>
				<label className="block font-semibold"></label>
				<input
					type="text"
					name="title"
					className="w-full mt-1 border rounded px-3 py-2"
					placeholder="タスクタイトル"
				/>
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
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="mb-4">
						<label className="block font-semibold">登録日</label>
						<input type="date" name="date" className="w-full mt-1 border rounded px-3 py-2" />
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
					</div>
				</div>
				<div className="mb-4">
					<label className="block font-semibold">コメント</label>
					<textarea name="comment" rows={4} className="w-full mt-1 border rounded px-3 py-2" />
				</div>
			</div>
			<div className="flex justify-between pt-4">
				<button
					type="button"
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
