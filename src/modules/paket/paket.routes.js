import express from 'express';
const router = express.Router();
import * as paketController from './paket.controller.js';

router.get('/', paketController.getAllPakets);
router.get('/:id', paketController.getPaketById);
router.post('/', paketController.createPaket);
router.put('/:id', paketController.updatePaket);
router.delete('/:id', paketController.deletePaket);

export default router;
