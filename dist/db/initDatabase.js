"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const connection_1 = __importDefault(require("./connection"));
async function initializeDatabase() {
    try {
        const result = await connection_1.default.query('SELECT NOW()');
        console.log('Banco pronto:', result.rows[0].now);
    }
    catch (error) {
        console.error('Não foi possível conectar ao banco:', error);
    }
}
initializeDatabase();
