const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const lessonAfterVideoSchema = new Schema({
    lessonTitle: {
        type: String,
        required: true
    },
    lessonDescription: {
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true
    },
    lessonVideoURL: {
        type: String,
        required: true
    }
}, {
    collection: 'lessonAfterVideo',
    timestamps: true
})


const model = mongoose.model('LessonAfterVideo', lessonAfterVideoSchema)
module.exports = model