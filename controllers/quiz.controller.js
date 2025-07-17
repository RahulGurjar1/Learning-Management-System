const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Course = require('../models/Course');

const createQuiz = async(req,res)=>{
    if(req.user.role !=="admin"){
        return res.status(403).json({message: 'Access denied'});
    }
    const {courseId, title, questions}= req.body;
    try{
        const quiz= new Quiz({
            courseId,
            title,
            questions
        });
        await quiz.save();
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message: 'Course not found'});
        }
        course.quizzes.push(quiz._id);
        await course.save();
        res.status(201).json({message: 'Quiz created successfully', quiz});
    } catch(err){
        return res.status(500).json({msg: 'Quiz creation error', error: err.message});
    }
}

const getQuizzesByCourse = async(req, res) => {
    const courseId = req.params.courseId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const quizzes = await Quiz.find({ courseId })
            .skip((page - 1) * limit)
            .limit(limit);
        if(quizzes.length === 0) {
            return res.status(404).json({ message: 'No quizzes found for this course' });
        }
        const totalQuizzes = await Quiz.countDocuments({ courseId });
        res.json({
            quizzes,
            totalPages: Math.ceil(totalQuizzes / limit),
            currentPage: page,
            totalQuizzes: totalQuizzes
        });
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching quizzes', error: err.message });
    }
}

const getQuizById = async(req, res) => {
    const quizId = req.params.quizId;
    try {
        const quiz = await Quiz.findById(quizId);
        if(!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching quiz', error: err.message });
    }
}

const attemptQuiz = async(req, res) => {
    const quizId = req.params.quizId;
    const { answers } = req.body;
    // console.log('Attempting quiz with ID:', quizId, 'and answers:', answers);
    try {
        const user = req.user.id;
        // console.log('Authenticated user:', req.user);
        // console.log('User attempting quiz:', user);
        const quiz = await Quiz.findById(quizId);
        if(!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        let score =0;
        quiz.questions.forEach((question, index) => {
            if(question.correctIndex === answers[index]) {
                score++;
            }
        });
        const attempt = new QuizAttempt({
            userId: user,
            courseId: quiz.courseId,
            quizId: quizId,
            score,
            attemptedAt: new Date()
        });
        await attempt.save();
        res.status(201).json({ message: 'Quiz attempted successfully', score });
    } catch (err) {
        res.status(500).json({ msg: 'Error attempting quiz', error: err.message });
    }
}

const getQuizScores = async(req, res) => {
    const quizId = req.params.quizId;
    const userId = req.user.id;
    try {
        const attempts = await QuizAttempt.find({ quizId, userId });
        if(attempts.length === 0) {
            return res.status(404).json({ message: 'No attempts found for this quiz' });
        }
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching quiz attempts', error: err.message });
    }
}

module.exports = {createQuiz, getQuizzesByCourse, getQuizById, attemptQuiz, getQuizScores};