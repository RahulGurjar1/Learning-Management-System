const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    title:{
        type: String,
        required: true,
    },
    videourl:{
        type: String,
        required: true,
    },
    resources:[{
        type: String,
    }]
});

module.exports = mongoose.model('Lesson', lessonSchema);