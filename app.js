const express = require('express')
const app = express()
const path = require('node:path')
const session = require('express-session')
const indexRoute = require('./routes/index')
require('dotenv').config()

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))
app.use(session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRoute)

const PORT = 8080
app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})