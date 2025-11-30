const express = require('express')
const app = express()
const path = require('node:path')
const indexRoute = require('./routes/index')
const newMessageRoute = require('./routes/new')

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRoute)
app.use('/new', newMessageRoute)

const PORT = 8080
app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})