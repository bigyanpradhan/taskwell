const { taskSchema } = require("../taskSchema");

describe("taskSchema", () => {
  describe("Valid Inputs", () => {
    // should pass when the inputs are valid
    it("should pass when the inputs are valid", () => {
      const body = {
        title: "Unit Testing",
        description: "Doing",
        status: "In Progress",
        dueDate: "2026-01-23T14:30:00.000Z",
      };

      const result = taskSchema.safeParse(body);

      expect(result.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    describe("Missing Inputs", () => {
      // should fail when title field is empty
      it("should fail when title field is empty", () => {
        const body = {
          title: "",
          description: "Doing",
          status: "In Progress",
          dueDate: "2026-01-23T14:30:00.000Z",
        };

        const result = taskSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().title._errors[0]).toMatch(/Title/i);
      });

      // should fail when description field is empty
      it("should fail when description field is empty", () => {
        const body = {
          title: "Unit Testing",
          description: "",
          status: "In Progress",
          dueDate: "2026-01-23T14:30:00.000Z",
        };

        const result = taskSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().description._errors[0]).toMatch(
          /Description/i,
        );
      });

      // should fail when status field is empty
      it("should fail when status field is empty", () => {
        const body = {
          title: "Unit Testing",
          description: "Doing",
          status: "",
          dueDate: "2026-01-23T14:30:00.000Z",
        };

        const result = taskSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().status._errors[0]).toMatch(
          /Choose one status/i,
        );
      });

      // should fail when duedate field is empty
      it("should fail when duedate field is empty", () => {
        const body = {
          title: "Unit Testing",
          description: "Doing",
          status: "In Progress",
          dueDate: "",
        };

        const result = taskSchema.safeParse(body);

        expect(result.success).toBe(false);
        expect(result.error.format().dueDate._errors[0]).toMatch(
          /Choose a Due Date/i,
        );
      });
    });

    // should fail when the title is more than 50 characters long
    it("should fail when the title is more than 50 characters long", () => {
      const body = {
        title:
          "Unit Testingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        description: "Doing",
        status: "In Progress",
        dueDate: "2026-01-23T14:30:00.000Z",
      };

      const result = taskSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().title._errors[0]).toMatch(
        /Title must be no more than 50 characters./i,
      );
    });

    // should fail when status is not one of the enum values
    it("should fail when status is not one of the enum values", () => {
      const body = {
        title: "Unit Testing",
        description: "Doing",
        status: "In",
        dueDate: "2026-01-23T14:30:00.000Z",
      };

      const result = taskSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().status._errors[0]).toMatch(
        /Choose one status/i,
      );
    });

    // should fail is the dueDate is not of the isoDateTime format
    it("should fail is the dueDate is not of the isoDateTime format", () => {
      const body = {
        title: "Unit Testing",
        description: "Doing",
        status: "In Progress",
        dueDate: "2026-01-",
      };

      const result = taskSchema.safeParse(body);

      expect(result.success).toBe(false);
      expect(result.error.format().dueDate._errors[0]).toMatch(
        /Choose a Due Date/i,
      );
    });
  });
});
