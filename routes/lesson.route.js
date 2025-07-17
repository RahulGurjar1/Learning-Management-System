const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {createLesson,getLessonsByCourse} = require('../controllers/lesson.controller');

router.post('/add', authMiddleware, createLesson); //Admin only
router.get('/:courseId', getLessonsByCourse);

module.exports = router;
