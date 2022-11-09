import Head from "next/head";
import Link from "next/link";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Voterr</title>
      </Head>
      <main className="h-screen flex flex-col">
        <header className="flex flex-row justify-between items-center p-4 w-full bg-gray-700">
          <Link href="/" className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-md transition-all">
            <img src="/voterr.logo.svg" alt="app logo" width={32} className="bg-white rounded-md" />
            Voterr
          </Link>
          <nav className="space-x-2">
            <Link href="home">Home</Link>   
            <Link href="home">Home</Link>
            <Link href="home">Home</Link>
          </nav>
        </header>
        <section className="flex items-center justify-center">
          <div className="max-w-6xl flex-1">
            {children}
          </div>
        </section>
        <footer className="absolute w-full bottom-0 p-4 flex justify-center items-center border-gray-700 border-t-2">
          <span>
            Developed by{" "}
            <a
              href="https://github.com/lindennerd"
              target="_blank"
              className="text-purple-400 border-b border-purple-400"
            >
              Lindennerd
            </a>{" "}
            @ 2022
          </span>
        </footer>
      </main>
    </>
  );
}
