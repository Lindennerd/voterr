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
          <div>Voterr</div>
          <nav className="space-x-2">
            <Link href="home">Home</Link>   
            <Link href="home">Home</Link>
            <Link href="home">Home</Link>
          </nav>
        </header>
        <section>{children}</section>
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
