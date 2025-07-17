1. Created a node.js project using npm init -y
2. Installed dependencies like express(for routing and middleware management), mongoose(ODM library to interact with mongodb databases), dotenv(loads environment variables from .env file to Nodejs application runtime environment) and cors(middleware for Express.js that simplifies enabling and configuring CORS).
3. Installed nodemon as Development dependency(using --save-dev).
4. Made Directories for config, models, controllers and routers(using mkdir).
5. Created files server.js and .env (using touch).

6. Created `server.js` to configure Express server, setup middleware (CORS, JSON parsing), define basic routes, and connect to MongoDB using environment variables.
7. Setup MongoDB Atlas (cloud MongoDB):
   - Go to https://www.mongodb.com/cloud/atlas and sign up or log in.
   - Create a new cluster and database.
   - Whitelist your IP address for access.
   - Create a database user and password.
   - Copy the connection string and add it to your `.env` file as `MONGODB_URI`.

8. Now installed packages for authentication like bcryptjs(for password hashing) and jsonwebtoken(for creating json web tokens to communicate securely in json format).
9. Created a `User` model in `models/User.js` using Mongoose schema to define user fields (username, email, password, firstname, lastname, role) and export it for use in authentication and user management.
10. Created authentication controller in `controllers/auth.controller.js` to handle user registration and login using bcryptjs for password hashing and jsonwebtoken for JWT token generation.
11. Implemented registration and login logic with validation, error handling, password hashing, and JWT token response for secure authentication.
12. Created Routes for registration and login
13. Tested these routes using the postman.

13. Created a `Course` model in `models/Course.js` using Mongoose schema to define course fields (Title, description, instructor name, price, quizzes, lessons) and export it.

