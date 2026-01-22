const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const router = require("./routes/routes");
const { checkConnection } = require("./db/connect");
const { errorHandler } = require("./middleware/errorHandler");
const AppError = require("./utils/appError");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 115,
});

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "TaskWell API",
      version: "1.0.0",
      description:
        "Taskwell is a task management system that allows users to create, update, search, fetch and delete tasks. This API provides endpoints for user creation and authntication, tasks CRUD operations and task searching as well. It is a comprehensive documentation to be followed in trying to understand the nature of request the frontend must send and the responses that it could receive from the backend.",
    },
    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
  },
  apis: ["./swagger/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded());
app.use(limiter);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api", router);

app.use(errorHandler);

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
