const jwt = require('jsonwebtoken')
const Academy = require('../models/academy')


const requireAuthAcademy = (req,res,next) => {
    const tokenData = req.cookies.token

    if(tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime',(err,decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('akademigiris')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/akademigiris')
        next()
    }
}


const checkAcademy = (req,res,next) => {
    const tokenData = req.cookies.token

    if(tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime', async (err,decodedToken) => {
            if (err) {
                res.locals.academy = null
            }else{
                let academy = await Academy.findById(decodedToken.id)
                res.locals.academy = academy
                next()
            }
        })
    }else{
        res.locals.academy = null
        next()
    }
    
}


module.exports = {
    requireAuthAcademy,
    checkAcademy
}