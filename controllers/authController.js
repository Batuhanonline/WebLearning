
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24
const createToken = (id) => {
    return jwt.sign({id}, 'jwtgizlikelime', {expiresIn: maxAge})
}

const login_get = (req, res) => {
    res.render('adminlogin')
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
const teacher_login_get = (req, res) => {}
const teacher_login_post = (req, res) => {}
const academy_login_get = (req, res) => {}
const academy_login_post = (req, res) => {}
const student_login_get = (req, res) => {}
const student_login_post = (req, res) => {}
const logout_get = (req, res) => {}


module.exports = {
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