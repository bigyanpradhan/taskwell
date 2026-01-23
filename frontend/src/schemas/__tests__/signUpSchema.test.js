const { signUpSchema } = require("../signUpSchema");

describe("signUpSchema", () => {
  describe("Valid Inputs", () => {
    // should pass when all fields are valid
    it("should pass when all fields are valid", () => {
      const body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick@continental.com",
        password: "HelloHell0",
      };

      const result = signUpSchema.safeParse(body);

      expect(result.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    describe("Missing Inputs", () => {
      // should fail when first name is missing
      it("should fail when the first name is missing", () => {
        const body = {
          firstName: "",
          lastName: "Wick",
          email: "john.wick@continental.com",
          password: "HelloHell0",
        };

        const result = signUpSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().firstName._errors[0]).toMatch(
          /Too small/i,
        );
      });

      // should fail when last name is missing
      it("should fail when the first name is missing", () => {
        const body = {
          firstName: "John",
          lastName: "",
          email: "john.wick@continental.com",
          password: "HelloHell0",
        };

        const result = signUpSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().lastName._errors[0]).toMatch(/Too small/i);
      });

      // should fail when email is missing
      it("should fail when the email is missing", () => {
        const body = {
          firstName: "John",
          lastName: "Wick",
          email: "",
          password: "HelloHell0",
        };

        const result = signUpSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().email._errors[0]).toMatch(/Email/i);
      });

      // should fail when password is missing
      it("should fail when the password is missing", () => {
        const body = {
          firstName: "John",
          lastName: "Wick",
          email: "john.wick@continental.com",
          password: "",
        };

        const result = signUpSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().password._errors[0]).toMatch(/Password/i);
      });
    });

    // should fail when the email format is not valid
    it("should fail when the email format is not valid", () => {
      const body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick.com",
        password: "HelloHell0",
      };

      const result = signUpSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().email._errors[0]).toMatch(/Invalid Email/i);
    });

    // should fail when password isn't 8 letters long
    it("should fail when password isn't 8 letters long", () => {
      const body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick.com",
        password: "Hello0",
      };

      const result = signUpSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().password._errors[0]).toMatch(
        /Password must be at least 8 characters long/i,
      );
    });

    // should fail when password doesn't include 1 uppercase, 1 lowercase letter and 1 number (at least)
    it("should fail when password doesn't include 1 uppercase, 1 lowercase letter and 1 number (at least)", () => {
      const body = {
        firstName: "John",
        lastName: "Wick",
        email: "john.wick.com",
        password: "hellohello",
      };

      const result = signUpSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().password._errors[0]).toMatch(
        /include at least one uppercase letter, one lowercase letter/i,
      );
    });
  });
});
