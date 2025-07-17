const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');

const app =express();
dotenv.config();

const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000, // 60 minutes window
    max: 100, // Limiting to 100 requests per windowMs
    standardHeaders: true, 
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 10 minutes',
});

app.use(limiter);

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
    res.send("Backend is working, go ahead for routes based on readme file on github");
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

