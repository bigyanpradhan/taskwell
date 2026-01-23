import { createTask, deleteTask, updateTask } from "@/services/taskService";
import {
  createAccount,
  loginUser,
  resetPassword,
  sendResetEmail,
} from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// User Services Mutations
export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      console.log("Login mutation started");
    },
    onSuccess: (data) => {
      if (!data.accessToken) {
        toast.warning(data.message);
      } else {
        localStorage.setItem("accessToken", data.accessToken);
        toast.success("Login Successful!");
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.info("Login Failed. Please check your credentials.");
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
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Sign-Up Successful!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.info("Sign Up Failed!");
    },
  });
};

export const useSendResetEmail = () => {
  return useMutation({
    mutationFn: sendResetEmail,
    onMutate: () => {
      console.log("Send reset email mutation started");
    },
    onSuccess: (data) => {
      toast.success("Email Sent Successfully!");
    },
    onError: (error) => {
      toast.info("Failed to send the email.");
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,
    onMutate: () => {
      console.log("Reset password mutation started");
    },
    onSuccess: () => {
      localStorage.removeItem("resetToken");
      localStorage.removeItem("accessToken");
      toast.success("Password Reset Successful!");
      router.push("/login");
    },
    onError: (error) => {
      toast.info("Failed to reset password!");
    },
  });
};

// Task Services Mutations
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: () => {
      console.log("Task creation Started");
    },
    onSuccess: () => {
      toast.success("Task Created Successfully!");
    },
    onSettled: (_, error) => {
      if (error) {
        toast.info("Failed to create the task!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: () => {
      console.log("Task update Started");
    },
    onSuccess: () => {
      toast.success("Task Updated Successfully!");
    },
    onSettled: (_, error) => {
      if (error) {
        toast.info("Failed to update the task!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: () => {
      console.log("task deletion mutation started");
    },
    onSuccess: () => {
      toast.success("Task Deleted Successfully!");
    },
    onSettled: (_, error) => {
      if (error) {
        toast.info("Task Deletion Failed!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};
