const express = require('express')
const path = require('path')

const router = express.Router()

const replyContnetController = require('../../controllers/replyContentController')

router.route('/')
    .get(replyContnetController.getReplyContent)
    .post(replyContnetController.postReplyContent)



module.exports = router