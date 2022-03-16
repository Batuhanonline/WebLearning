const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacherController')
const { route } = require('./studentRoutes')


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

router.get('/:id/test', teacherController.teacher_test_get)
router.post('/:id/test', teacherController.teacher_test_post)

router.get('/:id/yenitest', teacherController.teacher_newtest_add_get)
router.post('/:id/yenitest', teacherController.teacher_newtest_add_post)
router.get('/:id/:testid/soruekle', teacherController.teacher_test_add_get)
router.post('/:id/:testid/soruekle', teacherController.teacher_test_add_post)

router.get('/:id/video', teacherController.teacher_videos_get)
router.post('/:id/video', teacherController.teacher_videos_post)
router.get('/:id/videoekle', teacherController.teacher_videos_add_get)
router.post('/:id/videoekle', teacherController.teacher_videos_add_post)

router.get('/:id/oyunlar', teacherController.teacher_games_get)
router.post('/:id/oyunlar', teacherController.teacher_games_post)
router.get('/:id/oyunekle', teacherController.teacher_newgame_get)
router.post('/:id/oyunekle', teacherController.teacher_newgame_post)

router.get('/:id/arsiv', teacherController.teacher_archive)

router.get('/:id/logout', teacherController.teacher_logout)


module.exports = router