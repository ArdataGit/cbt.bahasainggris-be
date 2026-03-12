import express from 'express';
import * as notificationController from './notification.controller.js';
import { authenticateToken, isAdmin } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/broadcast', authenticateToken, isAdmin, notificationController.sendBroadcast);
router.patch('/:id/read', authenticateToken, notificationController.markRead);
router.patch('/read-all', authenticateToken, notificationController.markAllRead);

export default router;
