const db = require('../db/queries')

const links = [
    { href: '/', text: 'Message Board' },
    { href: '/new', text: 'Send Message' }
]

async function getIndex(req, res) {
    let messages = await db.getMessages()
    // req.session.destroy()
    res.render('index', { links: links, messages: messages, username: req.session.username || '' })
}

async function getNew(req, res) {
    res.render('form', { links: links })
}

async function postNew(req, res) {
    await db.postMessage(req.body.text, req.session.username || 'Anonymous')
    res.redirect('/')
}

async function getMessageId(req, res) {
    res.render('message', { links: links, message: messages[req.params.messageId]})
}

async function postUser(req, res) {
    req.session.username = req.body.username
    res.redirect('/')
}

module.exports = {
    getIndex,
    getNew,
    postNew,
    getMessageId,
    postUser
}