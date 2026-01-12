"use client";

import Cards from "@/components/layout/cards";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Dashboard({ params }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isOpen: false,
    data: null,
    type: "add",
  });

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
  }, [router]);

  if (!authenticated) {
    return null;
  }

  const handleDelete = (task) => {
    toast.info("Task deleted successfully", { type: "success" });
    console.log("Delete task from dashboard");
  };
  const fname = jwtDecode(localStorage.getItem("accessToken")).firstName;
  const handleEdit = (task) => {
    setOpenAddEditModal({
      isOpen: true,
      data: null,
      type: "edit",
    });
    console.log("Edit task from dashboard");
  };

  return (
    <div>
      <Navbar />
      <div className="p-10 min-h-screen relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mb-2 font-extrabold text-2xl">Hello, {fname}</h1>
          <Button
            className="text-lg h-10 p-2 rounded-2xl"
            onClick={() => {
              setOpenAddEditModal({
                isOpen: true,
                data: null,
                type: "add",
              });
            }}
          >
            <span className="plus">+ Add Task</span>
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
          <Cards
            key="1"
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <Cards
            key="2"
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
          />
          <Cards
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
          />
          <Cards
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
          />
          <Cards
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
          />
          <Cards
            title="Task Title"
            description="Task Description"
            status="Pending"
            dueDate="2023-12-31"
          />
        </div>
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
