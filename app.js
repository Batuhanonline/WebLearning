const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Academy = require('./models/academy')
const Student = require('./models/student')
const Teacher = require('./models/teacher')

const app = express()
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(morgan('tiny'))


const dbURL = 'mongodb://localhost/weblearningplatform'
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => app.listen(3000))
.catch((err) => console.log(err))


app.get('/',(req,res) => {
    res.render('login')
})

app.get('/ogretmen', (req,res) => {   
    res.render('teacherindex')
})

app.get('/ogretmen/dersnotlari', (req,res) => {
    res.render('teacherlessonnotes')
})

app.get('/ogretmen/dersicerikleri', (req,res) => {
    res.render('teacherlessons')
})

app.get('/ogretmen/test', (req,res) => {
    res.render('teachertest')
})

app.get('/ogretmen/arsiv', (req,res) => {
    res.render('teacherarsiv')
})

app.get('/akademikayit', (req,res) => {
    res.render('academyregister')
})

app.get('/ogretmenkayit', (req,res) => {
    res.render('teacherregister')
})

app.get('/ogrencikayit', (req,res) => {
    res.render('studentregister')
})
