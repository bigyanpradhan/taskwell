const {
  createTask,
  getTasks,
  updateTasks,
  deleteTasks,
  searchTasks,
  getSingleTask,
} = require("../../controller/taskController");
const Task = require("../../models/taskModel");

jest.mock("../../models/taskModel");

describe("Task Controller", () => {
  describe("Task Creation By User", () => {
    let req = { body: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // Invalid inputs for task is sent
    it("should return 422 status when the input is invalid", async () => {
      req.body = {
        title: "titletitle",
        description: "descriptiondescription",
        status: "In Progress",
        dueDate: "What",
      };

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "The inputs are invalid.",
      });
    });

    // Inputs are valid and user is authenticated but task creation encounters error
    it("should return 500 status when any extra error is encountered", async () => {
      req.body = {
        title: "titletitle",
        description: "descriptiondescription",
        status: "In Progress",
        dueDate: "2024-08-01T14:38:32Z",
      };

      Task.createTask.mockRejectedValue(new Error("DB ERROR"));

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });

    // Task creation is successful(response checking)
    it("should return 201 status when the task creation is successful", async () => {
      req.body = {
        title: "titletitle",
        description: "descriptiondescription",
        status: "In Progress",
        dueDate: "2024-08-01T14:38:32Z",
      };

      req.user = { id: 1 };

      Task.createTask.mockResolvedValue({
        id: 1,
        title: "titletitle",
        description: "descriptiondescription",
        current_status: "In Progress",
        due_date: "2024-08-01T14:38:32Z",
        userId: 1,
      });

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task Created",
        task: {
          id: 1,
          title: "titletitle",
          description: "descriptiondescription",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
      });
    });
  });

  describe("Task fetching", () => {
    let req = { query: {}, user: { id: 1 } };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // Error encountered during fetching tasks
    it("should return 500 when an error is encountered during the task fetching process", async () => {
      req.query = { page: 1 };

      Task.getAllTasks.mockRejectedValue(new Error("DB ERROR"));

      await getTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    // All tasks for authenticated user fetched(response checking)
    it("should return 200 status when all the tasks have been fetched", async () => {
      req.query = { page: 1 };

      Task.getAllTasks.mockResolvedValue([
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
        },
      ]);

      await getTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "All Tasks for authenticated user fetched.",
        tasks: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
            due_date: "2024-08-01T14:38:32Z",
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
            due_date: "2024-08-01T14:38:32Z",
          },
        ],
      });
    });
  });

  describe("Single Task Fetching", () => {
    let req = { params: {}, user: { id: 1 } };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // Error encountered during fetching tasks
    it("should return 500 status when error is encountered while fetching", async () => {
      req.params = { id: 1 };

      Task.getOneTask.mockRejectedValue(new Error("DB ERROR"));

      await getSingleTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error.",
      });
    });

    // The specific task with id for authenticated user is not found
    it("should return 404 status when specific task isn't found for the user", async () => {
      req.params = { id: 1 };

      Task.getOneTask.mockResolvedValue(null);

      await getSingleTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Requested resource not found for this user",
      });
    });

    // The specific task with id for authenticated user is found (Response checking)
    it("should return 200 status when the task is found for the user", async () => {
      req.params = { id: 1 };

      Task.getOneTask.mockResolvedValue({
        id: 1,
        title: "title",
        description: "description",
        current_status: "In Progress",
        due_date: "2024-08-01T14:38:32Z",
        userId: 1,
      });

      await getSingleTask(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task found for user",
        task: {
          id: 1,
          title: "title",
          description: "description",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
      });
    });
  });

  describe("Task Updates By User", () => {
    let req = { body: {}, params: { id: 1 }, user: { id: 1 } };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // Invalid inputs for task is sent
    it("should return 422 status when the input is invalid", async () => {
      req.body = {
        title: "title",
        description: "",
        current_status: "In Progress",
        due_date: "2024-08-01T14:38:32Z",
      };

      await updateTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "The inputs are not valid.",
      });
    });

    // {MAYBE Check if the task exists or not too} will fail as i haven't made any checks for it in backend

    // Inputs are valid and user is authenticated but task update encounters error.
    it("should return 500 status when an error is occured during the update", async () => {
      req.body = {
        title: "titletitle",
        description: "descriptiondescription",
        status: "In Progress",
        dueDate: "2024-08-01T14:38:32Z",
      };

      Task.updateTask.mockRejectedValue(new Error("DB ERROR"));

      await updateTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    // Task update is successful(response checking)
    it("should return 200 when the update of task is successful", async () => {
      req.body = {
        title: "titletitle",
        description: "descriptiondescription",
        status: "In Progress",
        dueDate: "2024-08-01T14:38:32Z",
      };

      Task.updateTask.mockResolvedValue({
        id: 1,
        title: "title",
        description: "description",
        current_status: "Pending",
        due_date: "2024-08-01T14:38:32Z",
        userId: 1,
      });

      await updateTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Updated the task Successfully",
        note: {
          id: 1,
          title: "title",
          description: "description",
          current_status: "Pending",
          due_date: "2024-08-01T14:38:32Z",
          userId: 1,
        },
      });
    });
  });

  describe("Task Deletion By User", () => {
    let req = { params: { id: 1 }, user: { id: 1 } };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // {MAYBE Check if the task exists or not too} will fail as i haven't made any checks for it in backend

    // Error encountered during deleting tasks
    it("should return 500 status when an error is encountered", async () => {
      Task.deleteTasks.mockRejectedValue(new Error("DB ERROR"));

      await deleteTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    // Task deleted successfully(response checking)
    it("should return 200 when the task is successfully deleted", async () => {
      Task.deleteTasks.mockResolvedValue({ id: 1 });

      await deleteTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Deleted Task",
      });
    });
  });

  describe("Task Searching By user", () => {
    let req = { query: {}, user: { id: 1 } };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // Input/query is invalid
    it("should return 422 status when the input is invalid", async () => {
      req.query = {
        searchTerm: "",
      };

      await searchTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "Search term must be at least 1 character long.",
      });
    });

    // Error during the search/fetching
    it("should return 500 when an error is encountered during fetching", async () => {
      req.query = {
        searchTerm: "work",
      };

      Task.searchTasks.mockRejectedValue(new Error("DB ERROR"));

      await searchTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    // Searched tasks aren't there or not found
    it("should return 200 status with empty tasks array when no task is found", async () => {
      req.query = {
        searchTerm: "work",
      };

      Task.searchTasks.mockResolvedValue([]);

      await searchTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Search Completed",
        tasks: [],
      });
    });

    // Searched tasks are there or found
    it("should return 200 status with array of task objects when tasks are found", async () => {
      req.query = {
        searchTerm: "work",
      };

      Task.searchTasks.mockResolvedValue([
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
        },
        {
          id: 1,
          title: "title",
          description: "description",
          current_status: "In Progress",
          due_date: "2024-08-01T14:38:32Z",
        },
      ]);

      await searchTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Search Completed",
        tasks: [
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
            due_date: "2024-08-01T14:38:32Z",
          },
          {
            id: 1,
            title: "title",
            description: "description",
            current_status: "In Progress",
            due_date: "2024-08-01T14:38:32Z",
          },
        ],
      });
    });
  });
});
