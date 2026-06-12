"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
class NotificationModel {
    async countUnread(userId) {
        const result = await connection_1.default.query('SELECT COUNT(*) as total FROM notificacoes WHERE usuario_id = $1 AND lida = $2', [userId, 0]);
        return Number(result.rows[0].total);
    }
    async listForUser(userId) {
        const result = await connection_1.default.query('SELECT * FROM notificacoes WHERE usuario_id = $1 ORDER BY data_criacao DESC', [userId]);
        return result.rows;
    }
    async markAsRead(notificationId, userId) {
        return connection_1.default.query('UPDATE notificacoes SET lida = $1 WHERE id = $2 AND usuario_id = $3', [1, notificationId, userId]);
    }
}
exports.default = new NotificationModel();
