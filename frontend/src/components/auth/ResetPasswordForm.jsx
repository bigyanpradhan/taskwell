"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export default function ResetPasswordForm() {
  const [nPassword, setNPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const toggleShowNPassword = () => {
    setShowNPassword(!showNPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const changePassword = () => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-10 lg:w-[600px] w-[450px] md:w-[500px] shadow-md shadow-slate-300 rounded-2xl">
        <FieldDescription className="text-4xl text-whitesmoke font-bold text-center">
          Reset your Password
        </FieldDescription>
        <Field>
          <FieldLabel className="text-xl pt-8" htmlFor="nPassword">
            New Password
          </FieldLabel>
          {/* <FieldDescription>Enter your registered email..</FieldDescription> */}
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
          {/* <FieldError>Email is required</FieldError> */}
        </Field>
        <Field>
          <FieldLabel className="text-xl pt-8" htmlFor="cPassword">
            Confirm Password
          </FieldLabel>
          {/* <FieldDescription>Enter your registered email..</FieldDescription> */}
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
          {/* <FieldError>Email is required</FieldError> */}
        </Field>
        <p className="mt-2 text-xs text-slate-400 text-justify">
          You will be required to login again after changing your password.
        </p>
        <Button
          className="mt-3 h-12 w-full text-2xl"
          type="submit"
          onClick={() => {
            changePassword();
          }}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
