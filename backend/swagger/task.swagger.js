/**
 * @swagger
 * # --- Tasks Collections ---
 * paths:
 *  securityScheme:
 *
 *
 *  /tasks:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Get All Tasks
 *          parameters:
 *              - in: query
 *                name: page
 *                schema:
 *                  type: integer
 *                  minimum: 1
 *                  default: 1
 *                required: true
 *                description: "Page number for pagination purposes."
 *          responses:
 *              "200":
 *                  description: Tasks Fetched.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: All Tasks for authenticated user fetched.
 *                                  tasks:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Task'
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Create a Task
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title:
 *                              - description:
 *                              - status:
 *                              - dueDate:
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: Be Production enabled
 *                              description:
 *                                  type: string
 *                                  example: Learn Swagger API documentation. Unit Testings. Clean Code principles application in the code.
 *                              status:
 *                                  type: string
 *                                  enum:
 *                                      - Pending
 *                                      - In Progress
 *                                      - Completed
 *                                      - Canceled
 *                              dueDate:
 *                                  type: string
 *                                  format: date-time
 *                                  example: "2026-01-19 09:05:12.745749"
 *
 *          responses:
 *              "201":
 *                  description: Task Created.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Task Created
 *                                  task:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                              example: 1
 *                                          title:
 *                                              type: string
 *                                              example: Work on Task Management swagger
 *                                          description:
 *                                              type: string
 *                                              example: description
 *                                          current_status:
 *                                              type: string
 *                                              example: In Progress
 *                                          due_date:
 *                                              type: string
 *                                              format: date-time
 *                                              example: 2026-01-20T00:00:00.000Z
 *                                          userId:
 *                                              type: number
 *                                              example: 1
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *  /tasks/{id}:
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Update the Task
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                  minimum: 1
 *                required: true
 *                description: "The id of the task to update."
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title:
 *                              - description:
 *                              - status:
 *                              - dueDate:
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: Be Production enabled
 *                              description:
 *                                  type: string
 *                                  example: Learn Swagger API documentation. Unit Testings. Clean Code principles application in the code.
 *                              status:
 *                                  type: string
 *                                  enum:
 *                                      - Pending
 *                                      - In Progress
 *                                      - Completed
 *                                      - Canceled
 *                              dueDate:
 *                                  type: string
 *                                  format: date-time
 *                                  example: "2026-01-19 09:05:12.745749"
 *
 *          responses:
 *              "200":
 *                  description: Task Updated.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Updated the task Successfully
 *                                  note:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                              example: 1
 *                                          title:
 *                                              type: string
 *                                              example: title
 *                                          description:
 *                                              type: string
 *                                              example: description
 *                                          current_status:
 *                                              type: string
 *                                              example: In Progress
 *                                          due_date:
 *                                              type: string
 *                                              format: date-time
 *                                              example: 2026-01-19T18:15:00.000Z
 *                                          userId:
 *                                              type: number
 *                                              example: 1
 *
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Delete the Task
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                  minimum: 1
 *                required: true
 *                description: "The id of the task to delete."
 *
 *          responses:
 *              "200":
 *                  description: Task Deleted.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Deleted Task
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *  /gettasks/{id}:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Get a single Task
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                  minimum: 1
 *                required: true
 *                description: "The id of the task to fetch."
 *
 *          responses:
 *              "200":
 *                  description: Single Task Fetched.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Task found for user
 *                                  task:
 *                                      $ref: '#/components/schemas/Task'
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *  /searchTasks:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Tasks Routes
 *          summary: Search for all the tasks matching the search term
 *          parameters:
 *              - in: query
 *                name: searchTerm
 *                schema:
 *                  type: string
 *                description: "The search term for searching the tasks."
 *
 *          responses:
 *              "200":
 *                  description: Tasks fetched based on search term.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Search Completed
 *                                  tasks:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Task'
 *
 *              "401":
 *                  $ref: '#/components/responses/UnauthenticatedUser'
 *
 *              "403":
 *                  $ref: '#/components/responses/UnauthorizedUser'
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 */
