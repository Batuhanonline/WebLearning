const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    studentLoginID: {
        type:String,
        required:true,
        unique:true
    },
    studentPassword: {
        type:String,
        required:true
    },
    studentName: {
        type:String,
        required:true
    },
    academyID: {
        type:String,
        required:true
    },
    teacherID: {
        type:String,
        required:true
    }
}, {
    collection: 'student',
    timestamps:true
})

const model = mongoose.model('Student',studentSchema)
module.exports = model