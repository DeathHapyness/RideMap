"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotController_1 = __importDefault(require("../controllers/spotController"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/api/spots', spotController_1.default.listApprovedSpots);
router.post('/api/pistas/criar', auth_1.isAuthenticated, spotController_1.default.createSpot);
router.get('/api/minhas-pistas', auth_1.isAuthenticated, spotController_1.default.mySpots);
router.get('/api/notificacoes/count', auth_1.isAuthenticated, spotController_1.default.notificationCount);
router.get('/api/notificacoes', auth_1.isAuthenticated, spotController_1.default.notifications);
router.post('/api/notificacoes/marcar-lida/:id', auth_1.isAuthenticated, spotController_1.default.markNotificationAsRead);
router.get('/api/dashboard', spotController_1.default.filterDashboardGet);
router.post('/api/dashboard', spotController_1.default.filterDashboardPost);
exports.default = router;
