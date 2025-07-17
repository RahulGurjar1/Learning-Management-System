const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

const createLesson = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { courseId, title, videourl, resources } = req.body;

    try{
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ message: 'Course not found' });
        }
        const lesson = new Lesson({courseId, title, videourl, resources});
        await lesson.save();

        course.lessons.push(lesson._id);
        await course.save();
        res.status(201).json({ message: 'Lesson created successfully', lesson });


    } catch(err) {
        return res.status(500).json({ msg: 'Lesson creation error', error: err.message });
    }
};

const getLessonsByCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const lessons = await Lesson.find({ courseId });
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching lessons', error: err.message });
    }
};

module.exports = {createLesson,getLessonsByCourse};
