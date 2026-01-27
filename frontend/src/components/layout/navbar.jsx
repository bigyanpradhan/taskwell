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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const pathname = usePathname();

  const showSearch = pathname.startsWith("/dashboard");

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    if (token && token !== "undefined") {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        return;
      }
      const initials =
        decoded.firstName.split("")[0].toUpperCase() +
        decoded.lastName.split("")[0].toUpperCase();

      setUser(initials);
    }
  }, []);

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleResetPassword = () => {
    router.push("/resetpassword");
  };

  return (
    <>
      <div className="flex h-16 bg-gradient-to-r from-cyan-950 items-center">
        {user ? (
          <div className="flex w-full gap-2 items-center justify-between">
            <Link href="/" className="font-bold text-2xl italic p-4">
              Task
            </Link>
            {showSearch && <SearchBar />}
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
                    setUser(null);
                    router.push("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex w-full gap-2 items-center justify-between">
            <Link href="/" className="font-bold text-2xl italic p-4">
              Task
            </Link>
            <Button className="m-4 w-20 font-bold shadow-md shadow-[#252525] cursor-pointer">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
