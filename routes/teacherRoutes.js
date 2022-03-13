const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacherController')


router.get('/:id/', teacherController.teacher_index )

router.get('/:id/dersnotlari', teacherController.teacher_lesson_note)

router.get('/:id/dersicerikleri', teacherController.teacher_lesson_contents_get)
router.post('/:id/dersicerikleri', teacherController.teacher_lesson_contents_post)

router.get('/:id/yenidersicerigi', teacherController.new_lesson_content)
router.post('/:id/yenidersicerigi', teacherController.new_lesson_content_post)

router.get('/:teacher/:lesson/icerikekle', teacherController.lesson_content_get)
router.post('/:teacher/:lesson/icerikekle', teacherController.lesson_content_post)

router.get ('/:teacher/:lesson/ders', teacherController.lesson_detail_get)

router.get('/:teacher/:lesson/duzenle', teacherController.lesson_detail_edit_get)
router.post('/:teacher/:lesson/duzenle', teacherController.lesson_detail_edit_post)

router.get('/:id/test', teacherController.teacher_test)

router.get('/:id/arsiv', teacherController.teacher_archive)

router.get('/:id/logout', teacherController.teacher_logout)


module.exports = router