const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/',adminController.admin_panel_get)
router.get('/aregister', adminController.admin_register)
router.post('/aregister', adminController.admin_register_post)
router.get('/logout',adminController.admin_logout_get)


module.exports = router