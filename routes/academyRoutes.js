const express = require('express')
const router = express.Router()
const academyController = require('../controllers/academyController')


router.get('/', academyController.academy_index_get)

router.get('/ogretmenekle',academyController.academy_teacher_add_get)
router.post('/ogretmenekle', academyController.academy_teacher_add_post)
router.get('/logout', academyController.academy_logout)




module.exports = router