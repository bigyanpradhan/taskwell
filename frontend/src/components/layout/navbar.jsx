"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <>
      <div className="flex h-16 bg-gradient-to-r from-cyan-950 items-center justify-between">
        <Link href="/" className="font-bold text-2xl italic p-4">
          Task
        </Link>
        <Button className="m-4 w-20 font-bold shadow-md shadow-[#252525] cursor-pointer">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </>
  );
}
