const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/',adminController.admin_login_get)
router.post('/',adminController.admin_login_post)
router.get('/aregister', adminController.admin_register)
router.post('/aregister', adminController.admin_register_post)
router.get('/panel', adminController.admin_panel_get)


module.exports = router