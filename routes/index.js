const { Router } = require('express')
const index = Router()

const links = [
    { href: '/', text: 'Message Board' },
    { href: '/new', text: 'Send Message' }
]

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
        {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
        {
        text: 'Hi there',
        user: 'Amando',
        added: new Date()
    },
        {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
        {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
        {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
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

index.get('/', (req, res) => res.render('index', { links: links, messages: messages }))
index.get('/new', (req, res) => res.render('form', { links: links }))
index.post('/new', (req, res) => {
    let form = req.body
    messages.push({ text: form.text, user: form.user, added: new Date() })
    res.redirect('/')
})
index.get('/message/:messageId', (req, res) => {
    res.render('message', { links: links, message: messages[req.params.messageId]})
})

module.exports = index