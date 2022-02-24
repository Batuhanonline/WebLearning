const Academy =  require('../models/academy')
const Teacher = require('../models/teacher')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const academy_index_get = (req,res) => {
    Teacher.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('academyindex',{title: 'Akademi-Anasayfa', teachers: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const academy_teacher_add_get = (req,res) => {
    res.render('teacheradd',{title: 'Akademi-Öğretmen Ekle'})
}

const academy_teacher_add_post = (req,res) => {
    const teacher = new Teacher(req.body)
    teacher.save()
        .then((result) => {
            res.redirect('/akademi')
        }).catch((err) => {
            console.log(err)
        })
}

const academy_logout = (req,res) => {
    res.cookie('token', '', {maxAge:1})
    res.redirect('/')
}

module.exports = {
    academy_index_get,
    academy_logout,
    academy_teacher_add_get,
    academy_teacher_add_post
}