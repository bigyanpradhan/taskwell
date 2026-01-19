"use client";

import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="relative bottom-0 h-10 bg-gradient-to-r from-cyan-950 flex justify-between items-center">
        <div>
          <Link
            href="/contactus"
            className="underline pl-8 pr-4 hover:text-slate-400 disabled"
          >
            Contact Us
          </Link>
          <Link
            href="/aboutus"
            className="underline hover:text-slate-400 disabled"
          >
            About Us
          </Link>
        </div>
        <div className="flex">
          <CopyrightIcon className="inline" />
          <span className="font-bold">Task {currentYear}</span>
        </div>
        <div>
          <Link
            href="https://github.com/bigyanpradhan/taskwell"
            target="_blank"
            className="underline pr-8 hover:text-slate-400"
          >
            Github Link
          </Link>
        </div>
      </div>
    </>
  );
}
