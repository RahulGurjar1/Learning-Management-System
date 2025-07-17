# Learning Management System (LMS)

## Description

This is a backend for a Learning Management System (LMS) built with Node.js, Express, and MongoDB. It provides features for user authentication, course management, and more.

## Features

- User registration and login with JWT-based authentication
- Password hashing using bcryptjs
- Course creation and management
- Role-based access control (e.g., admin, instructor, student)

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Middleware:** CORS
- **Development:** Nodemon

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/learning-management-system.git
   cd learning-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```
   - You can get your `MONGODB_URI` from MongoDB Atlas.

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will start on the port specified in your configuration (default is 3000).

2. **API Endpoints:**
   - **Authentication:**
     - `POST /api/auth/register`: Register a new user.
     - `POST /api/auth/login`: Log in an existing user.
   - **Courses:**
     - `POST /api/courses/post`: Create a new course (Requires Auth, Admin only).
     - `GET /api/courses/get`: Get all courses.
     - `GET /api/courses/:id`: Get a course by its ID.
   - **Lessons:**
     - `POST /api/lessons/add`: Add a new lesson to a course (Requires Auth, Admin only).
     - `GET /api/lessons/:courseId`: Get all lessons for a specific course.
   - **Quizzes:**
     - `POST /api/quizzes/add`: Create a new quiz for a course (Requires Auth, Admin only).
     - `GET /api/quizzes/course/:courseId`: Get all quizzes for a specific course.
     - `GET /api/quizzes/:quizId`: Get a quiz by its ID.
     - `POST /api/quizzes/:quizId/attempt`: Attempt a quiz (Requires Auth).
     - `GET /api/quizzes/:quizId/scores`: Get the scores for a quiz (Requires Auth).
   - **Progress:**
     - `POST /api/progress/marklessonascomplete`: Mark a lesson as completed (Requires Auth).
     - `GET /api/progress/:courseId`: Get the user's progress for a specific course (Requires Auth).

## Project Structure

```
.
├── controllers
│   └── auth.controller.js
├── middleware
├── models
│   ├── Course.js
│   └── User.js
├── node_modules
├── package-lock.json
├── package.json
├── README.md
├── routes
└── server.js
```
