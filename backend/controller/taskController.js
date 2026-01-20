const Task = require("../models/taskModel");
const { taskSchema, taskSearchTerm } = require("../schemas/taskSchema");

const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const result = taskSchema.safeParse({ title, description, status, dueDate });
  if (result.success) {
    try {
      const user = req.user;

      if (!title || !dueDate || !description) {
        return res.status(422).json({ message: "All fields are required." });
      }

      const response = await Task.createTask(
        title,
        description,
        status,
        user.id,
        dueDate
      );

      return res.status(201).json({
        message: "Task Created",
        task: response,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", msg: error.message });
    }
  } else {
    return res.status(422).json({ message: "The inputs are invalid." });
  }
};

const getTasks = async (req, res) => {
  try {
    const user = req.user;
    const page = req.query.page;

    if (!user) {
      return res.status(401).json({ message: "Authenticated User Not Found" });
    }

    const response = await Task.getAllTasks(user.id, page);
    return res.status(200).json({
      message: "All Tasks for authenticated user fetched.",
      tasks: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const response = await Task.getOneTask(id, user.id);
    console.log(response);
    if (!response) {
      return res.status(404).json({
        message: "Requested resource not found for this user",
      });
    }
    return res.status(200).json({
      message: "Task found for user",
      task: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const updateTasks = async (req, res) => {
  const updates = req.body;
  const { title, description, status, dueDate } = updates;
  const result = taskSchema.safeParse({ title, description, status, dueDate });

  if (result.success) {
    try {
      const { id } = req.params;
      const user = req.user;

      const response = await Task.updateTask(id, user.id, updates);
      return res.status(200).json({
        message: "Updated the task Successfully",
        note: response,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", msg: error.message });
    }
  } else {
    return res.status(422).json({ message: "The inputs are not valid." });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const response = await Task.deleteTasks(id, user.id);
    return res.status(200).json({
      message: "Deleted Task",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

const searchTasks = async (req, res) => {
  const { searchTerm } = req.query;

  const result = taskSearchTerm.safeParse(searchTerm);
  if (result.success) {
    try {
      const user = req.user;

      const response = await Task.searchTasks(searchTerm, user.id);
      return res.status(200).json({
        message: "Search Completed",
        tasks: response,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", msg: error.message });
    }
  } else {
    return res.status(422).json({ message: result.error.issues.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTasks,
  deleteTasks,
  searchTasks,
  getSingleTask,
};
