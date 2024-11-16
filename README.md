# Assignment Submission Portal - Backend

## Project Overview

The Assignment Submission Portal is a backend system designed to handle assignment submissions from users and provide a review mechanism for admins. Users can upload assignments, and admins can accept or reject them. The system is built using Node.js, Express, MongoDB, and JWT-based authentication.

## Features

- User Management:
  - Users can register, log in, and upload assignments.
- Admin Management:
  - Admins can register, log in, view assignments tagged to them, and accept or reject them.
- JWT Authentication:
  - Secure authentication using JSON Web Tokens (JWT).
- Assignment Management:
  - Users can upload assignments.
  - Admins can review, accept, or reject assignments.

## Technologies Used

- Node.js: JavaScript runtime for the server.
- Express.js: Web framework for building the API.
- MongoDB: NoSQL database for storing users, admins, and assignments.
- JWT (JSON Web Tokens): For authentication.
- Bcrypt.js: For password hashing.
- dotenv: To manage environment variables.

## API Endpoints

### User Endpoints

1. POST /register: Register a new user.
    - Request: 
      ```json
      {
        "userId": "Soumik",
        "email": "user@example.com",
        "password": "password123"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User registered successfully."
      }
      ```

2. POST /login: User login.
    - Request:
      ```json
      {
        "email": "user@example.com",
        "password": "password123"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Login successful."
      }
      ```

3. POST /upload: Upload an assignment.
    - Request:
      ```json
      {
        "task": "Hello World",
        "admin": "Alok"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Assignment uploaded successfully."
      }
      ```

4. GET /admins: Fetch all admins.
    - Response:
      ```json
      {
        "success": true,
        "admins": [
          { "firstName": "Alok", "lastName": "Kumar", "adminId": "A001" },
          { "firstName": "Raj", "lastName": "Singh", "adminId": "A002" }
        ]
      }
      ```

### Admin Endpoints

1. POST /register: Register a new admin.
    - Request:
      ```json
      {
        "firstName": "Alok",
        "lastName": "Kumar",
        "email": "admin@example.com",
        "adminId": "A001",
        "password": "admin123"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Admin registered successfully."
      }
      ```

2. POST /login: Admin login.
    - Request:
      ```json
      {
        "email": "admin@example.com",
        "password": "admin123"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Login successful."
      }
      ```

3. GET /assignments: View assignments tagged to the admin.
    - Response:
      ```json
      {
        "success": true,
        "assignments": [
          { "userId": "Soumik", "task": "Hello World", "accepted": false, "rejected": false },
          { "userId": "Ankit", "task": "Good Morning", "accepted": false, "rejected": false }
        ]
      }
      ```

4. POST /assignments/:id/accept: Accept an assignment.
    - Response:
      ```json
      {
        "success": true,
        "message": "Assignment accepted successfully."
      }
      ```

5. POST /assignments/:id/reject: Reject an assignment.
    - Response:
      ```json
      {
        "success": true,
        "message": "Assignment rejected successfully."
      }
      ```

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository-link>
    ```

2. Navigate to the project directory:
    ```bash
    cd assignment-submission-portal
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up the `.env` file with the following variables:
    ```plaintext
    MONGODB_URL=<Your MongoDB connection string>
    JWT_SECRET=<Your secret key for JWT>
    ```

5. Run the server:
    ```bash
    npm start
    ```

6. The server will be running on `http://localhost:5000`.

## Database Schema

- User Schema:
  ```javascript
  const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
