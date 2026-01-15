const express = require("express");
const router = express.Router();
const {
  sample,
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
  updateStatus,
  updateDueDate,
  getSingleTask,
} = require("../controller/taskController");
const {
  authenticateToken,
  authenticateResetToken,
} = require("../middleware/authenticator");

router.get("/", sample);
//USER CONTROLLERS
router.post("/login", userSignIn);
router.post("/create-account", userSignUp);
router.patch("/reset-password", authenticateResetToken, changePassword);
router.post("/send-email", sendEmail);

//TASK CONTROLLERSupdate
router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTasks);
router.delete("/tasks/:id", authenticateToken, deleteTasks);
router.get("/gettasks/:id", authenticateToken, getSingleTask);

// router.get('/searchTasks', authenticateToken, searchTasks);

// router.patch("/updateStatus", authenticateToken, updateStatus);
// router.patch("/updateDueDate", authenticateToken, updateDueDate);

module.exports = router;
