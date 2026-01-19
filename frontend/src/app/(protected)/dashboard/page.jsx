"use client";

import AddEditModal from "@/components/layout/addEditModal";
import Cards from "@/components/layout/cards";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteTask } from "@/handlers/mutations";
import { useGetAllTasks, useSearchTasks } from "@/handlers/queries";
import { SearchContext } from "@/hooks/searchContext";
import { DialogClose } from "@radix-ui/react-dialog";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Dashboard() {
  const { ref, inView } = useInView();
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const [sortBy, setSortBy] = useState("date");

  const {
    data: allTask = [],
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetching,
    fetchNextPage,
  } = useGetAllTasks();
  const [sortedTasks, setSortedTasks] = useState([]);
  const [fname, setFname] = useState("");
  const handleDeleteTask = useDeleteTask();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const { data: searchedTask = [] } = useSearchTasks(
    debouncedSearch,
    !!debouncedSearch
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || token === "undefined" || token === "null") {
      setAuthenticated(false);
      return router.push("/login");
    }

    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return router.push("/login");
    }
    setAuthenticated(true);
    setFname(jwtDecode(localStorage.getItem("accessToken")).firstName);
  }, [router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleClear = () => {
    setSearchTerm("");
    return;
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    const tasks = allTask?.pages?.flat() ?? [];
    let copy = debouncedSearch.trim() ? [...searchedTask] : [...tasks];
    console.log(copy);
    if (sortBy === "date") {
      copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    if (sortBy === "title") {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSortedTasks(copy);
  }, [sortBy, allTask, searchedTask, debouncedSearch]);

  if (!authenticated) {
    return null;
  }

  const handleDelete = (task) => {
    handleDeleteTask.mutate(task);
  };

  return (
    <div>
      <SearchContext.Provider
        value={{ searchTerm, setSearchTerm, handleClear }}
      >
        <Navbar />
      </SearchContext.Provider>
      <div className="p-10 min-h-screen relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mb-2 font-extrabold text-2xl">Hello, {fname}</h1>
          <div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By:</SelectLabel>
                  <SelectItem value="date">Sort By: Date</SelectItem>
                  <SelectItem value="title">Sort By: Title</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Dialog>
            <DialogContent className="w-[70%] border-2 shadow-md shadow-slate-300">
              <DialogTitle className="text-center">ADD TASK</DialogTitle>
              <AddEditModal type="add" />
            </DialogContent>
            <DialogClose id="task-close"></DialogClose>
            <DialogTrigger className="bg-primary hover:bg-primary/90 text-black text-lg h-10 p-2 rounded-xl font-bold items-center">
              <span className="text-center">Add Task</span>
            </DialogTrigger>
          </Dialog>
        </div>
        {sortedTasks.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
            {sortedTasks.map((task) => {
              return (
                <Cards
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.current_status}
                  dueDate={task.due_date}
                  onDelete={() => handleDelete(task)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center align-center text-center">
            <p className="relative top-50">
              Can't find any tasks. You can add the tasks by clicking the Add
              Task Button.
            </p>
          </div>
        )}
      </div>
      <div className="mb-5 font-bold italic text-center" ref={ref}>
        {hasNextPage && isFetchingNextPage ? (
          <p>Loading ...</p>
        ) : sortedTasks.length === 0 ? (
          <></>
        ) : (
          <p className="">All Tasks Loaded !!!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
