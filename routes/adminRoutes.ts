import express from 'express';
import adminController from '../controllers/adminController';
import { isAuthenticated, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/admin/dashboard', isAuthenticated, isAdmin, adminController.dashboard);
router.get('/api/admin/', isAuthenticated, isAdmin, adminController.stats);
router.get('/api/admin/pistas-ativas', isAuthenticated, isAdmin, adminController.stats);
router.get('/api/admin/pistas-pendentes', isAuthenticated, isAdmin, adminController.pendingSpots);
router.get('/api/admin/todas-pistas', isAuthenticated, isAdmin, adminController.allSpots);
router.get('/api/admin/todos-usuarios', isAuthenticated, isAdmin, adminController.allUsers);
router.post('/api/admin/desativar-usuario/:id', isAuthenticated, isAdmin, adminController.disableUser);
router.post('/api/admin/ativar-usuario/:id', isAuthenticated, isAdmin, adminController.enableUser);
router.post('/api/admin/aprovar-pista/:id', isAuthenticated, isAdmin, adminController.approveSpot);
router.post('/api/admin/rejeitar-pista/:id', isAuthenticated, isAdmin, adminController.rejectSpot);
router.get('/api/admin/avisos', isAuthenticated, isAdmin, adminController.listAnnouncements);
router.post('/api/admin/avisos', isAuthenticated, isAdmin, adminController.createAnnouncement);

export default router;
