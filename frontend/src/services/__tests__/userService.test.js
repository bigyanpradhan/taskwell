import api from "../api";
import {
  createAccount,
  loginUser,
  resetPassword,
  sendResetEmail,
} from "../userService";

jest.mock("../api", () => ({
  post: jest.fn(),
  patch: jest.fn(),
}));

describe("userService", () => {
  describe("loginUser", () => {
    const credentials = {
      email: "john.wick@continental.com",
      password: "HelloHell0",
    };
    // should return accesstoken and some use detail when login is successful
    it("should return accesstoken and some use detail when login is successful", async () => {
      api.post.mockResolvedValue({
        data: {
          message: "Login Successful",
          user: {
            id: 1,
            first_name: "John",
            last_name: "Wick",
            email: credentials.email,
          },
        },
      });

      const result = await loginUser(credentials);

      expect(api.post).toHaveBeenCalledWith("/auth/login", credentials);
      expect(result).toEqual({
        message: "Login Successful",
        user: {
          id: 1,
          first_name: "John",
          last_name: "Wick",
          email: credentials.email,
        },
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.post.mockRejectedValue(new Error("API ERROR"));

      await expect(loginUser(credentials)).rejects.toThrow("API ERROR");
    });

    api;
  });

  describe("createAccount", () => {
    const userData = {
      firstName: "John",
      lastName: "Wick",
      email: "john.wick@continental.com",
      password: "HelloHell0",
    };
    // should return accesstoken and some user detail when user is registered
    it("should return accesstoken and some use detail when login is successful", async () => {
      api.post.mockResolvedValue({
        data: {
          message: "account Created",
          user: {
            id: 1,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
          },
          accessToken: "accesstoken",
        },
      });

      const result = await createAccount(userData);

      expect(api.post).toHaveBeenCalledWith("/auth/register", userData);
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.post.mockRejectedValue(new Error("API ERROR"));

      await expect(createAccount(userData)).rejects.toThrow("API ERROR");
    });
  });

  describe("sendResetEmail", () => {
    const email = "john.wick@continental.com";
    // should return email sent message when request is successful
    it("should return email sent message when request is successful", async () => {
      api.post.mockResolvedValue({
        data: {
          message: "Email sent Successfully",
        },
      });

      const result = await sendResetEmail(email);

      expect(api.post).toHaveBeenCalledWith("/auth/send-email", {
        email: "john.wick@continental.com",
      });

      expect(result).toEqual({
        message: "Email sent Successfully",
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.post.mockRejectedValue(new Error("API ERROR"));

      await expect(sendResetEmail(email)).rejects.toThrow("API ERROR");
    });
  });

  describe("resetPassword", () => {
    const body = {
      token: "token",
      password: "password",
    };
    // should return accesstoken and some use detail when login is successful
    it("should throw error if API call fails", async () => {
      api.patch.mockResolvedValue({
        data: {
          message: "Password Reset Successfully",
        },
      });

      const result = await resetPassword(body);

      expect(api.patch).toHaveBeenCalledWith("/auth/reset-password", body);

      expect(result).toEqual({
        message: "Password Reset Successfully",
      });
    });

    // should throw error if API call fails
    it("should throw error if API call fails", async () => {
      api.patch.mockRejectedValue(new Error("API ERROR"));

      await expect(resetPassword(body)).rejects.toThrow("API ERROR");
    });
  });
});
