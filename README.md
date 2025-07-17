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
   - `POST /api/auth/register`: Register a new user.
   - `POST /api/auth/login`: Log in an existing user.
   - (Add more endpoints as you create them)

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
