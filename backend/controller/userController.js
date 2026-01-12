const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");

const sample = async (req, res) => {
  try {
    return res.status(200).json({ message: "Tired" });
  } catch (error) {
    console.log("Error", error.message);
  }
};

const userSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.json({
        message:
          "All fields 'firstName, lastName, email, password' are required.",
      });
    }

    const userExists = await User.findByEmail(email);

    if (userExists) {
      return res.json({ message: "User with this email already exists" });
    }

    const user = await User.create(firstName, lastName, email, password);

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "72h",
      }
    );

    return res.json({
      message: "Account creation successful",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error during account creation", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: 'All fields"email, password" are required.',
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.json({
        message: "No user found with this email.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.json({
        message: "Invalid Password",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "72h",
      }
    );

    return res.json({
      message: "Login Successful.",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error during account creation", error.message);
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body.email;

    if (!email) {
      return res.json({
        message: "Email is required.",
      });
    }
    console.log("Email received:", email);
    const user = await User.findByEmail(email);
    if (!user) {
      return res.json({
        message: "No user found with this email.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300, // 5 minutes
      }
    );
    console.log("Generated token:", token);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: http://localhost:3000/resetpassword?token=${token}
    This link will expire in 5 minutes. If expired you will be redirected to the forgot password page to request a new link.

    Regards,
    Taskwell team`,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    return res.json({
      message: "Password reset email sent successfully.",
      info: mailResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body || false;
    const decoded = req.user || false;
    console.log(password);
    if (!password) {
      return res.json({
        message: "Password is required.",
      });
    }

    const user = await User.updatePassword(decoded.id, decoded.email, password);

    return res.json({
      message: "Password updated successfully.",
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = {
  sample,
  userSignUp,
  userSignIn,
  changePassword,
  sendEmail,
};
