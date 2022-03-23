const mongoose = require('mongoose')
const Schema = mongoose.Schema


const lessonAfterGameSchema = new Schema({
    gameTitle: {
        type: String,
        required: true
    },
    gameDescription: {
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true
    },
    gameContent: [
        {
            type: String
        }
    ],
    scores: [
        {
            studentID: {
                type: String,
                required: true
            },
            check: {
                type: Number,
                required: true
            },
            minute: {
                type: Number,
                required: true
            },
            second: {
                type: Number,
                required: true
            },
        }
    ]
}, {
    collection: 'lessonAfterGame',
    timestamps: true
})


const model = mongoose.model('LessonAfterGame', lessonAfterGameSchema)
module.exports = model