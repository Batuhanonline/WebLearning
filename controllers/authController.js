
const Admin = require('../models/admin')
const Academy = require('../models/academy')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')

const jwtSecretKey = require('../config/jwt')

const maxAge = 60*60*24
const createToken = (id) => {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: maxAge})
}

const index_get = (req,res) => {
    res.render('login/login',{title: 'Anasayfa'})
}

const index_post = async (req,res) => {}

const login_get = (req, res) => {
    res.render('login/adminlogin',{title: 'Admin Girişi'})
}

const login_post = async (req, res) => {
    const { adminID, adminPassword } = req.body
    try {
        const admin = await Admin.login(adminID,adminPassword)
        const token = createToken(admin._id)
        res.cookie('token', token, {httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
    }
}


const academy_login_get = (req, res) => {
    res.render('login/academylogin',{title: 'Akademi-Giriş'})
}


const academy_login_post = async (req, res) => {
    const { academyLoginID, academyPassword } = req.body
    try{
        const academy = await Academy.login(academyLoginID,academyPassword)
        const token = createToken(academy._id)
        res.cookie('token', token, {httpOnly: true, maxAge: maxAge * 1000 })
        const url = '/akademi/'+academy._id
        res.redirect(url)
    }catch(err){
        console.log(err)
    }
}


const teacher_login_get = (req, res) => {
    res.render('login/teacherlogin', {title: 'Öğretmen-Giriş'})
}

const teacher_login_post = async (req, res) => {
    const { teacherLoginID, teacherPassword } = req.body
    try {
        const teacher = await Teacher.login(teacherLoginID, teacherPassword)
        const token = createToken(teacher._id)
        res.cookie('token', token, {httpOnly: true, maxAge: maxAge * 1000 })
        const url = '/ogretmen/'+teacher._id
        res.redirect(url)
    } catch (err) {
        console.log(err)
    }
}


const student_login_get = (req, res) => {
    res.render('login/studentlogin', {title: 'Öğrenci-Giriş'})
}

const student_login_post = async (req, res) => {
    const { studentLoginID, studentPassword } = req.body
    try {
        const student = await Student.login(studentLoginID, studentPassword)
        const token = createToken(student._id)
        res.cookie('token', token, {httpOnly: true, maxAge: maxAge * 1000 })
        const studentUrl = '/ogrenci/'+student._id
        res.redirect(studentUrl)
    } catch (err) {
        console.log(err)
    }
}
const logout_get = (req, res) => {
    res.cookie('token', '', {maxAge:1})
    res.redirect('/')
}


module.exports = {
    index_get,
    index_post,
    login_get,
    login_post,
    teacher_login_get,
    teacher_login_post,
    academy_login_get,
    academy_login_post,
    student_login_get,
    student_login_post,
    logout_get
}