const jwt = require('jsonwebtoken')


const requireAuthAdmin = (req, res, next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime',(err,decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/adminlogin')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/adminlogin')
        next()
    }
}


module.exports = {
    requireAuthAdmin
}