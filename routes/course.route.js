const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { createCourse, getAllCourses, getCourseById } = require('../controllers/course.controller');

router.post('/post', authMiddleware, createCourse);
router.get('/get', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;