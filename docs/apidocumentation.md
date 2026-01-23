# API Documentation

The routes provided by the backend for requests are:

## USER API ENDPOINTS

### Requirement: User Wants to Login

Description: Allows Users to sign in with credentials

- Endpoint: {{BASEURL}}/api/auth/login
- Method: POST
- Authentication: None
- Request:
  {
  "email" : "",
  "password": ""
  }
- Response:
  Sends the accessToken for session management and for authorization during task management.

### Requirement: User Wants to Create an Account

Description: Registers a new user

- Endpoint: {{BASEURL}}/api/auth/register
- Method: POST
- Authentication: None
- Request:
  {
  "firstName": "",
  "lastName" : "",
  "email": "",
  "password": ""
  }

Can be successful if every criteria is met.
Can be unsuccessful if the request input are not valid or the account already exists or their is an error.

- Response:
  Sends the accessToken for session management and for authorization during task management.

### Requirement: User Wants to Reset Password

Description: Allows Users to sign in with credentials

- Endpoint: {{BASEURL}}/api/auth/reset-password
- Method: PATCH
- Authentication: Through a jwt token specific for the reset password operation that is handled by authenticator middleware.
- Request:
  {
  "password" : ""
  }
- Response:

  Can be successful if the resettoken is validated.
  Can be unsuccessful if the resettoken expires or the input(password format) isn't valid.

### Requirement: User Wants to Receive Password Reset Email

Description: Allows Users to sign in with credentials

- Endpoint: {{BASEURL}}/api/auth/send-email
- Method: POST
- Authentication: None
- Request:
  {
  "email": {
  "email" : ""
  }
  }
- Response:
  Sends an email to the valid email address given in the input

## TASK API ENDPOINTS

### Requirement: User wants to see all tasks

Description: Retrieves all the tasks for the logged in user

- Endpoint: {{BASEURL}}/api/tasks
- Method: GET
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request: No body. Can contain query parameter page(used for pagination/infinite scrolling)
- Response: All the tasks for the authenticated user.

### Requirement: User wants to view a single task

Description: Retrieves a single task by it's ID

- Endpoint: {{BASEURL}}/api/tasks/:id
- Method: GET
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request: No Body. Has a specific param id which is the task id to fetch.
- Response: A task with the given id(if exists).

### Requirement: User wants to create a new task

Description: Creates a new task

- Endpoint: {{BASEURL}}/api/tasks
- Method: POST
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request:
  {
  "title" : "",
  "description" : "",
  "status" : "",
  "dueDate": ""
  }
- Response:
  The task that is created and its contents.

### Requirement: User wants to update a task

Description: Updates a specific task by ID

- Endpoint: {{BASEURL}}/api/tasks/:id
- Method: PUT
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request: A id param referencing the id of the task is sent in the request url.
  {
  "title" : "",
  "description" : "",
  "status" : "",
  "dueDate": ""
  }
- Response: The updated task with its content(if exists and if the update is successful).

### Requirement: User wants to delete a task

Description: Deletes a specific task by ID

- Endpoint: {{BASEURL}}/api/tasks/:id
- Method: DELETE
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request: A id param referencing the id of the task is sent in the request url.
- Response: Nothing is sent as a response but the task referencing id is deleted.

### Requirement: User wants to search tasks based on title or description

Description: Searches tasks based on the query parameters

- Endpoint: {{BASEURL}}/api/searchTasks
- Method: GET
- Authentication: Required(Done through Authentication Header in sent in every request)
- Request: A query param is sent in the request url with key searchterm.
- Response: The tasks that match the searchTerm in title or description with cas insensitiveness.
