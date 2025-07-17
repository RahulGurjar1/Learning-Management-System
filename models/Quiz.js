const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [{
        text: { 
            type: String, 
            required: true 
        },
        options: [{
            type:String,
            required: true
        }],
        correctIndex: { 
            type: Number, 
            required: true 
        }
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);
