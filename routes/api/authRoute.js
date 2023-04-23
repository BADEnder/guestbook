const express = require('express')
const authController = require('../../controllers/authController')

const router = express.Router()

router.route('/')
    .post(authController.postAuth)

module.exports = router