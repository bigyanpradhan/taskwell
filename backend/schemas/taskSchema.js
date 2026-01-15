const { z } = require("zod");

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(50, { message: "Title must be no more than 50 characters." }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  status: z.enum(["Pending", "In Progress", "Completed", "Canceled"], {
    message: "Choose one status",
  }),
  dueDate: z.iso.datetime({ message: "Choose a Due Date" }),
});

module.exports = { taskSchema };
