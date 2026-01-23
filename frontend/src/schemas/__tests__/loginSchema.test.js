import { loginSchema } from "../loginSchema";

describe("loginSchema", () => {
  describe("Valid Inputs", () => {
    it("should pass with the valid inputs", () => {
      const body = {
        email: "john.wick@continental.com",
        password: "HelloHell0",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    // should fail when the email field is missing
    it("should fail if any of the field is missing", () => {
      const body = {
        email: "",
        password: "HelloHell0",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().email?._errors.length).toBeGreaterThan(0);
    });

    // should fail when the password field is missing
    it("should fail if any of the field is missing", () => {
      const body = {
        email: "john.wick@continental.com",
        password: "",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().password?._errors.length).toBeGreaterThan(0);
    });

    // should fail when the email format is not valid
    it("should fail when email is invalid", () => {
      const body = {
        email: "john.wick",
        password: "HelloHell0",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().email._errors[0]).toMatch(/invalid email/i);
    });

    // should fail when password is short
    it("should fail when the password is not longer than 8 characters", () => {
      const body = {
        email: "john.wick@continental.com",
        password: "Hel1o",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().password._errors[0]).toMatch(
        /must be at least 8 characters/i,
      );
    });

    // should fail when password doesn't have at least 1 Uppercase, 1 lowercase letter and 1 number
    it("should fail when the password criteria isn't met", () => {
      const body = {
        email: "john.wick@continental.com",
        password: "hellohello",
      };

      const result = loginSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().password._errors[0]).toMatch(
        /include at least one uppercase letter,/i,
      );
    });
  });
});
