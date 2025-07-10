import { auth, signOut } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

export default async function NavBar() {
	const session = await auth();
	const isLogin = !!session?.user;
	console.log(isLogin);

	return (
		<header className="text-gray-600 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
						viewBox="0 0 24 24"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
					</svg>
					<span className="ml-3 text-xl">OW2タスク管理表</span>
				</a>
				{isLogin && (
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						<IoSearchSharp className="mr-5" size="1.5em" />
						<Link href="/dashboard" className="mr-5 hover:text-gray-900">
							タスク一覧
						</Link>
						<Link href="/dashboard/create" className="mr-5 hover:text-gray-900">
							タスク登録
						</Link>
						<form
							action={async () => {
								'use server';
								await signOut({ redirectTo: '/login' });
							}}
						>
							<button className="mr-5 hover:text-gray-900 cursor-pointer">ログアウト</button>
						</form>
					</nav>
				)}
			</div>
		</header>
	);
}
