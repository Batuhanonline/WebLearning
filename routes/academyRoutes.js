const express = require('express')
const router = express.Router()
const academyController = require('../controllers/academyController')


router.get('/', academyController.academy_index_get)
router.get('/ogretmenekle',academyController.academy_teacher_add_get)
router.post('/ogretmenekle', academyController.academy_teacher_add_post)
router.get('/ogrenciekle', academyController.academy_student_add_get)
router.post('/ogrenciekle', academyController.academy_student_add_post)
router.get('/ogrencibilgi/:student', academyController.academy_student_info_get)
router.post('/ogrencibilgi/:student', academyController.academy_student_info_post)
router.get('/ogretmenler', academyController.academy_teachers_get)
router.get('/ogrenciler', academyController.academy_students_get)




module.exports = router