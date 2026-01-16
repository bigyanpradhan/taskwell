"use client";

import { useState } from "react";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import { useSendResetEmail } from "@/handlers/mutations";
import { emailValidation } from "@/schemas/loginSchema";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const handleSendEmail = useSendResetEmail();

  const sendResetReq = (e) => {
    e.preventDefault();

    const result = emailValidation.safeParse(email);
    if (!result.success) {
      setError({
        email: result.error.issues[0].message,
      });
      return;
    }

    setError({});

    handleSendEmail.mutate({ email });

    setEmail("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-10 pt-5 lg:w-[600px] w-[450px] md:w-[500px] shadow-md shadow-slate-300 rounded-2xl"
        onSubmit={sendResetReq}
      >
        <div className="mb-2 mt-0 text-sm cursor-pointer">
          <Link href="/login" className="flex hover:text-slate-400">
            <ArrowBigLeftDash size={20} />
            <span className="mb-4">Go Back</span>
          </Link>
        </div>
        <FieldDescription className="text-4xl text-whitesmoke font-bold text-center">
          Find Your Account
        </FieldDescription>
        <Field>
          <FieldLabel className="text-xl pt-8" htmlFor="email">
            Enter you registered email
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="john.wick@continental.com"
              className="h-12 pt-4 pb-5"
            />
          </FieldContent>
        </Field>
        {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
        <p className="mt-2 text-xs text-slate-400 text-justify">
          An email will be sent to you with instructions if the email you have
          provided is already registered.
        </p>
        <Button className="mt-3 h-12 w-full text-2xl" type="submit">
          Send Email
        </Button>
      </form>
    </div>
  );
}
