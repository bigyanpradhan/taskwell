const { pool } = require("../db/connect");

const Task = {
  createTask: async (title, description, status, userId, dueDate) => {
    const query = `INSERT INTO tasks(title, description, current_status, due_date, "userId")
    VALUES($1, $2, $3, $4, $5)
    RETURNING id, title, description, current_status, due_date, "userId"`;
    const values = [title, description, status, dueDate, userId];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAllTasks: async (userId) => {
    const query = `SELECT * FROM tasks WHERE "userId" = $1 ORDER BY updated_at DESC`;
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows;
  },

  getOneTask: async (taskId, userId) => {
    const query = `SELECT * FROM tasks WHERE id = $1 AND "userId" = $2`;
    const values = [taskId, userId];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  updateTask: async (taskId, userId, updates) => {
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
  },

  deleteTasks: async (taskId, userId) => {
    const query = `DELETE FROM tasks WHERE id = $1 AND "userId" = $2`;
    const values = [taskId, userId];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  searchTasks: async (searchTerm, userId) => {
    const query = `SELECT * FROM tasks WHERE "userId" = $1 AND (title ILIKE $2 OR description ILIKE $2)`;
    console.log(searchTerm);
    const values = [userId, `%${searchTerm}%`];

    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = Task;
