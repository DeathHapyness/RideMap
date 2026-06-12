import pool from '../db/connection';

class AnnouncementModel {
  async getAll() {
    const result = await pool.query(`
      SELECT id, titulo, tipo, mensagem, ativo, data_criacao, expira_em
      FROM avisos
      ORDER BY data_criacao DESC
    `);
    return result.rows;
  }

  async create({ titulo, mensagem, tipo, ativo }: { titulo: string; mensagem: string; tipo: string; ativo: boolean }) {
    const result = await pool.query(
      'INSERT INTO avisos (titulo, mensagem, tipo, ativo) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, mensagem, tipo, ativo]
    );
    return result.rows[0];
  }
}

export default new AnnouncementModel();
