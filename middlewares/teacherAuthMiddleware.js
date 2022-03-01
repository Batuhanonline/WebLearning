const jwt = require('jsonwebtoken')
const Teacher = require('../models/teacher')


const requireAuthTeacher = (req,res,next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime',(err,decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/ogretmengiris')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/ogretmengiris')
        next()
    }
}



const checkTeacher = (req,res,next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime', async (err,decodedToken) => {
            if (err) {
                res.locals.teacher = null
            } else {
                let teacher = await Teacher.findById(decodedToken.id)
                res.locals.teacher = teacher
                next()
            }
        })
    }else{
        res.locals.teacher = null
        next()
    }
}


module.exports = {
    requireAuthTeacher,
    checkTeacher
}