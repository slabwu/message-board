const db = require('../db/queries')

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
        text: 'Hello World!',
        user: 'Charles',
        added: new Date()
    }
]

async function getIndex(req, res) {
    res.render('index', { links: links, messages: messages })
}

async function getNew(req, res) {
    res.render('form', { links: links })
}

async function postNew(req, res) {
    let form = req.body
    messages.push({ text: form.text, user: form.user, added: new Date() })
    res.redirect('/')
}

async function getMessageId(req, res) {
    res.render('message', { links: links, message: messages[req.params.messageId]})
}

module.exports = {
    getIndex,
    getNew,
    postNew,
    getMessageId
}