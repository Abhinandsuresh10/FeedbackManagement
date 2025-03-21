# Feedback Management System

## Overview

The Feedback Management System is a web application designed to manage user feedback. It allows users to register, log in, submit feedback, and view feedback. The system also includes an admin role to manage users and feedback.

## Features

- Registration User / Admin 
- Login User / Admin 
- Submit Feedback User
- View Feedback User
- Admin Management Admin

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL (for user data)
- MongoDB (for feedback data)
- React (for frontend)
- zod (for validation)
- Zustand (for state management)
- React Query (for api calls)
- Swagger (for API documentation)
- JWT (for authentication)
- vitest (for test)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abhinandsuresh10/FeedbackManagement.git
    cd FEEDBACK
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL=your_postgresql_database_url
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:
    ```bash
    npm start
    ```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It is generated using Swagger.

### Endpoints

#### User Registration

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
        "name": "JohnDoe",
        "email": "john@example.com",
        "password": "!Pass123!",
        "role": "user"
    }
    ```
- **Responses**:
    - `201`: User registered successfully
    - `400`: Validation error
    - `409`: Email already exists
    - `500`: Internal server error

#### User Login

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: User login.
- **Request Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "!Pass123!"
    }
    ```
- **Responses**:
    - `200`: Login successful
    - `400`: Missing email or password
    - `401`: Invalid credentials
    - `500`: Internal server error

#### Submit Feedback

- **URL**: `/api/feedback`
- **Method**: `POST`
- **Description**: Submit user feedback.
- **Security**: Bearer token required
- **Request Body**:
    ```json
    {
        "userId": 2,
        "message": "I love this platform! It's very user-friendly."
    }
    ```
- **Responses**:
    - `201`: Feedback submitted successfully
    - `400`: Invalid feedback input
    - `401`: Unauthorized
    - `500`: Internal server error

#### Retrieve User Feedbacks

- **URL**: `/api/getFeedbacks`
- **Method**: `GET`
- **Description**: Retrieve feedbacks submitted by the authenticated user.
- **Security**: Bearer token required
- **Responses**:
    - `200`: Successfully retrieved feedbacks
    - `401`: Unauthorized
    - `500`: Internal server error

#### Retrieve All Users with Feedback Messages

- **URL**: `/api/getUsers`
- **Method**: `GET`
- **Description**: Retrieve all users excluding those with the role of "admin" and their associated feedback messages.
- **Security**: Bearer token required
- **Responses**:
    - `200`: Successfully retrieved users with feedback messages
    - `401`: Unauthorized
    - `500`: Internal server error

- **URL**: `/api/getAnalytics`
- **Method**: `GET`
- **Description**: Retrieve the total feedback from the mongodb and return the most feeback added users name after aggregate.
- **Security**: Bearer token required
- **Responses**:
    - `200`: Successfully retrieved totalfeedback and three most feedback added users
    - `401`: Unauthorized
    - `500`: Internal server error

