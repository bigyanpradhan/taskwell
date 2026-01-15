const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
});

const checkConnection = async () => {
  try {
    const date = await pool.query(`SELECT NOW()`);
    console.log(`Postgres connection is successful at: ${date}`);
  } catch (error) {
    console.log("Postgres connection failed:", error.message);
  }
};

module.exports = {
  pool,
  checkConnection,
};
