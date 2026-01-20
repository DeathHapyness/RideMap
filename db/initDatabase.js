const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: 'postgres', 
});

const dbName = process.env.DB_NAME || 'ridemap';

async function createDatabase() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`📦 Criando banco de dados "${dbName}"...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Banco de dados "${dbName}" criado com sucesso!`);
    } else {
      console.log(`✅ Banco de dados "${dbName}" já existe.`);
    }
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }

  await createTables();
}

async function createTables() {
  const dbPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: dbName,
  });

  const client = await dbPool.connect();
  try {
    console.log('📋 Criando tabelas...');

    // TABELA: usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        avatar_url VARCHAR(500),
        avatar_public_id VARCHAR(255),
        role VARCHAR(20) DEFAULT 'user',
        reset_token VARCHAR(255),
        reset_expira TIMESTAMP,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ultima_atividade TIMESTAMP,
        ativo BOOLEAN DEFAULT TRUE
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email);
      CREATE INDEX IF NOT EXISTS idx_role ON usuarios(role);
      CREATE INDEX IF NOT EXISTS idx_ativo ON usuarios(ativo);
    `);

    console.log('✅ Tabela usuarios criada');

    // TABELA: pistas
    await client.query(`
      CREATE TABLE IF NOT EXISTS pistas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        cidade VARCHAR(100) NOT NULL,
        estado VARCHAR(2) NOT NULL,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        tipo VARCHAR(50) NOT NULL,
        dificuldade VARCHAR(50) NOT NULL,
        descricao TEXT,
        usuario_id INT NOT NULL,
        status VARCHAR(20) DEFAULT 'pendente',
        motivo_rejeicao TEXT,
        data_moderacao TIMESTAMP,
        moderador_id INT,
        ativa BOOLEAN DEFAULT TRUE,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_status ON pistas(status);
      CREATE INDEX IF NOT EXISTS idx_cidade ON pistas(cidade);
      CREATE INDEX IF NOT EXISTS idx_tipo ON pistas(tipo);
      CREATE INDEX IF NOT EXISTS idx_dificuldade ON pistas(dificuldade);
      CREATE INDEX IF NOT EXISTS idx_usuario ON pistas(usuario_id);
      CREATE INDEX IF NOT EXISTS idx_ativa ON pistas(ativa);
    `);

    console.log('✅ Tabela pistas criada');

    // TABELA: notificacoes
    await client.query(`
      CREATE TABLE IF NOT EXISTS notificacoes (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        mensagem TEXT NOT NULL,
        lida BOOLEAN DEFAULT FALSE,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_usuario_lida ON notificacoes(usuario_id, lida);
      CREATE INDEX IF NOT EXISTS idx_data ON notificacoes(data_criacao);
      CREATE INDEX IF NOT EXISTS idx_lida ON notificacoes(lida);
    `);

    console.log('✅ Tabela notificacoes criada');

    // TABELA: fotos_pistas
    await client.query(`
      CREATE TABLE IF NOT EXISTS fotos_pistas (
        id SERIAL PRIMARY KEY,
        pista_id INT NOT NULL,
        usuario_id INT NOT NULL,
        url VARCHAR(500) NOT NULL,
        public_id VARCHAR(255),
        descricao TEXT,
        principal BOOLEAN DEFAULT FALSE,
        aprovada BOOLEAN DEFAULT FALSE,
        data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pista_id) REFERENCES pistas(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_pista ON fotos_pistas(pista_id);
      CREATE INDEX IF NOT EXISTS idx_usuario_fotos ON fotos_pistas(usuario_id);
      CREATE INDEX IF NOT EXISTS idx_aprovada ON fotos_pistas(aprovada);
      CREATE INDEX IF NOT EXISTS idx_principal ON fotos_pistas(principal);
    `);

    console.log(' Tabela fotos_pistas criada');

    console.log('\n Banco de dados inicializado com sucesso!');

  } catch (error) {
    console.error(' Erro ao criar tabelas:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    await dbPool.end();
  }
}

createDatabase();
