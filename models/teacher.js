const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
    }
}, {
    collection: 'teacher',
    timestamps:true
})

const model = mongoose.model('Teacher',teacherSchema)
module.exports = model