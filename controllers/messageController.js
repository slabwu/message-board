const db = require('../db/queries')

const links = [
    { href: '/', text: 'Message Board' },
    { href: '/new', text: 'Send Message' }
]

function getColor(name) {
    function hash(string) {
        let hash = 0
        for (let i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i)
        }
        return hash
    }

    let colors = ['blueviolet', 'brown', 'blue', 'crimson', 'darkgoldenred', 'darkgreen', 'darkmagenta', 'darkorange', 'deeppink', 'lightseagreen', 'navy', 'orangered', 'orange', 'red', 'teal', 'yellowgreen', 'seagreen', 'slateblue']

    return colors[hash(name) % colors.length]
}

async function getIndex(req, res) {
    let messagesArray = await db.getMessages()
    // req.session.destroy()

    function hash(string) {
        let hash = 0
        for (let i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i)
        }
        return hash
    }

    let messages = messagesArray.map(message => ({
        ...message,
        color: getColor(message.username)
    }))

    console.log(messages)

    res.render('index', { links: links, messages: messages, username: req.session.username || '', usernameColor: getColor(req.session.username || 'A') })
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