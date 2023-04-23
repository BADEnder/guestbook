const express = require('express')
const path = require('path')

const router = express.Router()
const logOutController = require('../../controllers/logOutController')

router.route('/')
    .get(logOutController.getLogOut)

module.exports = router