import api from "./api";

export const getAllTasks = async () => {
  try {
    const response = await api.get("/getTasks");
    console.log(response.data);
    return response.data?.tasks ?? [];
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post("/createTask", taskData);
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (updates) => {
  try {
    const response = await api.put("/updateTask", updates);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (updates) => {
  try {
    const response = await api.patch("/updateStatus", updates);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskDueDate = async () => {
  try {
    const response = await api.patch("/updateDueDate", updates);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (task) => {
  try {
    console.log(task);
    const response = await api.delete("deleteTask", { data: { id: task.id } });
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
