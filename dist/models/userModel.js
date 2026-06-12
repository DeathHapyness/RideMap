"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
class UserModel {
    async findByEmail(email) {
        const result = await connection_1.default.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
    async create({ nome, email, senha }) {
        return connection_1.default.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha]);
    }
    async updateAvatar(userId, avatarUrl) {
        return connection_1.default.query('UPDATE usuarios SET avatar_url = $1 WHERE id = $2', [avatarUrl, userId]);
    }
    async updateProfile(userId, nome) {
        return connection_1.default.query('UPDATE usuarios SET nome = $1 WHERE id = $2', [nome, userId]);
    }
    async savePasswordReset(email, token, expiration) {
        return connection_1.default.query('UPDATE usuarios SET reset_token = $1, reset_expira = $2 WHERE email = $3', [token, expiration, email]);
    }
    async countActiveUsers() {
        const result = await connection_1.default.query('SELECT COUNT(*) as total FROM usuarios WHERE ativo = TRUE');
        return Number(result.rows[0].total);
    }
    async listUsers() {
        const result = await connection_1.default.query(`
      SELECT u.id, u.nome, u.email, u.avatar_url, u.role, u.ativo, u.data_criacao, u.ultima_atividade,
             COUNT(p.id) as total_pistas
      FROM usuarios u
      LEFT JOIN pistas p ON u.id = p.usuario_id
      GROUP BY u.id
      ORDER BY u.data_criacao DESC
    `);
        return result.rows;
    }
    async setActive(userId, active) {
        return connection_1.default.query('UPDATE usuarios SET ativo = $1 WHERE id = $2', [active, userId]);
    }
}
exports.default = new UserModel();
