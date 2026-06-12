import express from 'express';
import spotController from '../controllers/spotController';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

router.get('/api/spots', spotController.listApprovedSpots);
router.post('/api/pistas/criar', isAuthenticated, spotController.createSpot);
router.get('/api/minhas-pistas', isAuthenticated, spotController.mySpots);
router.get('/api/notificacoes/count', isAuthenticated, spotController.notificationCount);
router.get('/api/notificacoes', isAuthenticated, spotController.notifications);
router.post('/api/notificacoes/marcar-lida/:id', isAuthenticated, spotController.markNotificationAsRead);
router.get('/api/dashboard', spotController.filterDashboardGet);
router.post('/api/dashboard', spotController.filterDashboardPost);

export default router;
