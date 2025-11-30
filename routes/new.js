const { Router } = require('express')
const newMessage = Router()

newMessage.get('/', (req, res) => res.render('form'))
newMessage.post('/', (req, res) => {
    console.log(req.body)
    res.render('form')
})

module.exports = newMessage