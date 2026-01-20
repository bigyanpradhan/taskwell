const {
  userSignUp,
  userSignIn,
  changePassword,
  sendEmail,
} = require("../../controller/userController");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

jest.mock("../../models/userModel");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("nodemailer");

describe("User Controller", () => {
  describe("Sign Up By User", () => {
    let req = { body: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };

    // User provides invalid inputs
    it("should return status 422 when the input is invalid", async () => {
      req.body = {
        firstName: "biasih",
        lastName: "fadsd",
        email: "dassad",
        password: "afsdnierni",
      };
      await userSignUp(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "The input isn't valid.",
      });
    });

    // User Provides valid inputs but user's email already exists(email is made to be distinct)
    it("should return status 409 when the user's email is already registered", async () => {
      req.body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue({
        id: 1,
        email: "john.wick@continental.com",
      });

      await userSignUp(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "User with this email already exists",
      });
    });

    // User provides valid inputs but error occurs
    it("should return status 500 when an error occurs even when the input is valid", async () => {
      req.body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      // User.findByEmail.mockRejectedValue(new Error("Db error"));

      User.findByEmail.mockResolvedValue(null);
      User.create.mockRejectedValue(new Error("DB error"));

      await userSignUp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });

    // user provides valid inputs and the account is created(response checking)
    it("should return 201 when user is created successfully", async () => {
      req.body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue(null);

      User.create.mockReturnValue({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        email: "john.wick@continental.com",
      });

      jwt.sign.mockReturnValue("JWTTOKEN");

      await userSignUp(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Account creation successful",
        user: {
          id: 1,
          firstName: "John",
          lastName: "Wick",
          email: "john.wick@continental.com",
        },
        accessToken: "JWTTOKEN",
      });
    });
  });

  describe("Sign In By User", () => {
    let req = { body: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // User Provides invalid inputs
    it("should return 422 status when user input is invalid", async () => {
      req.body = {
        email: "john.wick@continental.com",
        password: "",
      };

      await userSignIn(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "The inputs are invalid.",
      });
    });

    // User Provides valid input but email doesn't match with registered users
    it("should return 401 status when the user email isn't found to be registered", async () => {
      req.body = {
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue(null);

      await userSignIn(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "No user found with this email.",
      });
    });

    // User Provides valid input but password doesn't match with the registered email
    it("should return 401 status when valid user is found but the password isnt a match", async () => {
      req.body = {
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        password_hash: "hashedpassword",
      });

      bcrypt.compare.mockResolvedValue(false);

      await userSignIn(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid Password",
      });
    });

    // User Provides valid inputs and user is verified but error occurs
    it("should return 500 status when an error occurs", async () => {
      req.body = {
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        password_hash: "hashedpassword",
      });

      bcrypt.compare.mockRejectedValue(new Error("Something"));

      await userSignIn(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    // User Provides valid input and is able to sign in(response checking)
    it("should return 200 status when a login is successful", async () => {
      req.body = {
        email: "john.wick@continental.com",
        password: "Johnwick1",
      };

      User.findByEmail.mockResolvedValue({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        email: "john.wick@continental.com",
        password_hash: "hashedpassword",
      });

      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue("JWTTOKEN");

      await userSignIn(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login Successful.",
        user: {
          id: 1,
          firstName: "John",
          lastName: "Wick",
          email: "john.wick@continental.com",
        },
        accessToken: "JWTTOKEN",
      });
    });
  });

  describe("Send Reset Password Email", () => {
    let req = { body: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // User provides invalid inputs
    it("should return 422 status when user input is invalid", async () => {
      req.body = {
        email: {
          email: "johnwick.",
        },
      };

      await sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: "The input is invalid.",
      });
    });

    // User Provides valid input but email doesn't match with registered users
    it("should return 401 status when the email is not found to be registered", async () => {
      req.body = {
        email: {
          email: "john.wick@continental.com",
        },
      };

      User.findByEmail.mockResolvedValue(null);

      await sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "No user found with this email.",
      });
    });

    // User provides valid input is verified as registered but mailresponse encounters an error
    it("should return 500 status when the database or trasnporter or response encounters an error", async () => {
      req.body = {
        email: {
          email: "john.wick@continental.com",
        },
      };

      User.findByEmail.mockRejectedValue(new Error("DB Error"));

      // Error could accur anywhere in these functions
      // User.findByEmail.mockRejectedValue();
      // jwt.sign.mockRejectedValue();
      // nodemailer.createTransport().mockRejectedValue;
      // transporter.sendMail.mockRejectedValue();

      await sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error.",
      });
    });

    // user provides valid input and mailresponse is sent properly(response checking)
    it("should return 200 status if the email is sent successfully", async () => {
      req.body = {
        email: {
          email: "john.wick@continental.com",
        },
      };

      User.findByEmail.mockResolvedValue({
        id: 1,
        email: "john.wick@continental.com",
      });

      jwt.sign.mockReturnValue("JWTSIGN");

      const sendMailMock = jest.fn().mockResolvedValue("MAIL SENT");

      nodemailer.createTransport.mockReturnValue({
        sendMail: sendMailMock,
      });

      await sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password reset email sent successfully.",
        info: "MAIL SENT",
      });
    });
  });

  describe("Password Change Initiated By User", () => {
    let req = { body: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    // User provides invalid inputs
    it("should return 422 when the input provided by user is invalid", async () => {
      req.body = {
        password: "helloasdassdasaas",
      };

      await changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("Password"),
      });
    });

    // User has valid reset token but updating password encounters error
    it("should return 500 status when an error is encountered", async () => {
      req.body = {
        password: "HelloHell0",
      };

      User.updatePassword.mockRejectedValue(new Error("DB Error"));

      await changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error.",
      });
    });

    // User has valid token and update works properly(response cheking)
    it("should return 200 when the password is updated successfully", async () => {
      req.body = {
        password: "HelloHell0",
      };

      User.updatePassword.mockResolvedValue({
        id: 1,
        email: "john.wick@continental.com",
        password: "hasedpassword",
      });

      await changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password updated successfully.",
        id: 1,
        email: "john.wick@continental.com",
      });
    });
  });
});
