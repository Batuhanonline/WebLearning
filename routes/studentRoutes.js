const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')


router.get('/:id', studentController.student_index_get)



module.exports = router