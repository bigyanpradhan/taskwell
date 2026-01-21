const { pool } = require("../db/connect");

const Task = {
  createTask: async (title, description, status, userId, dueDate) => {
    try {
      const query = `INSERT INTO tasks(title, description, current_status, due_date, "userId")
      VALUES($1, $2, $3, $4, $5)
      RETURNING id, title, description, current_status, due_date, "userId"`;
      const values = [title, description, status, dueDate, userId];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },

  getAllTasks: async (userId, page) => {
    try {
      const limit = 12;
      const offset = limit * (page - 1);

      const query = `SELECT * FROM tasks WHERE "userId" = $1 ORDER BY updated_at DESC LIMIT $2 OFFSET $3`;
      const values = [userId, limit, offset];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },

  getOneTask: async (taskId, userId) => {
    try {
      const query = `SELECT * FROM tasks WHERE id = $1 AND "userId" = $2`;
      const values = [taskId, userId];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },

  updateTask: async (taskId, userId, updates) => {
    try {
      const query = `UPDATE tasks SET title = $1, description = $2, current_status = $3, due_date = $4 WHERE id = $5 AND "userId" = $6
      RETURNING id, title, description, current_status, due_date, "userId"`;
      const values = [
        updates.title,
        updates.description,
        updates.status,
        updates.dueDate,
        taskId,
        userId,
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },

  deleteTasks: async (taskId, userId) => {
    try {
      const query = `DELETE FROM tasks WHERE id = $1 AND "userId" = $2`;
      const values = [taskId, userId];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },

  searchTasks: async (searchTerm, userId) => {
    try {
      const query = `SELECT * FROM tasks WHERE "userId" = $1 AND (title ILIKE $2 OR description ILIKE $2)`;
      const values = [userId, `%${searchTerm}%`];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.log("Internal DB Server Error.", error.message);
      throw error;
    }
  },
};

module.exports = Task;
