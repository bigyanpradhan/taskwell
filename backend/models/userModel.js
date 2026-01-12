const { pool } = require("../db/connect");
const bcrypt = require("bcrypt");

const User = {
  create: async (firstName, lastName, email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, last_name, email`;
      const values = [firstName, lastName, email, hashedPassword];

      const result = await pool.query(query, values);

      return result.rows[0];
    } catch (error) {
      console.log("Error while creating a user:", error.message);
    }
  },

  findByEmail: async (email) => {
    try {
      const query = `SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = $1`;
      const value = [email];

      const result = await pool.query(query, value);

      return result.rows[0] || false;
    } catch (error) {
      console.log(
        "Error while trying to find the user by email:",
        error.message
      );
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const value = [id];

      const result = await pool.query(query, value);

      return result.rows[0];
    } catch (error) {
      console.log("Error while trying to get the user by id:", error.message);
    }
  },

  updatePassword: async (id, email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2 AND email = $3
      RETURNING id, email
    `;

      const values = [hashedPassword, id, email];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error while updating the password:", error.message);
      throw error; // important so controller knows it failed
    }
  },
};

module.exports = User;
