import { getAllTasks, searchTask } from "@/services/taskService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetAllTasks = () => {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
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
