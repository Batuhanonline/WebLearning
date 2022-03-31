const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { marked }= require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)

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
            sanitizedHtml: {
                type: String
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

