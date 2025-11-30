const { Router } = require('express')
const index = Router()

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date()
    }
]

index.get('/', (req, res) => res.render('index', { messages: messages }))
index.get('/new', (req, res) => res.render('form'))
index.post('/new', (req, res) => {
    console.log(req.body)
    res.render('form')
})

module.exports = index