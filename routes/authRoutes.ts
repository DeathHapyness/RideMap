import express from 'express';
import authController from '../controllers/authController';
import { isAuthenticated } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

router.get('/', authController.home);
router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.post('/recuperar-senha', authController.forgotPassword);
router.get('/dashboard', isAuthenticated, authController.dashboard);
router.post('/update-avatar', isAuthenticated, upload.single('avatar'), authController.updateAvatar);
router.post('/update-profile', isAuthenticated, authController.updateProfile);

export default router;
