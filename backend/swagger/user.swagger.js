/**
 * @swagger
 * # --- User Collections ---
 * paths:
 *  /login:
 *      post:
 *          tags:
 *              - User Routes
 *          summary: User Login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  format: email
 *                                  example: john.wick@continental.com
 *                              password:
 *                                  type: string
 *                                  format: password
 *                                  example: Passw0rd
 *          responses:
 *              "200":
 *                  description: Login Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Login Successful.
 *                                  user:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                              example: 1
 *                                          firstName:
 *                                              type: string
 *                                              example: John
 *                                          lastName:
 *                                              type: string
 *                                              example: Wick
 *                                          email:
 *                                              type: string
 *                                              format: email
 *                                              example: seraw65889@ixospace.com
 *                                  accessToken:
 *                                          type: string
 *                                          format: JWT
 *                                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiV2ljayIsImVtYWlsIjoic2VyYXc2NTg4OUBpeG9zcGFjZS5jb20iLCJpYXQiOjE3NjkwNTIzMTgsImV4cCI6MTc2OTMxMTUxOH0.h6Xp_ZwkQwSmURrKi-DxEq-D11Lhfev4u6r5Y1ScgUg"
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "401":
 *                  description: Invalid Credentials
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Invalid Password/No user found with this email.
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *  /create-account:
 *      post:
 *          tags:
 *              - User Routes
 *          summary: Creation of an Account by the User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required: true
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  example: John
 *                              lastName:
 *                                  type: string
 *                                  example: Wick
 *                              email:
 *                                  type: string
 *                                  format: email
 *                                  example: john.wick@continental.com
 *                              password:
 *                                  type: string
 *                                  format: password
 *                                  example: JohnWick1
 *
 *          responses:
 *              "201":
 *                  description: Account Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Account creation successful
 *                                  user:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                              example: 1
 *                                          firstName:
 *                                              type: string
 *                                              example: John
 *                                          lastName:
 *                                              type: string
 *                                              example: Wick
 *                                          email:
 *                                              type: string
 *                                              format: email
 *                                              example: john.wick@continental.com
 *                                  accessToken:
 *                                          type: string
 *                                          format: JWT
 *                                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJiaWd5YW4ucHJhZGhhbkB5Y290ZWsuY29tIiwiaWF0IjoxNzY5MDUzOTU3LCJleHAiOjE3NjkzMTMxNTd9.CKs4K6WqTZH1uUOWLDA1LruRbw7plNn8FTl1zZ10qGc"
 *
 *
 *              "409":
 *                  description: User already exists.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: User with this email already exists.
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *  /reset-password:
 *      patch:
 *          tags:
 *              - User Routes
 *          summary: Reset the Password using the reset token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - token
 *                              - password
 *                          properties:
 *                              token:
 *                                  description: Reset Token for the password reset operation.
 *                                  type: string
 *                                  format: JWT
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJiaWd5YW4ucHJhZGhhbkB5Y290ZWsuY29tIiwiaWF0IjoxNzY5MDUzOTU3LCJleHAiOjE3NjkzMTMxNTd9.CKs4K6WqTZH1uUOWLDA1LruRbw7plNn8FTl1zZ10qGc"
 *                              password:
 *                                  type: string
 *                                  format: password
 *                                  exmaple: NewPassw0rd
 *
 *          responses:
 *              "200":
 *                  description: Password Update Successful.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Password updated successfully.
 *                                  id:
 *                                      type: number
 *                                      example: 1
 *                                  email:
 *                                      type: string
 *                                      format: email
 *                                      example: john.wick@continental.com
 *
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 *
 *
 *  /send-email:
 *      post:
 *          tags:
 *              - User Routes
 *          summary: Send mail with the link to reset the password
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                          properties:
 *                              email:
 *                                  type: object
 *                                  required:
 *                                  - email
 *                                  properties:
 *                                      email:
 *                                          type: string
 *                                          format: email
 *                                          example: john.wick@continental.com
 *
 *          responses:
 *              "200":
 *                  description: Email sent Successfully.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          accepted:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                          rejected:
 *                                              type: array
 *                                          ehlo:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                          envelopeTime:
 *                                              type: number
 *                                          messageTime:
 *                                              type: number
 *                                          messageSize:
 *                                              type: number
 *                                          response:
 *                                              type: string
 *                                          envelope:
 *                                              type: object
 *                                              properties:
 *                                                  from:
 *                                                      type: string
 *                                                  to:
 *                                                      type: array
 *                                                      items:
 *                                                          type: string
 *                                          messageId:
 *                                              type: string
 *
 *              "404":
 *                  description: User not found.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No user found with this email.
 *
 *              "422":
 *                  $ref: '#/components/responses/InvalidInputs'
 *
 *              "500":
 *                  $ref: '#/components/responses/InternalServerError'
 *
 */
