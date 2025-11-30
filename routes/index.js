const { Router } = require('express')
const index = Router()

index.get('/', (req, res) => res.send('Index'))

module.exports = index