const bcrypt = require("bcrypt");
const { pool } = require("../../db/connect");
jest.mock("../../db/connect", () => ({
  pool: {
    query: jest.fn(),
  },
}));
const User = require("../../models/userModel");

jest.mock("bcrypt");

describe("User Models", () => {
  describe("create", () => {
    // password is hashed and user is created
    it("should hash the password and insert a new user", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            first_name: "John",
            last_name: "Wick",
            email: "john.wick@continental.com",
          },
        ],
      });

      const result = await User.create(
        "John",
        "Wick",
        "john.wick@continental.com",
        "password"
      );

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "John",
        "Wick",
        "john.wick@continental.com",
        "hashedPassword",
      ]);

      expect(result).toEqual({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        email: "john.wick@continental.com",
      });
    });
    // DB error is encountered
    it("should log the error message in the console and the result should be undefined", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");

      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      const result = await User.create(
        "John",
        "Wick",
        "john.wick@continental.com",
        "password"
      );

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);

      expect(result).toBeUndefined();

      expect(logSpy).toHaveBeenCalledWith("Internal DB Server Error.");
    });
  });

  describe("findByEmail", () => {
    // should return user if found
    it("should return the user if the email is registered", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            first_name: "John",
            last_name: "Wick",
            email: "john.wick@continental.com",
            password_hash: "hashedPassword",
          },
        ],
      });

      const result = await User.findByEmail("john.wick@continental.com");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "john.wick@continental.com",
      ]);

      expect(result).toEqual({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        email: "john.wick@continental.com",
        password_hash: "hashedPassword",
      });
    });

    // should return false if not found
    it("should return false if the email isn't registered", async () => {
      pool.query.mockResolvedValue({
        rows: [],
      });

      const result = await User.findByEmail("john.wick@continental.com");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "john.wick@continental.com",
      ]);

      expect(result).toEqual(false);
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB Error"));

      const result = await User.findByEmail("john.wick@continental.com");

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "john.wick@continental.com",
      ]);

      expect(result).toBeUndefined();

      expect(logSpy).toHaveBeenCalledWith("Internal DB Server Error.");
    });
  });

  describe("getById", () => {
    // should return user of the id if exists
    it("should return the details of the user by the userId", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            first_name: "John",
            last_name: "Wick",
            email: "john.wick@continental.com",
            password_hash: "hashedPassword",
          },
        ],
      });

      const result = await User.getById(1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1]);

      expect(result).toEqual({
        id: 1,
        first_name: "John",
        last_name: "Wick",
        email: "john.wick@continental.com",
        password_hash: "hashedPassword",
      });
    });

    // DB error is encountered and is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      const result = await User.getById(1);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1]);

      expect(result).toBeUndefined();

      expect(logSpy).toHaveBeenCalledWith("Internal DB Server Error.");
    });
  });

  describe("updatePassword", () => {
    // password should be hashed and updated(patched)
    it("should hash the password and update it and return id and email of user", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");

      pool.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            email: "john.wick@continental.com",
          },
        ],
      });

      const result = await User.updatePassword(
        1,
        "john.wick@continental.com",
        "password"
      );

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "hashedPassword",
        1,
        "john.wick@continental.com",
      ]);

      expect(result).toEqual({
        id: 1,
        email: "john.wick@continental.com",
      });
    });

    // DB error encountered is logged
    it("should log the error message in the console and the result should be undefined", async () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      bcrypt.hash.mockResolvedValue("hashedPassword");

      pool.query.mockRejectedValue(new Error("DB ERROR"));

      const result = await User.updatePassword(
        1,
        "john.wick@continental.com",
        "password"
      );

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "hashedPassword",
        1,
        "john.wick@continental.com",
      ]);

      expect(result).toBeUndefined();

      expect(logSpy).toHaveBeenCalledWith("Internal DB Server Error.");
    });
  });
});
