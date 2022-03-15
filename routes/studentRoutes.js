const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')


router.get('/:id', studentController.student_index_get)

router.get('/:id/dersicerikleri', studentController.student_lessons_get)

router.get('/:id/:lesson/dersdetayi', studentController.student_lesson_detail_get)

router.get('/:id/suruklebirakliste', studentController.student_draganddroplist_get)

router.get('/:id/test', studentController.student_tests_get)

router.get('/:id/:test/test', studentController.questions_get)
router.post('/:id/:test/next', studentController.questions_next)



module.exports = router