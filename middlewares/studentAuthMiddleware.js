const jwt = require('jsonwebtoken')
const Student = require('../models/student')

const requireAuthStudent = (req, res, next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData, 'jwtgizlikelime', (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/ogrencigiris')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/ogrencigiris')
        next()
    }
}


const checkStudent = (req, res, next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData, 'jwtgizlikelime', async (err, decodedToken) => {
            if (err) {
                res.locals.student = null
            } else {
                let student = await Student.findById(decodedToken.id)
                res.locals.student = student
                next()
            }
        })
    } else {
        res.locals.student = null
        next()
    }
}



module.exports = {
    requireAuthStudent,
    checkStudent
}