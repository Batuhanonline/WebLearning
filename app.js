const express = require('express')
const morgan = require('morgan')

const app = express()
app.set('view engine','ejs')

app.listen(3000)
app.use(express.static('public'))
app.use(morgan('tiny'))

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
    res.render('academyregister',{layout: 'register'})
})

app.get('/ogretmenkayit', (req,res) => {
    res.render('teacherregister',{layout: 'register'})
})

app.get('/ogrencikayit', (req,res) => {
    res.render('studentregister',{layout: 'register'})
})
