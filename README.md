# Learning Management System (LMS)

## Description

This is a backend for a Learning Management System (LMS) built with Node.js, Express, and MongoDB. It provides features for user authentication, course management, and more.

## Features

- User registration (for user only, admin can be made using mongodb by changing role) and login with JWT-based authentication
- Password hashing using bcryptjs
- Course creation and management (includes multiple lessons and quizzes)
- Lesson creation and completion status tracking
- Quiz creation, attempt and score tracking
- Overall progress traking for a course for a particular user
- Role-based access control (admin, user)
- **Note-** Applied pagination on getAllCourses, getQuizzesByCourse and getLessonsByCourse limiting it to 5 items per page
- Also note that JWT token expiry is 24hrs
- **Note-** Handles different cases in progress like if the user attempts quiz twice it should not be counted twice in progress. 
- **Note-** Implemented rate limiting using the express-rate-limit and current rate is set at 100 requests per 10 minutes.
- **Note-** I have tested all the routes and features using the postman and are working fine.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Middleware:** CORS, express-rate-limit
- **Development:** Nodemon

## Deployment
- **Render access at:** https://learning-management-system-8uoe.onrender.com
- If testing api endpoints using this the user credentials can be created using regiter api endpoint and after login user its token can be used in other routes require user authentication.
- For admin authentication (credentials shared in the mail or can be obtained following the Installation step and running locally by changing user role to admin in mongodb)


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
     PORT=<your_desired_port_number>
     ```

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will start on the port you put to .env file.

2. **API Endpoints:**
   - **Authentication:**
     - `POST /auth/register`: Register a new user.
     - `POST /auth/login`: Log in an existing user.
   - **Courses:**
     - `POST /courses/post`: Create a new course (Requires Auth, Admin only).
     - `GET /courses/get`: Get all courses.
     - `GET /courses/:id`: Get a course by its ID.
   - **Lessons:**
     - `POST /lessons/add`: Add a new lesson to a course (Requires Auth, Admin only).
     - `GET /lessons/:courseId`: Get all lessons for a specific course.
   - **Quizzes:**
     - `POST /quizzes/add`: Create a new quiz for a course (Requires Auth, Admin only).
     - `GET /quizzes/course/:courseId`: Get all quizzes for a specific course.
     - `GET /quizzes/:quizId`: Get a quiz by its ID.
     - `POST /quizzes/:quizId/attempt`: Attempt a quiz (Requires Auth).
     - `GET /quizzes/:quizId/scores`: Get the scores for a quiz (Requires Auth).
   - **Progress:**
     - `POST /progress/marklessonascomplete`: Mark a lesson as completed (Requires Auth).
     - `GET /progress/:courseId`: Get the user's progress for a specific course (Requires Auth).

