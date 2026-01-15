"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
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
import { toast } from "sonner";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignupForm() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = signUpSchema.safeParse({
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    });

    if (!result.success) {
      const fieldErrors = result.error.issues.reduce((acc, err) => {
        const field = err.path[0];
        if (!acc[field]) {
          acc[field] = err.message;
        }
        return acc;
      }, {});
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    handleCreateAccount.mutate({
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    });
    setEmail("");
    setFName("");
    setLName("");
    setPassword("");
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
            />
          </FieldContent>
        </Field>
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName}</p>
        )}

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
            />
          </FieldContent>
        </Field>
        {errors.lastName && (
          <p className="text-sm text-red-600">{errors.lastName}</p>
        )}
        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="email">
            Email*
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
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}

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
