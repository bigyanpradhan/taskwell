/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - first_name
 *              - last_name
 *              - email
 *              - password_hash
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *                  example: 1
 *                  description: "Auto-Generated Id of the User"
 *              first_name:
 *                  type: string
 *                  example: John
 *                  description: "The first name of the user."
 *              last_name:
 *                  type: string
 *                  example: Wick
 *                  description: "The last name of the user."
 *              email:
 *                  type: string
 *                  format: email
 *                  example: "john.wick@continental.com"
 *                  description: "The valid email of the user."
 *              password_hash:
 *                  type: string
 *                  format: bcrypt
 *                  example: "j3RSkxL1iJ4eFFzWQjNO..........."
 *                  description: "The password hashed using bcrypt."
 *              created_at:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  example: "2026-01-19 09:05:12.745749"
 *                  description: "The date-time when the user registered to the website."
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  example: "2026-01-19 09:05:12.745749"
 *                  description: "The date-time when the user details were last changed/updated."
 *
 *
 *      Task:
 *          type: object
 *          required:
 *              - title
 *              - description
 *              - current_status
 *              - due_date
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *                  readOnly: true
 *                  description: "Auto-Generated Id of the tasks."
 *              title:
 *                  type: string
 *                  example: Learn to use Swagger
 *                  description: "The title of the task."
 *              description:
 *                  type: string
 *                  example: Learn Swagger and develop the API Documentation for the Taskwell API
 *                  description: "The description part of the task."
 *              current_status:
 *                  type: string
 *                  enum:
 *                      - Pending
 *                      - In Progress
 *                      - Completed
 *                      - Canceled
 *                  description: "The current status of the task."
 *              due_date:
 *                  type: string
 *                  format: date-time
 *                  example: "2026-01-19 09:05:12.745749"
 *                  description: "The due date of the task set by the user."
 *              userId:
 *                  type: integer
 *                  readOnly: true
 *                  example: 1
 *                  description: "The id of the user associated with the task."
 *              created_at:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  example: "2026-01-19 09:05:12.745749"
 *                  description: "The date-time when the task was created."
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  example: "2026-01-19 09:05:12.745749"
 *                  description: "The date-time when the task was last updated by the user."
 *
 *
 *  responses:
 *      InternalServerError:
 *          description: Internal Server Error
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Internal Server Error.
 *
 *      InvalidInputs:
 *          description: Invalid Inputs
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: The inputs are invalid.
 *
 *      UnauthenticatedUser:
 *          description: Unauthenticated User
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User isn't authenticated.
 *
 *      UnauthorizedUser:
 *          description: Unauthorized User
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User isn't authorized.
 *
 */
