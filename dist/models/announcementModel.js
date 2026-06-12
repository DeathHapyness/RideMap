"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
class AnnouncementModel {
    async getAll() {
        const result = await connection_1.default.query(`
      SELECT id, titulo, tipo, mensagem, ativo, data_criacao, expira_em
      FROM avisos
      ORDER BY data_criacao DESC
    `);
        return result.rows;
    }
    async create({ titulo, mensagem, tipo, ativo }) {
        const result = await connection_1.default.query('INSERT INTO avisos (titulo, mensagem, tipo, ativo) VALUES ($1, $2, $3, $4) RETURNING *', [titulo, mensagem, tipo, ativo]);
        return result.rows[0];
    }
}
exports.default = new AnnouncementModel();
