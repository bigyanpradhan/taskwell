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
import { useLogin } from "@/handlers/mutations";
import { loginSchema } from "@/schemas/loginSchema";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.issues.reduce((acc, err) => {
        const field = err.path[0];
        if (!acc[field]) {
          acc[field] = err.message;
        }
        return acc;
      }, {});
      setError(fieldErrors);
      return;
    }
    setError({});
    handleLogin.mutate({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-10 lg:w-[600px] w-[450px] md:w-[500px] border-2 shadow-md shadow-slate-300 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <FieldDescription className="text-4xl text-whitesmoke font-bold text-center">
          Login
        </FieldDescription>
        <span className="text-xs text-slate-300">
          * denotes required fields
        </span>
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
            />
          </FieldContent>
        </Field>
        {error.email && <p className="text-sm text-red-600">{error.email}</p>}

        <Field>
          <FieldLabel className="text-xl pt-1" htmlFor="email">
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
          <FieldError>
            {error.password && (
              <p className="text-sm text-red-600">{error.password}</p>
            )}
          </FieldError>
        </Field>
        <div className="pt-2 text-center">
          <Link
            href="/forgotpassword"
            className="underline text-slate-200 cursor-pointer hover:text-slate-400"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          className="mt-3 h-12 w-full text-2xl"
          type="submit"
          disabled={handleLogin.isLoading}
        >
          Login
        </Button>
        <p className="mt-6 text-slate-200">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="underline cursor-pointer hover:text-slate-400"
          >
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
}
