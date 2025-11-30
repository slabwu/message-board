const { Router } = require('express')
const newMessage = Router()

newMessage.get('/', (req, res) => res.send('New message'))

module.exports = newMessage