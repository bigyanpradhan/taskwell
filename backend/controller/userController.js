const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { signUpSchema } = require("../schemas/signUpSchema");
const {
  loginSchema,
  emailValidation,
  passwordValidation,
} = require("../schemas/loginSchema");

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = signUpSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });

  if (result.success) {
    try {
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          message:
            "All fields 'firstName, lastName, email, password' are required.",
        });
      }

      const userExists = await User.findByEmail(email);

      if (userExists) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
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

      return res.status(201).json({
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
  } else {
    return res.status(422).json({ message: "The input isn't valid." });
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });

  if (result.success) {
    try {
      if (!email || !password) {
        return res.status(409).json({
          message: 'All fields"email, password" are required.',
        });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          message: "No user found with this email.",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({
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

      return res.status(200).json({
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
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(422).json({ message: "The inputs are invalid." });
  }
};

const sendEmail = async (req, res) => {
  const { email } = req.body.email;

  const result = emailValidation.safeParse(email);

  if (result.success) {
    try {
      if (!email) {
        return res.status(400).json({
          message: "Email is required.",
        });
      }
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({
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
          expiresIn: 300,
        }
      );

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
      const mailResponse = await transporter.sendMail(mailOptions);

      return res.status(200).json({
        message: "Password reset email sent successfully.",
        info: mailResponse,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(422).json({ message: "The input is invalid." });
  }
};

const changePassword = async (req, res) => {
  const { password } = req.body || false;

  const result = passwordValidation.safeParse(password);

  if (result.success) {
    try {
      const decoded = req.user || false;

      const user = await User.updatePassword(
        decoded.id,
        decoded.email,
        password
      );

      return res.status(200).json({
        message: "Password updated successfully.",
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  } else {
    return res.status(422).json({ message: result.error.issues[0].message });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  changePassword,
  sendEmail,
};
