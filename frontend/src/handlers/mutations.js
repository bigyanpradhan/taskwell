import {
  createAccount,
  loginUser,
  resetPassword,
  sendResetEmail,
} from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      console.log("Login mutation started");
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Login Successful!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.info("Login Failed. Please check your credentials.");
      console.error("Login failed:", error);
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createAccount,
    onMutate: () => {
      console.log("Create account mutation started");
    },
    onSuccess: (data) => {
      console.log("SignIn successful:", data);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    },
  });
};

export const useSendResetEmail = ({ email }) => {
  return useMutation({
    mutationFn: sendResetEmail,
    onMutate: () => {
      console.log("Send reset email mutation started");
    },
    onSuccess: (data) => {
      console.log("Reset email sent successfully:", data);
    },
  });
};

export const useResetPassword = (resetData) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (resetData) => resetPassword(resetData),
    onMutate: () => {
      console.log("Reset password mutation started");
    },
    onSuccess: (data) => {
      localStorage.removeItem("resetToken");
      localStorage.removeItem("accessToken");
      router.push("/login");
      console.log("Password reset successful:", data);
    },
  });
};
