const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')


router.get('/:id', studentController.student_index_get)

router.get('/:id/dersicerikleri', studentController.student_lessons_get)

router.get('/:id/:lessonid/suruklebirakliste', studentController.student_draganddroplist_get)

module.exports = router