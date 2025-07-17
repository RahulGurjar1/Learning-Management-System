const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app =express();
dotenv.config();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);
const courseRoutes = require('./routes/course.route');
app.use('/courses', courseRoutes);
const lessonRoutes = require('./routes/lesson.route');
app.use('/lessons', lessonRoutes);
const quizRoutes = require('./routes/quiz.route');
app.use('/quizzes', quizRoutes);
const progressRoutes = require('./routes/progress.route');
app.use('/progress', progressRoutes);

app.get('/',(req,res)=>{
    res.send("Backend Started");
})


// MongoDB connection and server starting
mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to MongoDB successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }).catch((err)=>{
        console.log("MongoDB connection error: ", err);
    }
)

