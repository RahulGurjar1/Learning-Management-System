const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth.middleware');

const createCourse = async (req, res)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Access denied'});
    }
    const { title, description, instructor, price } = req.body;
    try {
        const course = new Course({
            title,
            description,
            instructor,
            price,
        })
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch(err){
        res.status(500).json({ msg: 'Course creation error', error: err.message });
    }
}

const getAllCourses = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page-1)*limit;
    try{
        const courses = await Course.find().skip(skip).limit(limit);
        const totalCourses = await Course.countDocuments();
        res.json({courses, totalCourses, currentPage: page, totalPages: Math.ceil(totalCourses/limit)});
    } catch(err) {
        return res.status(500).json({ msg: 'Failed to fetch courses', error: err.message });
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('lessons').populate('quizzes');
        console.log(course);
        if(!course){
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching course', error: err.message });
    }
};

module.exports ={createCourse,getAllCourses,getCourseById,};