const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    instructor:{
        type: String,
    },
    price:{
        type: Number,
    },
    lessons:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    }],
    quizzes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    }],

});

module.exports = mongoose.model('Course', courseSchema);