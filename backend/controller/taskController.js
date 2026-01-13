const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
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
    console.log(response);

    return res.json({
      message: "Task Created",
      task: response,
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error", msg: error.message });
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

const updateTasks = async (req, res) => {
  try {
    const updates = req.body;
    const user = req.user;

    const response = await Task.updateTask(updates.id, user.id, updates);
    return res.json({
      message: "Updated the task Successfully",
      note: response,
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

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;

    const response = await Task.deleteTasks(id, user.id);
    return res.json({
      message: "Deleted Task",
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
};
