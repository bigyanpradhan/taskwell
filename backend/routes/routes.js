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
  updateStatus,
  updateDueDate,
  deleteTasks,
  searchTasks,
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
router.get("/getTasks", authenticateToken, getTasks);
router.post("/createTask", authenticateToken, createTask);
router.put("/updateTask", authenticateToken, updateTasks);
router.patch("/updateStatus", authenticateToken, updateStatus);
router.patch("/updateDueDate", authenticateToken, updateDueDate);
router.delete("/deleteTask", authenticateToken, deleteTasks);
// router.get('/searchTasks', authenticateToken, searchTasks);

module.exports = router;
