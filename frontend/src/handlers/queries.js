import { getAllTasks, searchTask } from "@/services/taskService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await getAllTasks();
      return tasks;
    },
  });
};

export const useSearchTasks = (searchTerm, isSearch) => {
  return useQuery({
    queryKey: ["searchTasks", searchTerm],
    queryFn: async () => {
      const tasks = await searchTask(searchTerm);
      return tasks;
    },
    enabled: isSearch,
  });
};
