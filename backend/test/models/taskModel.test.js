const { pool } = require("../../db/connect");
const Task = require("../../models/taskModel");

jest.mock("../../db/connect", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("Task Models", () => {
  describe("createTask", () => {
    // Task contents are taken and successfully created and the same task details are returned
    it("should create a task and return the details of that task when no error is encountered", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
            due_date: "2024-08-01T14:38:32Z",
            userId: 1,
          },
        ],
      });

      const result = await Task.createTask(
        "title",
        "description",
        "Pending",
        1,
        "2024-08-01T14:38:32Z",
      );

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "title",
        "description",
        "Pending",
        "2024-08-01T14:38:32Z",
        1,
      ]);

      expect(result).toEqual({
        id: 1,
        title: "title",
        description: "description",
        current_status: "Pending",
        due_date: "2024-08-01T14:38:32Z",
        userId: 1,
      });
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(
        Task.createTask(
          "title",
          "description",
          "Pending",
          1,
          "2024-08-01T14:38:32Z",
        ),
      ).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "title",
        "description",
        "Pending",
        "2024-08-01T14:38:32Z",
        1,
      ]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });

  describe("getAllTasks", () => {
    // All the tasks are fetched successfully and an array of the task objects is returned
    it("should return all the tasks for the userId as an array if fetched successfully", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
            due_date: "2024-08-01T14:38:32Z",
            userId: 1,
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
            due_date: "2024-08-01T14:38:32Z",
            userId: 1,
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
            due_date: "2024-08-01T14:38:32Z",
            userId: 1,
          },
        ],
      });

      const result = await Task.getAllTasks(1, 1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 12, 0]);

      expect(result).toEqual([
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
      ]);
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(Task.getAllTasks(1, 1)).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 12, 0]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });

  describe("getOneTask", () => {
    // If the task is there the task object in array is returned or empty array is returned
    it("should return the task by its id if it exists", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
          },
        ],
      });

      const result = await Task.getOneTask(1, 1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);

      expect(result).toEqual({
        id: 1,
        title: "title",
        description: "description",
        current_status: "In Progress",
      });
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(Task.getOneTask(1, 1)).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });

  describe("updateTask", () => {
    // The task contents are taken and updates are carried out returning the updated task
    it("should update the task and return the updated content of the same task", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
          },
        ],
      });

      const result = await Task.updateTask(1, 1, {
        title: "title",
        description: "description",
        status: "In Progress",
        dueDate: "datehere",
      });

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "title",
        "description",
        "In Progress",
        "datehere",
        1,
        1,
      ]);

      expect(result).toEqual({
        id: 1,
        title: "title",
        description: "description",
        current_status: "In Progress",
      });
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(
        Task.updateTask(1, 1, {
          title: "title",
          description: "description",
          status: "In Progress",
          dueDate: "datehere",
        }),
      ).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "title",
        "description",
        "In Progress",
        "datehere",
        1,
        1,
      ]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });

  describe("deleteTasks", () => {
    // The taskId and userId is validated and task is deleted successfully
    it("", async () => {
      pool.query.mockResolvedValue({
        rows: [],
      });

      const result = await Task.deleteTasks(1, 1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);

      expect(result).toBeUndefined();
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(Task.deleteTasks(1, 1)).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });

  describe("searchTasks", () => {
    // The searchterm is taken and the tasks whose title and description matches are returned
    it("", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "Pending",
          },
        ],
      });

      const result = await Task.searchTasks("work", 1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        1,
        "%work%",
      ]);

      expect(result).toEqual([
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
        },
      ]);
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      await expect(Task.searchTasks("work", 1)).rejects.toThrow("DB ERROR");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        1,
        "%work%",
      ]);

      expect(logSpy).toHaveBeenCalledWith(
        "Internal DB Server Error.",
        "DB ERROR",
      );
    });
  });
});
