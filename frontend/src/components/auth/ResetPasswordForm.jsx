"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Eye, EyeClosed } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useResetPassword } from "@/handlers/mutations";

export default function ResetPasswordForm() {
  const [nPassword, setNPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const router = useRouter();
  const handleResetPassword = useResetPassword();

  const toggleShowNPassword = () => {
    setShowNPassword(!showNPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem("resetToken");

    if (!token) {
      router.push("/forgotpassword");
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded && decoded.exp * 1000 < Date.now()) {
      router.push("/forgotpassword");
      return;
    }
  }, [router]);

  const handleReset = (e) => {
    e.preventDefault();
    if (nPassword !== cPassword) {
      alert("Passwords do not Match");
      return;
    }

    const token = localStorage.getItem("resetToken");

    handleResetPassword.mutate({ token, password: nPassword });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-10 lg:w-[600px] w-[450px] md:w-[500px] shadow-md shadow-slate-300 rounded-2xl"
        onSubmit={handleReset}
      >
        <FieldDescription className="text-4xl text-whitesmoke font-bold text-center">
          Reset your Password
        </FieldDescription>
        <Field>
          <FieldLabel className="text-xl pt-8" htmlFor="nPassword">
            New Password
          </FieldLabel>
          <FieldContent>
            <InputGroup className="h-12 ">
              <InputGroupInput
                id="nPassword"
                type={showNPassword ? "text" : "password"}
                value={nPassword}
                onChange={(e) => {
                  setNPassword(e.target.value);
                }}
                placeholder="Enter New Password"
                className="pt-4 pb-5"
                required
                minLength="8"
              />
              <InputGroupAddon align="inline-end">
                {showNPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => toggleShowNPassword()}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => toggleShowNPassword()}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-xl pt-8" htmlFor="cPassword">
            Confirm Password
          </FieldLabel>
          <FieldContent>
            <InputGroup className="h-12 ">
              <InputGroupInput
                id="cPassword"
                type={showCPassword ? "text" : "password"}
                value={cPassword}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
                placeholder="Confirm New Password"
                className="pt-4 pb-5"
                required
                minLength="8"
              />
              <InputGroupAddon align="inline-end">
                {showCPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => toggleShowCPassword()}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => toggleShowCPassword()}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
        </Field>
        <p className="mt-2 text-xs text-slate-400 text-justify">
          You will be required to login again after changing your password.
        </p>
        <Button
          className="mt-3 h-12 w-full text-2xl"
          type="submit"
          disabled={handleResetPassword.isLoading}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
