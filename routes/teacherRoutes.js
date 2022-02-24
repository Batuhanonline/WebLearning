const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacherController')


router.get('/', teacherController.teacher_index )
router.get('/dersnotlari', teacherController.teacher_lesson_note)
router.get('/dersicerikleri', teacherController.teacher_lesson_contents)
router.get('/test', teacherController.teacher_test)
router.get('/arsiv', teacherController.teacher_archive)
router.get('/logout', teacherController.teacher_logout)


module.exports = router