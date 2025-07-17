const Progress = require('../models/Progress');
const Course = require('../models/Course');
const QuizAttempt = require('../models/QuizAttempt');

const markLessonAsCompleted = async (req, res) => {
    const { courseId, lessonId } = req.body;
    const userId = req.user.id;

    try{
        let progress = await Progress.findOne({ userId, courseId });
        if(!progress) {
            progress = new Progress({ userId, courseId, completedLessons: [] });
        }
        if(!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            await progress.save();
        }
        res.status(200).json({ message: 'Lesson marked as completed', progress });
    } catch(err) {
        return res.status(500).json({ msg: 'Error marking lesson as completed', error: err.message });
    }
}

const getProgressByCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;
    console.log('Fetching progress for user:', userId, 'and course:', courseId);
    try {
        const completedLessons = await Progress.find({ userId, courseId }).populate('completedLessons');
        // console.log('Completed lessons:', completedLessons);
        const attemptedQuizzes = await QuizAttempt.find({ userId,courseId});
        console.log('Attempted quizzes:', attemptedQuizzes);
        const attemptedUniqueQuizzes = [...new Set(attemptedQuizzes.map(attempt => attempt.quizId.toString()))];
        console.log('Attempted Unique quizzes:', attemptedUniqueQuizzes);
        const totalQuizzes = await Course.findById(courseId).populate('quizzes');
        // console.log('Total quizzes:', totalQuizzes);
        const totalLessons = await Course.findById(courseId).populate('lessons');
        // console.log('Total lessons:', totalLessons);
        // console.log("Total quizzes count:", totalQuizzes.quizzes.length);
        // console.log("Total lessons count:", totalLessons.lessons.length);
        // console.log("Attempted quizzes count:", attemptedQuizzes.length);
        // console.log("Completed lessons count:", completedLessons.length);
        const percentageProgess = (totalQuizzes.quizzes.length+totalLessons.lessons.length) > 0 ? ((attemptedUniqueQuizzes.length+completedLessons.length) / (totalQuizzes.quizzes.length+totalLessons.lessons.length)) * 100 : 0;
        // console.log('Percentage progress:', percentageProgess);

        if(percentageProgess==0) {
            return res.status(404).json({ message: 'No progress found for this course. 0% progress' });
        }
        res.json({
            completedLessons: completedLessons.length,
            attemptedUniqueQuizzes: attemptedUniqueQuizzes.length,
            totalQuizzes: totalQuizzes.quizzes.length,
            totalLessons: totalLessons.lessons.length,
            percentageProgress: percentageProgess.toFixed(2) + '%'
        });
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching progress', error: err.message });
    }
}

module.exports = {markLessonAsCompleted, getProgressByCourse};