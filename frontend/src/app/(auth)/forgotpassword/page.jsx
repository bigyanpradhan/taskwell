"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || token === "undefined" || token === "null") {
      setAuthenticated(false);
      return;
    }

    const decoded = token ? jwtDecode(token) : null;

    if (token && decoded && decoded.exp * 1000 > Date.now()) {
      router.push("/dashboard");
    }
    setAuthenticated(false);
  }, [router]);

  if (authenticated) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
}
