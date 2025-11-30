const express = require('express')
const app = express()
const path = require('node:path')
const PORT = 8080

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const users = ['Rose', 'Cake', 'Biff']

app.get('/', (req, res) => {
    res.render('index', { test: 'Hello!' })
})

app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})