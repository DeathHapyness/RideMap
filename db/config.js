const { Pool } = require('pg');
require('dotenv').config();

console.log('Conectando ao PostgreSQL...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    //**Em producao mudar para true */
    rejectUnauthorized: false 
  }
});

pool.on('connect', () => {
  console.log('PostgreSQL conectado com sucesso');
});

pool.on('error', (err) => {
  console.error('Erro ao conectar PostgreSQL:', err.message);
});

module.exports = pool;