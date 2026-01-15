const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const router = require("./routes/routes");
const { checkConnection } = require("./db/connect");
require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(express.json());
app.use(express.urlencoded());
app.use(limiter);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", router);

const PORT = process.env.PORT;

const start = async () => {
  try {
    await checkConnection();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
};

start();
