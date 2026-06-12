import pool from '../db/connection';

class UserModel {
  async findByEmail(email: string) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async create({ nome, email, senha }: { nome: string; email: string; senha: string }) {
    return pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
  }

  async updateAvatar(userId: number, avatarUrl: string) {
    return pool.query('UPDATE usuarios SET avatar_url = $1 WHERE id = $2', [avatarUrl, userId]);
  }

  async updateProfile(userId: number, nome: string) {
    return pool.query('UPDATE usuarios SET nome = $1 WHERE id = $2', [nome, userId]);
  }

  async savePasswordReset(email: string, token: string, expiration: Date) {
    return pool.query('UPDATE usuarios SET reset_token = $1, reset_expira = $2 WHERE email = $3', [token, expiration, email]);
  }

  async countActiveUsers() {
    const result = await pool.query('SELECT COUNT(*) as total FROM usuarios WHERE ativo = TRUE');
    return Number(result.rows[0].total);
  }

  async listUsers() {
    const result = await pool.query(`
      SELECT u.id, u.nome, u.email, u.avatar_url, u.role, u.ativo, u.data_criacao, u.ultima_atividade,
             COUNT(p.id) as total_pistas
      FROM usuarios u
      LEFT JOIN pistas p ON u.id = p.usuario_id
      GROUP BY u.id
      ORDER BY u.data_criacao DESC
    `);
    return result.rows;
  }

  async setActive(userId: string, active: boolean) {
    return pool.query('UPDATE usuarios SET ativo = $1 WHERE id = $2', [active, userId]);
  }
}

export default new UserModel();
