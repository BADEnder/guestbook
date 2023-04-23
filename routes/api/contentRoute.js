const express = require('express')
const path = require('path')

const router = express.Router()

const contentController = require('../../controllers/contentController')

router.route('/')
    .get(contentController.getContent)
    .post(contentController.postContent)

module.exports = router