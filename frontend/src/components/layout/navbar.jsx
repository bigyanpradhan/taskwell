"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const token = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  const router = useRouter();
  let user;
  if (token) {
    const decoded = jwtDecode(token);
    user = decoded
      ? decoded.firstName.split("")[0].toUpperCase() +
        decoded.lastName.split("")[0].toUpperCase()
      : TU;
  }

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleResetPassword = () => {
    router.push("/resetpassword");
  };

  return (
    <>
      <div className="flex h-16 bg-gradient-to-r from-cyan-950 items-center justify-between">
        <Link href="/" className="font-bold text-2xl italic p-4">
          Task
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="mr-6 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                {user}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDashboard}>
                My Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleResetPassword}>
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  localStorage.clear();
                  router.push("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="m-4 w-20 font-bold shadow-md shadow-[#252525] cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}
