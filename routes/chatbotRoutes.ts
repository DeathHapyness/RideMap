import express from 'express';
import chatbotController from '../controllers/chatbotController';

const router = express.Router();

router.post('/', chatbotController.answer);

export default router;
