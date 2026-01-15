const { z } = require("zod");
const { emailValidation, passwordValidation } = require("./loginSchema");

const signUpSchema = z.object({
  firstName: z
    .string({
      required_error: "Firstname is mandatory.",
    })
    .min(1),
  lastName: z
    .string({
      required_error: "Lastname is mandatory.",
    })
    .min(1),
  email: emailValidation,
  password: passwordValidation,
});

module.exports = {
  signUpSchema,
};
