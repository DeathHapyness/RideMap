import pool from './connection';

export async function initializeDatabase() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Banco pronto:', result.rows[0].now);
  } catch (error) {
    console.error('Não foi possível conectar ao banco:', error);
  }
}

initializeDatabase();
