//criacao do banco de dados
const mysql = require('mysql2')

const databaseName = 'RideMap';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``,(err) => {
    if (err){
        console.error('erro ao criar banco',err.message);
    }else{
        console.log(`Banco "${databaseName}" criado com sucesso!`);
    }
    connection.end();
});