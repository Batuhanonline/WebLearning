const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24
const createToken = (id) => {
    return jwt.sign({id}, 'jwtgizlikelime', {expiresIn: maxAge})
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

const admin_logout_get = (req, res) => {
    res.cookie('token', '', {maxAge:1})
    res.redirect('/adminlogin')
}

module.exports = {
    admin_register,
    admin_register_post,
    admin_panel_get,
    admin_logout_get
}