const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool({
  connectionLimit: config.DB.CONNECTION_LIMIT,
  host: config.DB.HOST,
  port: config.DB.PORT,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE,
})

module.exports = pool
