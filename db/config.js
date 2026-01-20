const { Pool } = require('pg');
require('dotenv').config();

console.log('🔍 Configuração PostgreSQL:');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL conectado com sucesso');
});

pool.on('error', (err) => {
  console.error('❌ Erro ao conectar PostgreSQL:', err.message);
});

module.exports = pool;