# Database Documentation

The database used is hosted on Neon Console. and is connected via a connection string. The databse contains two tables: users and tasks.

## TABLE: users

### TABLE

Description: This table stores registered users.

| Column Name   | Data Type    | Constraints | Description                                                  |
| ------------- | ------------ | ----------- | ------------------------------------------------------------ |
| id            | SERIAL       | PRIMARY KEY | Unique identifier of the registered user                     |
| first_name    | VARCHAR(75)  | NOT NULL    | The first name of the user.                                  |
| last_name     | VARCHAR(75)  | NOT NULL    | The last name of the user.                                   |
| email         | VARCHAR(255) | NOT NULL    | The registered email of the user.                            |
| password_hash | VARCHAR(255) | NOT NULL    | the hased password of the user.                              |
| created_at    | TIMESTAMP    | NOT NULL    | The timestamp of the time when the account was created.      |
| updated_at    | TIMESTAMP    | NOT NULL    | The timestamp of the time when the account was last updated. |

### TRIGGER: trigger_update_user_time

Event: Before UPDATE
Granularity: FOR EACH ROW

Description: Automatically updates the updated_at field when a user record changes.

Logic: Invokes update_timestamp() at every update

## TABLE: tasks

### TABLE

Description: This table stores the tasks of the users.

| Column Name    | Data Type    | Constraints                                    | Description                                                           |
| -------------- | ------------ | ---------------------------------------------- | --------------------------------------------------------------------- |
| id             | SERIAL       | PRIMARY KEY                                    | Unique identifier of the tasks created by the user                    |
| title          | VARCHAR(255) | NOT NULL                                       | The title of the task.                                                |
| description    | TEXT         | NOT NULL                                       | The detailed description of the task.                                 |
| current_status | status(ENUM) | NOT NULL                                       | Current status of the task.                                           |
| due_date       | TIMESTAMP    | NOT NULL                                       | The due date of the task or date by which the task must be completed. |
| userId         | INTEGER      | FOREIGN KEY (references id of the users table) | The id of the user that creates the task(specific)                    |
| created_at     | TIMESTAMP    | NOT NULL                                       | The timestamp of the time when the task was first created.            |
| updated_at     | TIMESTAMP    | NOT NULL                                       | The timestamp of the time when the task was last updated.             |

### TRIGGER: trigger_update_task_time

Event: Before UPDATE
Granularity: FOR EACH ROW

Description: Automatically updates the updated_at field when a task record changes.

Logic: Invokes update_timestamp() at every update

## ENUM Type: status

Type: ENUM
Description: It is used in the tasks table in the status column. It is used to enforce valid task states at the database level.
Values:

- Pending - Task created but ot started
- In Progress - Task currently being worked on
- Completed - Task finished successfully
- Canceled - Task intentionally stopped

## Function: update_timestamp

Type: Trigger Function
Description: Automatically updates the updated_at column whenever a row is modified
Behavior:

- Runs before UPDATE
- Sets the updated_at to the current timestamp
- Ensures consistent update tracking across tables

Used By:

- trigger_update_task_time
- trigger_update_user_time
