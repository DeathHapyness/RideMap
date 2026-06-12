import pool from '../db/connection';

class NotificationModel {
  async countUnread(userId: number) {
    const result = await pool.query('SELECT COUNT(*) as total FROM notificacoes WHERE usuario_id = $1 AND lida = $2', [userId, 0]);
    return Number(result.rows[0].total);
  }

  async listForUser(userId: number) {
    const result = await pool.query('SELECT * FROM notificacoes WHERE usuario_id = $1 ORDER BY data_criacao DESC', [userId]);
    return result.rows;
  }

  async markAsRead(notificationId: string, userId: number) {
    return pool.query('UPDATE notificacoes SET lida = $1 WHERE id = $2 AND usuario_id = $3', [1, notificationId, userId]);
  }
}

export default new NotificationModel();
