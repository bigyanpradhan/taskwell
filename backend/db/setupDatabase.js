const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function setupTables() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
  });

  try {
    await client.connect();
    const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

    await client.query(sql);
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await client.end();
  }
}

setupTables();
