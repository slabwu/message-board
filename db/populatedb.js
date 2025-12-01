#! /usr/bin/env node
require('dotenv').config()
const { Client } = require('pg')
const { argv } = require('node:process')

const url = argv[2] || `postgresql://${process.env.USER}:@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 30 ),
  added DATE
);

TRUNCATE TABLE messages RESTART IDENTITY;

INSERT INTO messages (text, username, added) 
VALUES
  ('Hello World!', 'Charles', NOW()),
  ('Hi there!', 'Amando', NOW()),
  ('Nice', 'Mr Meow', NOW());
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