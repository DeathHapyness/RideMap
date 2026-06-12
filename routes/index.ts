import express from 'express';
import authRoutes from './authRoutes';
import spotRoutes from './spotRoutes';
import adminRoutes from './adminRoutes';
import chatbotRoutes from './chatbotRoutes';

const router = express.Router();

router.use(authRoutes);
router.use(spotRoutes);
router.use(adminRoutes);
router.use('/chatbot', chatbotRoutes);

export default router;
