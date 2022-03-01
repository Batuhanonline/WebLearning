const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    lessonTitle: {
        type:String,
        required:true
    },
    lessonDescription: {
        type:String,
        required:true
    },
    lessonSubject: {
        type:String,
        required:true
    },
    lessonTeacher:{
        type:Object,
        required:true
    },
    lessonContent:[
        {
            order: {
                type:String
            },
            paragraph: {
                type:String
            },
            song: {
                type:String
            }
        }
    ]
}, {
    collection: 'lessons',
    timestamps:true
})


const model = mongoose.model('Lessons', lessonSchema)
module.exports = model