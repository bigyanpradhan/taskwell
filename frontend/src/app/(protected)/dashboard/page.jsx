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
import { useDeleteTask } from "@/handlers/mutations";
import { useGetAllTasks } from "@/handlers/queries";
import { DialogClose } from "@radix-ui/react-dialog";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard({ params }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const { data = [], isLoading } = useGetAllTasks();
  const [fname, setFname] = useState("");
  const handleDeleteTask = useDeleteTask();

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

  if (!authenticated) {
    return null;
  }

  const handleDelete = (task) => {
    handleDeleteTask.mutate(task);
  };

  return (
    <div>
      <Navbar />
      <div className="p-10 min-h-screen relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mb-2 font-extrabold text-2xl">Hello, {fname}</h1>
          <Dialog>
            <DialogContent className="w-[70%] border-2 shadow-md shadow-slate-300">
              <DialogTitle className="text-center">ADD NOTE</DialogTitle>
              <AddEditModal type="add" />
            </DialogContent>
            <DialogClose id="task-close"></DialogClose>
            <DialogTrigger className="bg-primary hover:bg-primary/90 text-black text-lg h-10 p-2 rounded-xl font-bold items-center">
              <span className="text-center">+ Add Task</span>
            </DialogTrigger>
          </Dialog>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
          {data.length > 0 ? (
            data.map((task) => {
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
            })
          ) : (
            <span>Add Tasks</span>
          )}
        </div>
      </div>
      <div className="flex justify-around mt-0 mb-4">
        <Link className="underline" href="">
          PREV
        </Link>
        <Link className="underline" href="">
          NEXT
        </Link>
      </div>
      <Footer />
    </div>
  );
}
