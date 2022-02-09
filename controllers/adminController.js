const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24
const createToken = (id) => {
    return jwt.sign({id}, 'jwtgizlikelime', {expiresIn: maxAge})
}

const admin_login_get = (req, res) => {
    res.render('adminlogin')
}

const admin_login_post = async (req, res) => {
    const { adminID, adminPassword } = req.body
    try {
        const admin = await Admin.login(adminID,adminPassword)
        const token = createToken(admin._id)
        res.cookie('token', token, {httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/admin/panel')
    } catch (err) {
        console.log(err)
    }
}

const admin_register = (req, res) => {
    res.render('adminregister')
}

const admin_register_post = (req, res) => {
    const admin = new Admin(req.body)
    admin.save()
        .then((result)=> {
            res.redirect('/admin')
        })
        .catch((err) => {
            console.log(err)
        })
}

const admin_panel_get = (req, res) => {
    res.render('adminpanel')
}


module.exports = {
    admin_login_get,
    admin_register,
    admin_register_post,
    admin_login_post,
    admin_panel_get
}