const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

academySchema.statics.login = async function(academyLoginID, academyPassword){
    const academy = await this.findOne({academyLoginID})
    if (academy) {
        const auth = await bcrypt.compare(academyPassword,academy.academyPassword)
        if (auth) {
            return academy
        }else{
            throw Error('Parola hatalı')
        }
    }else{
        throw Error('Akademi ID hatalı')
    }
}

academySchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.academyPassword = await bcrypt.hash(this.academyPassword, salt)
})

const model = mongoose.model('Academy',academySchema)
module.exports = model