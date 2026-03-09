import express from 'express';
import * as paketPembelianController from './paket-pembelian.controller.js';

const router = express.Router();

router.get('/', paketPembelianController.getAllPaketPembelians);
router.get('/:id', paketPembelianController.getPaketPembelianById);
router.post('/', paketPembelianController.createPaketPembelian);
router.put('/:id', paketPembelianController.updatePaketPembelian);
router.delete('/:id', paketPembelianController.deletePaketPembelian);

export default router;
