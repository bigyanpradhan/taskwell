const { z } = require("zod");

const emailValidation = z.email({
  message: "Invalid Email Address",
});

const passwordValidation = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters long.",
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
  });

const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

module.exports = {
  emailValidation,
  passwordValidation,
  loginSchema,
};
