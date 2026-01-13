import { getAllTasks } from "@/services/taskService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};
