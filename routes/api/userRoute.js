const express = require('express')
const path = require('path')

const router = express.Router()
const userController = require('../../controllers/userController')

router.route('/')
    .get(userController.getUser)
    .post(userController.postUser)
    .put(userController.putUser)

module.exports = router