const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Academy = require('./models/academy')
const Student = require('./models/student')

const teacherRoutes = require('./routes/teacherRoutes')

const app = express()
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(morgan('tiny'))


const dbURL = 'mongodb://localhost/weblearningplatform'
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => app.listen(3000))
.catch((err) => console.log(err))


app.use('/ogretmen',teacherRoutes)


app.get('/',(req,res) => {
    res.render('login')
})

app.get('/admin', (req,res) => {

})



app.get('/admin/akademikayit', (req,res) => {
    res.render('academyregister')
})

app.get('/academy/ogretmenkayit', (req,res) => {
    res.render('teacherregister')
})

app.get('/academy/ogrencikayit', (req,res) => {
    res.render('studentregister')
})
