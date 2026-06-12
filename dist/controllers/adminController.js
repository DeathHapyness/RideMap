"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const spotModel_1 = __importDefault(require("../models/spotModel"));
const announcementModel_1 = __importDefault(require("../models/announcementModel"));
class AdminController {
    constructor() {
        this.dashboard = (req, res) => {
            res.render('admin-dashboard', {
                title: 'Painel Admin - RideMap',
                user: req.session.user
            });
        };
        this.stats = async (_req, res, next) => {
            try {
                const [activeUsers, approvedSpots, pendingSpots] = await Promise.all([
                    userModel_1.default.countActiveUsers(),
                    spotModel_1.default.countApproved(),
                    spotModel_1.default.listPendingCount()
                ]);
                return res.json({ success: true, total: activeUsers, approvedSpots, pendingSpots });
            }
            catch (error) {
                next(error);
            }
        };
        this.pendingSpots = async (_req, res, next) => {
            try {
                const spots = await spotModel_1.default.listPending();
                return res.json(spots);
            }
            catch (error) {
                next(error);
            }
        };
        this.allSpots = async (_req, res, next) => {
            try {
                const spots = await spotModel_1.default.listAllForAdmin();
                return res.json({ success: true, pistas: spots });
            }
            catch (error) {
                next(error);
            }
        };
        this.allUsers = async (_req, res, next) => {
            try {
                const users = await userModel_1.default.listUsers();
                return res.json({ success: true, usuarios: users });
            }
            catch (error) {
                next(error);
            }
        };
        this.disableUser = async (req, res, next) => {
            try {
                const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
                const { motivo } = req.body;
                if (!motivo) {
                    return res.status(400).json({ error: 'Motivo é obrigatório' });
                }
                await userModel_1.default.setActive(userId, false);
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.enableUser = async (req, res, next) => {
            try {
                const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
                await userModel_1.default.setActive(userId, true);
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.approveSpot = async (req, res, next) => {
            try {
                const spotId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
                await spotModel_1.default.approve(spotId, req.session.user?.id ?? 0);
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.rejectSpot = async (req, res, next) => {
            try {
                const spotId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
                const { motivo } = req.body;
                if (!motivo || motivo.trim() === '') {
                    return res.status(400).json({ error: 'Motivo é obrigatório' });
                }
                await spotModel_1.default.reject(spotId, req.session.user?.id ?? 0, motivo);
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.listAnnouncements = async (_req, res, next) => {
            try {
                const announcements = await announcementModel_1.default.getAll();
                return res.json({ success: true, avisos: announcements });
            }
            catch (error) {
                next(error);
            }
        };
        this.createAnnouncement = async (req, res, next) => {
            try {
                const { titulo, mensagem } = req.body;
                if (!titulo || titulo.trim() === '' || !mensagem || mensagem.trim() === '') {
                    return res.status(400).json({ error: 'Título e mensagem são obrigatórios' });
                }
                const aviso = await announcementModel_1.default.create({ titulo, mensagem, tipo: 'info', ativo: true });
                return res.json({ success: true, aviso });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = new AdminController();
