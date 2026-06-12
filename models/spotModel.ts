import pool from '../db/connection';

class SpotModel {
  async listApproved() {
    const result = await pool.query('SELECT * FROM pistas WHERE status = $1', ['aprovada']);
    return result.rows;
  }

  async create({ nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuarioId }: Record<string, any>) {
    return pool.query(
      `INSERT INTO pistas (nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuario_id, status, data_criacao)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuarioId, 'pendente']
    );
  }

  async listByUser(userId: number) {
    const result = await pool.query('SELECT * FROM pistas WHERE usuario_id = $1 ORDER BY data_criacao DESC', [userId]);
    return result.rows;
  }

  async listByFilters(filters: any) {
    const { tipo, dificuldade, cidade, estado } = filters;
    let query = 'SELECT * FROM pistas WHERE status = $1';
    const params: any[] = ['aprovada'];
    let paramCount = 2;

    if (tipo) {
      if (Array.isArray(tipo)) {
        const placeholders = tipo.map(() => `$${paramCount++}`).join(',');
        query += ` AND tipo IN (${placeholders})`;
        params.push(...tipo);
      } else {
        query += ` AND tipo = $${paramCount++}`;
        params.push(tipo);
      }
    }

    if (dificuldade) {
      if (Array.isArray(dificuldade)) {
        const placeholders = dificuldade.map(() => `$${paramCount++}`).join(',');
        query += ` AND dificuldade IN (${placeholders})`;
        params.push(...dificuldade);
      } else {
        query += ` AND dificuldade = $${paramCount++}`;
        params.push(dificuldade);
      }
    }

    if (cidade) {
      if (Array.isArray(cidade)) {
        const placeholders = cidade.map(() => `$${paramCount++}`).join(',');
        query += ` AND cidade IN (${placeholders})`;
        params.push(...cidade);
      } else {
        query += ` AND cidade = $${paramCount++}`;
        params.push(cidade);
      }
    }

    if (estado) {
      if (Array.isArray(estado)) {
        const placeholders = estado.map(() => `$${paramCount++}`).join(',');
        query += ` AND estado IN (${placeholders})`;
        params.push(...estado);
      } else {
        query += ` AND estado = $${paramCount++}`;
        params.push(estado);
      }
    }

    const result = await pool.query(query, params);
    return result.rows;
  }

  async countApproved() {
    const result = await pool.query('SELECT COUNT(*) as total FROM pistas WHERE status = $1', ['aprovada']);
    return Number(result.rows[0].total);
  }

  async listPendingCount() {
    const result = await pool.query('SELECT COUNT(*) as total FROM pistas WHERE status = $1', ['pendente']);
    return Number(result.rows[0].total);
  }

  async listPending() {
    const result = await pool.query(`
      SELECT p.*, u.nome as usuario_nome
      FROM pistas p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.status = 'pendente'
      ORDER BY p.data_criacao DESC
    `);
    return result.rows;
  }

  async listAllForAdmin() {
    const result = await pool.query(`
      SELECT p.id, p.nome, CONCAT(p.cidade, ' - ', p.estado) as localizacao, p.cidade, p.estado, p.latitude, p.longitude,
             p.tipo, p.dificuldade, p.status, p.data_criacao as criado_em, u.nome as usuario_nome
      FROM pistas p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY CASE p.status WHEN 'pendente' THEN 1 WHEN 'aprovada' THEN 2 WHEN 'ativa' THEN 2 WHEN 'rejeitada' THEN 3 END,
               p.data_criacao DESC
    `);
    return result.rows.map((pista: any) => ({ ...pista, status: pista.status === 'aprovada' ? 'ativa' : pista.status }));
  }

  async approve(spotId: string, adminId: number) {
    const pista = await pool.query('SELECT usuario_id FROM pistas WHERE id = $1', [spotId]);
    if (!pista.rows[0]) {
      throw new Error('Pista não encontrada');
    }

    await pool.query(
      'UPDATE pistas SET status = $1, moderador_id = $2, data_moderacao = NOW() WHERE id = $3',
      ['aprovada', adminId, spotId]
    );

    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES ($1, $2, $3)',
      [pista.rows[0].usuario_id, 'pista_aprovada', '✅ Sua pista foi aprovada e já está visível no mapa!']
    );
  }

  async reject(spotId: string, adminId: number, motivo: string) {
    const pista = await pool.query('SELECT usuario_id FROM pistas WHERE id = $1', [spotId]);
    if (!pista.rows[0]) {
      throw new Error('Pista não encontrada');
    }

    await pool.query(
      'UPDATE pistas SET status = $1, motivo_rejeicao = $2, moderador_id = $3, data_moderacao = NOW() WHERE id = $4',
      ['rejeitada', motivo, adminId, spotId]
    );

    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES ($1, $2, $3)',
      [pista.rows[0].usuario_id, 'pista_rejeitada', `❌ Sua pista foi rejeitada. Motivo: ${motivo}`]
    );
  }
}

export default new SpotModel();
