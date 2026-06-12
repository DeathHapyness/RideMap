"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotModel_1 = __importDefault(require("../models/spotModel"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
class SpotController {
    constructor() {
        this.listApprovedSpots = async (_req, res, next) => {
            try {
                const spots = await spotModel_1.default.listApproved();
                return res.json(spots);
            }
            catch (error) {
                next(error);
            }
        };
        this.createSpot = async (req, res, next) => {
            try {
                const { nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude } = req.body;
                await spotModel_1.default.create({
                    nome,
                    cidade,
                    estado,
                    tipo,
                    dificuldade,
                    descricao,
                    latitude,
                    longitude,
                    usuarioId: req.session.user.id
                });
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.mySpots = async (req, res, next) => {
            try {
                const spots = await spotModel_1.default.listByUser(req.session.user.id);
                return res.json(spots);
            }
            catch (error) {
                next(error);
            }
        };
        this.notificationCount = async (req, res, next) => {
            try {
                const total = await notificationModel_1.default.countUnread(req.session.user.id);
                return res.json({ total });
            }
            catch (error) {
                next(error);
            }
        };
        this.notifications = async (req, res, next) => {
            try {
                const items = await notificationModel_1.default.listForUser(req.session.user.id);
                return res.json(items);
            }
            catch (error) {
                next(error);
            }
        };
        this.markNotificationAsRead = async (req, res, next) => {
            try {
                const notificationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
                await notificationModel_1.default.markAsRead(notificationId, req.session.user?.id ?? 0);
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.filterDashboardGet = async (req, res, next) => {
            try {
                const spots = await spotModel_1.default.listByFilters(req.query);
                return res.json(spots);
            }
            catch (error) {
                next(error);
            }
        };
        this.filterDashboardPost = async (req, res, next) => {
            try {
                const spots = await spotModel_1.default.listByFilters(req.body);
                return res.json(spots);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = new SpotController();
