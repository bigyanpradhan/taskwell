const jwt = require("jsonwebtoken");
const {
  authenticateToken,
  authenticateResetToken,
} = require("../../middleware/authenticator");

jest.mock("jsonwebtoken");

describe("Authenticator Middleware", () => {
  describe("authenticateToken", () => {
    let req = { headers: {}, user: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    let next = jest.fn();

    // No token found
    it("should return 401 status when no token is found", async () => {
      req.headers = { authorization: "" };

      await authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Token not found" });
    });

    // Token present but Invalid
    it("should return 403 when the token is invalid or expired", async () => {
      req.headers = { authorization: "Bearer token" };

      jwt.verify.mockImplementation((token, key, cb) =>
        cb(new Error("Invalid Token"), null)
      );

      await authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "invalid token" });
    });

    // token valid
    it("should decode and set a user key in the request if token is valid", async () => {
      req.headers = { authorization: "Bearer token" };

      jwt.verify.mockImplementation((token, key, cb) =>
        cb(null, {
          id: 1,
          first_name: "John",
          email: "john.wick@continental.com",
        })
      );

      await authenticateToken(req, res, next);

      expect(req.user).toEqual({
        id: 1,
        first_name: "John",
        email: "john.wick@continental.com",
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe("authenticateResetToken", () => {
    let req = { headers: {}, body: {}, user: {} };
    let res = {
      status: jest.fn((x) => x).mockReturnThis(),
      json: jest.fn((x) => x),
    };
    let next = jest.fn();

    // No token found
    it("should return 401 status when no token is found", async () => {
      req.body = { token: "" };
      req.headers = { authorization: "" };

      await authenticateResetToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Token not found" });
    });

    // Token present but Invalid
    it("should return 403 when the token is invalid or expired", async () => {
      req.body = { token: "token" };

      jwt.verify.mockImplementation((token, key, cb) =>
        cb(new Error("Invalid Token"), null)
      );

      await authenticateResetToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid or expired token",
      });
    });

    // token valid
    it("should decode and set a user key in the request if token is valid", async () => {
      req.body = { token: "token" };
      // req.headers = {authorization: "Bearer token"}

      jwt.verify.mockImplementation((token, key, cb) =>
        cb(null, {
          id: 1,
          first_name: "John",
          email: "john.wick@continental.com",
        })
      );

      await authenticateResetToken(req, res, next);

      expect(req.user).toEqual({
        id: 1,
        first_name: "John",
        email: "john.wick@continental.com",
      });
      expect(next).toHaveBeenCalled();
    });
  });
});
