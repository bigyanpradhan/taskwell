const { describe } = require("zod/v4/core");

describe("Task Controller", () => {
  describe("Task Creation By User", () => {
    // Invalid inputs for task is sent
    // Inputs are valid but the user isn't authenticated
    // Inputs are valid and user is authenticated but task creation encounters error.
    // Task creation is successful(response checking)
  });
  describe("Task fetching", () => {
    // No req body but only page query
    // User isn't authenticated
    // Error encountered during fetching tasks
    // All tasks for authenticated user fetched(response checking)
  });
  describe("Single Task Fetching", () => {
    // No req body but id param with taskid
    // User isn't authenticated
    // Error encountered during fetching tasks
    // The specific task with id for authenticated user is not found
    // The specific task with id for authenticated user is found (Response checking)
  });
  describe("Task Updates By User", () => {
    // Invalid inputs for task is sent
    // {MAYBE Check if the task exists or not too} will fail as i haven't made any checks for it in backend
    // Inputs are valid but the user isn't authenticated
    // Inputs are valid and user is authenticated but task creation encounters error.
    // Task creation is successful(response checking)
  });
  describe("Task Deletion By User", () => {
    // No request body but id param with task id is sent
    // User isn't authenticated
    // {MAYBE Check if the task exists or not too} will fail as i haven't made any checks for it in backend
    // Error encountered during deleting tasks
    // Task deleted successfully(response checking)
  });
  describe("Task Searching By user", () => {
    // No request body but searchTerm query is sent
    // Input/query is invalid
    // User isn't authenticated
    // Error during the search/fetching
    // Searched tasks aren't there or not found
    // Searched tasks are there or found
  });
});
