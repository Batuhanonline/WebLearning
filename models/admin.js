const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    adminID: { 
        type:String,
        required:true,
        unique:true
    },
    adminPassword: {
        type:String,
        required:true
    }
},{
    collection: 'admin'
})

adminSchema.statics.login = async function(adminID, adminPassword){
    const admin = await this.findOne({adminID})
    if (admin) {
        const auth = await bcrypt.compare(adminPassword,admin.adminPassword)
        if (auth) {
            return admin
        }else{
            throw Error('Parola hatalı')
        }
    }else{
        throw Error('Admin ID hatalı')
    }
}

adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.adminPassword = await bcrypt.hash(this.adminPassword,salt)
    next()
})

const model = mongoose.model('Student',adminSchema)
module.exports = model