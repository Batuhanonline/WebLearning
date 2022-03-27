const express = require('express')
const router = express.Router()
const academyController = require('../controllers/academyController')


router.get('/:id/', academyController.academy_index_get)

//---------------------Teacher URL-------------------------
router.get('/:id/ogretmenler', academyController.academy_teachers_get)
router.get('/:id/ogretmenekle',academyController.academy_teacher_add_get)
router.post('/:id/ogretmenekle', academyController.academy_teacher_add_post)

//---------------------Student URL-------------------------
router.get('/:id/ogrenciler', academyController.academy_students_get)

router.get('/:id/ogrenciekle', academyController.academy_student_add_get)
router.post('/:id/ogrenciekle', academyController.academy_student_add_post)

router.get('/:id/ogrencibilgi/:student', academyController.academy_student_info_get)
router.post('/:id/ogrencibilgi/:student', academyController.academy_student_info_post)






module.exports = router