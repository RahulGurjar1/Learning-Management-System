const express= require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const { markLessonAsCompleted, getProgressByCourse } = require('../controllers/progress.controller');

router.post('/marklessonascomplete', authMiddleware, markLessonAsCompleted); // Mark lesson as completed
router.get('/:courseId', authMiddleware, getProgressByCourse); // Get progress   

module.exports = router;