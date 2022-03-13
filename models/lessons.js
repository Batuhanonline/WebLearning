const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { marked }= require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)


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
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
}, {
    collection: 'lessons',
    timestamps:true
})


lessonSchema.pre('validate', function(next) {

    if (this.lessonTitle) {
        this.slug = slugify(this.lessonTitle, { lower: true, strict: true })
    }

    if (this.lessonSubject) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.lessonSubject))
    }

    next()

})




const model = mongoose.model('Lessons', lessonSchema)
module.exports = model