const express = require('express')
const app = express()
const path = require('node:path')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const pg = require('pg')
const indexRoute = require('./routes/index')
require('dotenv').config()

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session',
  }),
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRoute)

const PORT = 8080
app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
})