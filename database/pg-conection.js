require('dotenv').config()
const { Client } = require('pg')

const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    post: process.env.DB_PORT || 5432,
    user:  process.env.DB_USER || 'postgres',
    password: process.env.DB_PWD || '',
    database: process.env.DB_DB || 'postgres'
}

const main = async (query) => {
    const client = new Client(config)

    await client.connect()
    const res = await client.query(query)
    await client.end()
}

module.exports = main