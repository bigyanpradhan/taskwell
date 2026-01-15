const Task = require("../models/taskModel");
const { taskSchema } = require("../schemas/taskSchema");

const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const result = taskSchema.safeParse({ title, description, status, dueDate });

  if (result.success) {
    try {
      const user = req.user;

      if (!title || !dueDate || !description) {
        return res.json({ message: "All fields are required." });
      }

      const response = await Task.createTask(
        title,
        description,
        status,
        user.id,
        dueDate
      );

      return res.json({
        message: "Task Created",
        task: response,
      });
    } catch (error) {
      return res.json({ error: "Internal Server Error", msg: error.message });
    }
  } else {
    return res.json({ message: "The inputs are invalid." });
  }
};

const getTasks = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.json({ message: "Internal Server Error" });
    }

    const response = await Task.getAllTasks(user.id);
    return res.json({
      message: "All Tasks for authenticated user fetched.",
      tasks: response,
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
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
    return res.json({
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
      return res.json({
        message: "Updated the task Successfully",
        note: response,
      });
    } catch (error) {
      return res.json({ error: "Internal Server Error", msg: error.message });
    }
  } else {
    return res.json({ message: "The inputs are not valid." });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const response = await Task.deleteTasks(id, user.id);
    return res.json({
      message: "Deleted Task",
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const user = req.user;

    const response = await Task.updateStatus(id, user.id, status);
    return res.json({ message: "Updated the status of task", task: response });
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
  }
};

const updateDueDate = async (req, res) => {
  try {
    const { id, dueDate } = req.body;
    const user = req.user;

    const response = await Task.updateDueDate(id, user.id, dueDate);
    return res.json({
      message: "Updated the due date of task",
      task: response,
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
  }
};

const searchTasks = async (req, res) => {
  try {
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTasks,
  updateStatus,
  updateDueDate,
  deleteTasks,
  searchTasks,
  getSingleTask,
};
