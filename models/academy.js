const mongoose = require('mongoose')
const Schema = mongoose.Schema

const academySchema = new Schema({
    academyLoginID: {
        type:String,
        required:true,
        unique:true
    },
    academyPassword: {
        type:String,
        required:true
    },
    academyName: {
        type:String,
        required:true
    }
}, {
    collection: 'academy',
    timestamps:true
})

const model = mongoose.model('Academy',academySchema)
module.exports = model