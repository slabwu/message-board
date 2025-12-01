const { Router } = require('express')
const messageController = require('../controllers/messageController')
const index = Router()

index.get('/', messageController.getIndex)
index.get('/new', messageController.getNew)
index.post('/new', messageController.postNew)
index.get('/message/:messageId', messageController.getMessageId)

module.exports = index