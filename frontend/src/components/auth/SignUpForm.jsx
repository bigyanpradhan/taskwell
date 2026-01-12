"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useSignUp } from "@/handlers/mutations";

export default function SignupForm() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!strongRegex.test(password)) {
      toast.info(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    handleCreateAccount.mutate({
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-10 lg:w-[600px] w-[450px] md:w-[500px] border-2 shadow-md shadow-slate-300 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <FieldDescription className="text-4xl text-whitesmoke font-bold text-center">
          Sign Up
        </FieldDescription>
        <span className="text-xs text-slate-300">
          * denotes required fields
        </span>
        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="first_name">
            First Name*
          </FieldLabel>
          <FieldContent>
            <Input
              id="first_name"
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
              placeholder="John"
              className="h-12 pt-4 pb-5"
              required
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="last_name">
            Last Name*
          </FieldLabel>
          <FieldContent>
            <Input
              id="last_name"
              type="text"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Wick"
              className="h-12 pt-4 pb-5"
              required
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="email">
            Email*
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="john.wick@continental.com"
              className="h-12 pt-4 pb-5"
              required
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="password">
            Password*
          </FieldLabel>
          <FieldContent>
            <InputGroup className="h-12">
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="pt-4 pb-5"
                required
                minLength="8"
              />
              <InputGroupAddon align="inline-end">
                {showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => togglePassword()}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => togglePassword()}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
        </Field>
        <Button
          className="mt-3 h-12 w-full text-2xl"
          type="submit"
          disabled={handleCreateAccount.isLoading}
        >
          Sign Up
        </Button>
        <p className="mt-6 text-slate-200">
          Already have an Account?{" "}
          <Link
            href="/login"
            className="underline cursor-pointer hover:text-slate-400"
          >
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
