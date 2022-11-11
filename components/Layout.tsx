import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add } from "./Icons/add";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Voterr</title>
      </Head>
      <header className="flex flex-row justify-between items-center p-4 w-full bg-gray-700">
        <Link
          href="/"
          className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-md transition-all"
        >
          <img
            src="/voterr.logo.svg"
            alt="app logo"
            width={32}
            className="bg-white rounded-md"
          />
          Voterr
        </Link>
        <nav className="flex gap-2 items-center">
          <Link
            href="/poll/new"
            className="py-1 px-2 rounded-md hover:bg-gray-800 transition-all flex items-center gap-2"
          >
            <Add /> New Poll
          </Link>
          <Link href="home">Home</Link>
          <Link href="home">Home</Link>
        </nav>
      </header>
      <main className="flex flex-col min-h-screen box-border ">
        <ToastContainer theme="dark" />
        <section className="flex justify-center">
          <div className="max-w-6xl flex-1">{children}</div>
        </section>
      </main>
      <footer className=" py-4 flex-1 flex justify-center items-center border-gray-700 border-t-2 mt-4">
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
    </>
  );
}
