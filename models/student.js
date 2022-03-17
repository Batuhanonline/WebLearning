const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const studentSchema = new Schema({
    studentLoginID: {
        type: String,
        required:true,
        unique:true
    },
    studentPassword: {
        type: String,
        required:true
    },
    studentName: {
        type: String,
        required:true
    },
    academyID: {
        type: String,
        required:true
    },
    teachers:[
        {
            teacherID:{
                type: String,
                unique: true
            }
        }
    ],
    examGrades: [
        {
            lessonID: {
                type: String,
                required: true
            },
            answerTrue: {
                type: String,
                required: true
            },
            answerFalse: {
                type: String,
                required: true
            }
        }
    ]
}, {
    collection: 'student',
    timestamps:true
})

studentSchema.statics.login = async function(studentLoginID, studentPassword){
    const student = await this.findOne({studentLoginID})
    if (student) {
        const auth = await bcrypt.compare(studentPassword, student.studentPassword)
        if (auth) {
            return student  
        } else {
            throw Error('Parola hatalı')
        }
    } else {
        throw Error('Giriş ID hatalı')
    }
}

studentSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.studentPassword = await bcrypt.hash(this.studentPassword, salt)
})

const model = mongoose.model('Student',studentSchema)
module.exports = model