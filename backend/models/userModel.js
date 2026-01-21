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
      console.log("Internal DB Server Error.");
    }
  },

  findByEmail: async (email) => {
    try {
      const query = `SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = $1`;
      const value = [email];

      const result = await pool.query(query, value);

      return result.rows[0] || false;
    } catch (error) {
      console.log("Internal DB Server Error.");
    }
  },

  getById: async (id) => {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const value = [id];

      const result = await pool.query(query, value);

      return result.rows[0];
    } catch (error) {
      console.log("Internal DB Server Error.");
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
      console.log("Internal DB Server Error.");
    }
  },
};

module.exports = User;
