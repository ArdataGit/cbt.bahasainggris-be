import express from 'express';
const router = express.Router();
import * as paketController from './paket.controller.js';
import { authenticateToken, isAdmin, optionalAuthenticateToken } from '../../middleware/auth.middleware.js';

router.get('/', optionalAuthenticateToken, paketController.getAllPakets);
router.get('/:id', optionalAuthenticateToken, paketController.getPaketById);
router.post('/', authenticateToken, isAdmin, paketController.createPaket);
router.put('/:id', authenticateToken, isAdmin, paketController.updatePaket);
router.delete('/:id', authenticateToken, isAdmin, paketController.deletePaket);

export default router;
