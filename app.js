const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const teacherRoutes = require('./routes/teacherRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const academyRoutes = require('./routes/academyRoutes')
const {requireAuthAdmin, checkAdmin} = require('./middlewares/adminAuthMiddleware')
const { requireAuthAcademy, checkAcademy } = require('./middlewares/academyAuthMiddleware')

const app = express()
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(morgan('tiny'))
app.use(cookieParser())


const dbURL = 'mongodb://localhost/weblearningplatform'
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => app.listen(3000))
.catch((err) => console.log(err))


app.use('/',authRoutes)
app.use('/akademi', requireAuthAcademy, checkAcademy, academyRoutes)
app.use('/ogretmen',teacherRoutes)
app.use('/admin', requireAuthAdmin, checkAdmin, adminRoutes)



app.get('/akademi/ogretmenkayit', (req,res) => {
    res.render('teacherregister')
})

app.get('/akademi/ogrencikayit', (req,res) => {
    res.render('studentregister')
})
