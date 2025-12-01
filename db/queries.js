const pool = require('./pool')

async function getMessages() {
    const { rows } = await pool.query('SELECT * FROM messages')
    return rows
}

async function getMessage(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id])
    return rows
}

async function postMessage(text, username) {
    await pool.query('INSERT INTO messages (text, username, added) VALUES ($1,$2,NOW())', [text, username])
}

module.exports = {
    getMessages,
    getMessage,
    postMessage
}
