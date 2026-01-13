import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskDueDate,
  updateTaskStatus,
} from "@/services/taskService";
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

// Task Services Mutations
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: () => {
      console.log("Task creation Started");
    },
    onSuccess: () => {
      toast.info("Task Created !!!");
    },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
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
      toast.info("Task Updated !!!");
    },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onMutate: () => {
      console.log("Task status update Started");
    },
    onSuccess: () => {
      toast.info("Task Status Updated !!!");
    },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};

export const useUpdateTaskDueDate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskDueDate,
    onMutate: () => {
      console.log("Task Due Date Mutation Started");
    },
    onSuccess: () => {
      toast.info("Task Due Date Updated !!!");
    },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
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
      toast.info("Task Deleted");
    },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};
