const mongoose = require('mongoose')
const Schema = mongoose.Schema


const lessonAfterTestSchema = new Schema({
    testTitle: {
        type: String,
        required: true
    },
    testDescription: {
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ],
            answer: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    collection: 'lessonAfterTest',
    timestamps: true
})




const model = mongoose.model('LessonAfterTest', lessonAfterTestSchema)
module.exports = model

