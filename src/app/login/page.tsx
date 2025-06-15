import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-medium text-3xl text-gray-900">世界は、もっとヒーローを必要としている。</h1>
        <p className="leading-relaxed mt-4">ヒーローの数だけ戦い方がある。ひとりじゃない。仲間と共に勝利をつかもう。</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">ログイン</h2>
        <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">メールアドレス</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">パスワード</label>
            <input type="password" id="passwold" name="passwold" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div className="flex justify-around flex-row text-center">
            <button className="mr-2 w-6/12 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">ログイン</button>
            <Link  href="/register" className="ml-2 w-6/12 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">登録</Link>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">力を合わせれば、不可能なんてない。</p>
        </div>
    </div>
    </section>
  );
}
