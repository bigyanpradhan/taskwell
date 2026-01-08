const { pool } = require("pg");
const bcrypt = require("bcrypt");

const User = {
  create: async (firstName, lastName, email, password) => {
    try {
      const salt = bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(password, salt);

      const query = `INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES $1, $2, $3, $4
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
      const query = `SELECT id, first_name, last_name, email FROM users WHERE email = $1`;
      const value = [email];

      const result = await pool.query(query, value);

      return result.rows[0];
    } catch (error) {
      console.log(
        "Error while trying to find the user by email:",
        error.message
      );
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
    const query = `UPDATE users
                        SET password_hash = $1
                        WHERE id = $2 AND email = $3`;

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const values = [hashedPassword, id, email];

    const result = await pool.query(query, values);

    return result.rows[0];
  },
};

module.exports = User;
