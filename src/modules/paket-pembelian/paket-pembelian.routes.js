import express from 'express';
import * as paketPembelianController from './paket-pembelian.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', paketPembelianController.getAllPaketPembelians);
router.get('/user', authenticateToken, paketPembelianController.getAllUserPembelians);
router.get('/:id', paketPembelianController.getPaketPembelianById);
router.post('/', paketPembelianController.createPaketPembelian);
router.put('/:id', paketPembelianController.updatePaketPembelian);
router.patch('/user/:id/status', paketPembelianController.updateUserPembelianStatus);
router.delete('/:id', paketPembelianController.deletePaketPembelian);

export default router;
