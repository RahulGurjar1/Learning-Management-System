const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzesByCourse, getQuizById, attemptQuiz, getQuizScores } = require('../controllers/quiz.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.post('/add', authMiddleware, createQuiz); // Admin only
router.get('/course/:courseId', getQuizzesByCourse); // Get quizzes by course
router.get('/:quizId', getQuizById); // Get quiz by ID
router.post('/:quizId/attempt', authMiddleware, attemptQuiz); // Attempt a quiz
router.get('/:quizId/scores', authMiddleware, getQuizScores); // Get quiz scores

module.exports = router;

