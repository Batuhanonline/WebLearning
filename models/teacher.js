const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const teacherSchema = new Schema({
    teacherLoginID: {
        type:String,
        required:true,
        unique:true
    },
    teacherPassword: { 
        type:String,
        required:true
    },
    teacherName: {
        type:String,
        required:true
    },
    academyID: {
        type:String,
        required:true
    },
    lesson:[
        {
            lessonID: String
        }
    ]
}, {
    collection: 'teacher',
    timestamps:true
})

teacherSchema.statics.login = async function(teacherLoginID, teacherPassword){
    const teacher = await this.findOne({teacherLoginID})
    if (teacher) {
        const auth = await bcrypt.compare(teacherPassword,teacher.teacherPassword)
        if (auth) {
            return teacher
        }else{
            throw Error('Parola hatalı')
        }
    }else{
        throw Error('Teacher Giriş ID hatalı')
    }
}

teacherSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.teacherPassword = await bcrypt.hash(this.teacherPassword,salt)
})



const model = mongoose.model('Teacher',teacherSchema)
module.exports = model