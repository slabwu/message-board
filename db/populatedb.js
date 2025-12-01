#! /usr/bin/env node
require('dotenv').config()
const { Client } = require('pg')
const { argv } = require('node:process')

const url = argv[2] || process.env.DATABASE_URL
const archive = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const SQL = `
DROP TABLE messages;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 30 ),
  added TIMESTAMP DEFAULT NOW()
);

TRUNCATE TABLE messages RESTART IDENTITY;

INSERT INTO messages (text, username) 
VALUES
  ('Hello World!', 'Charles'),
  ('Hi there!', 'Amando'),
  ('Nice', 'Mr Meow');
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: url,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()