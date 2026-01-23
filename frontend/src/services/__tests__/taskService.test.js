import api from "../api";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  searchTask,
} from "../taskService";

jest.mock("../api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("taskService", () => {
  describe("getAllTasks", () => {
    // should fetch all the tasks if request is valid
    it("should fetch all the tasks if request is valid", async () => {
      api.get.mockResolvedValue({
        data: {
          tasks: [
            {
              id: 1,
              title: "Unit",
              description: "testing",
              current_status: "In Progress",
              due_date: "2026-01-23T14:30:00.000Z",
            },
            {
              id: 1,
              title: "Unit",
              description: "testing",
              current_status: "In Progress",
              due_date: "2026-01-23T14:30:00.000Z",
            },
          ],
        },
      });

      const result = await getAllTasks({ pageParam: 1 });

      expect(api.get).toHaveBeenCalledWith("/tasks?page=1");
      expect(result).toEqual([
        {
          id: 1,
          title: "Unit",
          description: "testing",
          current_status: "In Progress",
          due_date: "2026-01-23T14:30:00.000Z",
        },
        {
          id: 1,
          title: "Unit",
          description: "testing",
          current_status: "In Progress",
          due_date: "2026-01-23T14:30:00.000Z",
        },
      ]);
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.get.mockRejectedValue(new Error("API ERROR"));

      await expect(getAllTasks({ pageParam: 1 })).rejects.toThrow("API ERROR");
    });
  });

  describe("createTask", () => {
    const task = {
      title: "titletitle",
      description: "descriptiondescription",
      current_status: "In Progress",
      due_date: "2024-08-01T14:38:32Z",
    };
    // should create the tasks if request is valid
    it("should create the tasks if request is valid", async () => {
      api.post.mockResolvedValue({
        data: {
          message: "Task Created.",
          task: [{ id: 1, ...task, userId: 1 }],
        },
      });

      const result = await createTask(task);

      expect(api.post).toHaveBeenCalledWith("/tasks", task);

      expect(result).toEqual({
        message: "Task Created.",
        task: [{ id: 1, ...task, userId: 1 }],
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.post.mockRejectedValue(new Error("API ERROR"));

      await expect(createTask(task)).rejects.toThrow("API ERROR");
    });
  });

  describe("deleteTask", () => {
    const task = { id: 1 };
    // should delete the task if request is valid
    it("should delete the task if request is valid", async () => {
      api.delete.mockResolvedValue({ data: { message: "Task Deleted" } });

      const result = await deleteTask(task);

      expect(api.delete).toHaveBeenCalledWith("/tasks/1");
      expect(result).toEqual({
        message: "Task Deleted",
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.delete.mockRejectedValue(new Error("API ERROR"));

      await expect(deleteTask(task)).rejects.toThrow("API ERROR");
    });
  });

  describe("searchTask", () => {
    const searchTerm = "ti";
    // should fetch the tasks based on search term if request is valid
    it("should fetch the tasks based on search term if request is valid", async () => {
      api.get.mockResolvedValue({
        data: {
          tasks: [
            {
              id: 1,
              title: "title",
              description: "description",
              status: "In Progress",
              dueDate: "2024-08-01T14:38:32Z",
            },
            {
              id: 1,
              title: "title",
              description: "description",
              status: "In Progress",
              dueDate: "2024-08-01T14:38:32Z",
            },
          ],
        },
      });

      const result = await searchTask(searchTerm);

      expect(api.get).toHaveBeenCalledWith("/searchTasks?searchTerm=ti");

      expect(result).toEqual([
        {
          id: 1,
          title: "title",
          description: "description",
          status: "In Progress",
          dueDate: "2024-08-01T14:38:32Z",
        },
        {
          id: 1,
          title: "title",
          description: "description",
          status: "In Progress",
          dueDate: "2024-08-01T14:38:32Z",
        },
      ]);
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.get.mockRejectedValue(new Error("API ERROR"));

      await expect(searchTask(searchTerm)).rejects.toThrow("API ERROR");
    });
  });

  describe("updateTask", () => {
    const updates = {
      id: 1,
      title: "title",
      description: "description",
      status: "In Progress",
      dueDate: "2024-08-01T14:38:32Z",
    };
    // should update the task if request is valid
    it("should update the task if request is valid", async () => {
      api.put.mockResolvedValue({
        data: {
          message: "task updated",
          task: [{ ...updates }],
        },
      });

      const result = await updateTask(updates);

      expect(api.put).toHaveBeenCalledWith("/tasks/1", updates);

      expect(result).toEqual({
        message: "task updated",
        task: [{ ...updates }],
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.put.mockRejectedValue(new Error("API ERROR"));

      await expect(updateTask(updates)).rejects.toThrow("API ERROR");
    });
  });
});
