const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  changePassword,
  sendEmail,
} = require("../controller/userController");
const {
  createTask,
  getTasks,
  updateTasks,
  deleteTasks,
  searchTasks,
  getSingleTask,
} = require("../controller/taskController");
const {
  authenticateToken,
  authenticateResetToken,
} = require("../middleware/authenticator");

//AUTH CONTROLLERS
router.post("/auth/login", userSignIn);
router.post("/auth/register", userSignUp);
router.patch("/auth/reset-password", authenticateResetToken, changePassword);
router.post("/auth/send-email", sendEmail);

//TASK CONTROLLERSupdate
router.get("/tasks", authenticateToken, getTasks);
router.get("/tasks/:id", authenticateToken, getSingleTask);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTasks);
router.delete("/tasks/:id", authenticateToken, deleteTasks);
router.get("/searchTasks", authenticateToken, searchTasks);

module.exports = router;
