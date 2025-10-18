require('dotenv').config();
const mysql = require('mysql2');

// Criando pool de conexões para melhor performance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convertendo para promises para usar async/await
const promisePool = pool.promise();

module.exports = promisePool;
