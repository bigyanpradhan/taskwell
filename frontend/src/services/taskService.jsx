import api from "./api";

export const getAllTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data?.tasks ?? [];
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (updates) => {
  try {
    const response = await api.put(`/tasks/${updates.id}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (task) => {
  try {
    const response = await api.delete(`/tasks/${task.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchTask = async (searchTerm) => {
  try {
    const response = await api.get(
      `/searchTasks?searchTerm=${encodeURIComponent(searchTerm)}`
    );
    return response.data.tasks;
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (updates) => {
  try {
    const response = await api.patch("/updateStatus", updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskDueDate = async () => {
  try {
    const response = await api.patch("/updateDueDate", updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};
