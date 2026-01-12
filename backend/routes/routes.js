const express = require("express");
const router = express.Router();
const {
  sample,
  changePassword,
  sendEmail,
} = require("../controller/userController");
const { userSignUp, userSignIn } = require("../controller/userController");
const authenticateResetToken = require("../middleware/authenticateResetToken");

router.get("/", sample);
router.post("/login", userSignIn);
router.post("/create-account", userSignUp);
router.patch("/reset-password", authenticateResetToken, changePassword);
router.post("/send-email", sendEmail);

module.exports = router;
