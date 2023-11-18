const express = require('express')
const router = express.Router()

const {addChat, getChats} = require('../controller/chatController')

router.post('/addChat', addChat)
router.get('/getChat', getChats)

module.exports = router;