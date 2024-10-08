<<<<<<< HEAD
# Issues Tracker API

## Description
This project is a RESTful API built with Node.js, Express, and MongoDB. It serves as an issue tracker where users can create, read, update, and delete issues.

## Features
- **Create Issue:** Allows users to create a new issue.
- **Read Issue:** Allows users to retrieve the list of issues or a specific issue by ID.
- **Update Issue:** Allows users to update the details of an existing issue by ID.
- **Delete Issue:** Allows users to delete an issue by ID.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js.


## API Endpoints

### 1. `GET /issues`
   - **Description:** Fetch all issues.
   - **Responses:**
     - `200 OK` on success, returns an array of issues.
     - `500 Internal Server Error` if there is a server error.

### 2. `GET /issues/:type`
   - **Description:** Fetch issues by type.
   - **Parameters:** 
     - `type` (path) – The type of the issues to retrieve.
   - **Responses:**
     - `200 OK` on success, returns the issue object.
     - `500 Internal Server Error` if there is a server error.

### 3. `POST /issues`
   - **Description:** Create a new issue.
   - **Body:**
     ```json
     {
       "title": "string",
       "description": "string",
       "type": "string"
     }
     ```
   - **Responses:**
     - `201 Created` on success, returns the created issue object.

### 4. `PUT /issues/:id`
   - **Description:** Update an existing issue by ID.
   - **Parameters:**
     - `id` (path) – The ID of the issue to update.
   - **Body:**
     ```json
     {
       "title": "string",
       "description": "string",
       "type": "string"
     }
     ```
   - **Responses:**
     - `200 OK` on success, returns the updated issue object.
     - `404 Not Found` if an issue with the specified ID does not exist.
     - `400 Bad Request` if the body is malformed, missing required parameters, or the ID is not a valid MongoDB ObjectId.
     - `500 Internal Server Error` if there is a server error.

### 5. `DELETE /issues/:id`
   - **Description:** Delete an issue by ID.
   - **Parameters:**
     - `id` (path) – The ID of the issue to delete.
   - **Responses:**
     - `204 No Content` on success.
     - `404 Not Found` if an issue with the specified ID does not exist.
     - `400 Bad Request` if the ID is not a valid MongoDB ObjectId.
     - `500 Internal Server Error` if there is a server error.

## Testing

To run the tests, navigate to the project directory and run the following command:
```sh
npm test
```

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

