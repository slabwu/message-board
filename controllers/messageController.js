const db = require('../db/queries')

const links = [
    { href: '/', text: 'Message Board' },
    { href: '/new', text: 'Send Message' }
]

async function getIndex(req, res) {
    let messages = await db.getMessages()
    console.log(messages)
    res.render('index', { links: links, messages: messages })
}

async function getNew(req, res) {
    res.render('form', { links: links })
}

async function postNew(req, res) {
    let form = req.body
    await db.postMessage(form.text, form.username, new Date())
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