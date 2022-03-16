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
    ]
}, {
    collection: 'lessonAfterGame',
    timestamps: true
})


const model = mongoose.model('LessonAfterGame', lessonAfterGameSchema)
module.exports = model