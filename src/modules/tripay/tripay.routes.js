import express from 'express';
import * as tripayController from './tripay.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/channels', authenticateToken, tripayController.getChannels);
router.post('/request', authenticateToken, tripayController.createPayment);
router.post('/callback', tripayController.handleCallback);

export default router;
