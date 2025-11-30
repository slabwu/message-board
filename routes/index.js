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
    let form = req.body
    messages.push({ text: form.text, user: form.user, added: new Date() })
    res.redirect('/')
})

module.exports = index