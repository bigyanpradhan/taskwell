"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token")
      ? searchParams.get("token")
      : localStorage.getItem("accessToken");

    if (!token) {
      router.push("/forgotpassword");
      return;
    } else {
      localStorage.setItem("resetToken", token);
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      router.replace(url.pathname + url.search);
    }

    if ((token && token === "undefined") || token === "null") {
      router.push("/forgotpassword");
      return;
    }

    if (jwtDecode(token).exp * 1000 < Date.now()) {
      setAuthenticated(false);
      router.push("/forgotpassword");
      return;
    }
  }, [router]);

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <ResetPasswordForm />
      <Footer />
    </div>
  );
}
