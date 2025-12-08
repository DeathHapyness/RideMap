const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('🔍 Configuração MySQL:');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: '127.0.0.1',  //! FORÇAR IPv4/NAO MEXER
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  family: 4  //! FORÇAR IPv4/NAO mexer
});

// Testar conexão
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL conectado com sucesso em 127.0.0.1:3306');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar MySQL:', err.message);
    console.error('Verifique se o MySQL está rodando: sudo systemctl status mysql');
  });

module.exports = pool;