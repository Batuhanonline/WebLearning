const router = require('express').Router()
const authController = require('../controllers/authController')


router.get('/adminlogin', authController.login_get)
router.post('/adminlogin', authController.login_post)
router.get('/teacherLogin', authController.student_login_get)
router.post('/teacherLogin', authController.teacher_login_post)
router.get('/academyLogin', authController.academy_login_get)
router.post('/academyLogin', authController.academy_login_post)
router.get('/studentLogin', authController.student_login_get)
router.post('/studentLogin', authController.student_login_post)
router.get('/logout', authController.logout_get)


module.exports = router