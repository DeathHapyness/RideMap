require('dotenv').config();
const mysql = require('mysql2');

const databaseName = 'ridemap';

// configuracao do banco de dados
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(' faltando variáveis de ambiente obrigatórias:', missingVars);
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    timeout: 10000, 
    acquireTimeout: 10000
});

// Conectar primeiro
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    
    console.log('Conectado ao MySQL');
    
    // Criar banco de dados
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``, (err) => {
        if (err) {
            console.error('Erro ao criar banco:', err.message);
        } else {
            console.log(`Banco "${databaseName}" criado com sucesso!`);
        }
        connection.end();
    });
});