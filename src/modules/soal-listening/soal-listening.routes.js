import express from 'express';
import * as soalListeningController from './soal-listening.controller.js';

const router = express.Router();

router.get('/', soalListeningController.getSoalByListeningId);
router.get('/:id', soalListeningController.getSoalById);
router.post('/', soalListeningController.createSoal);
router.put('/:id', soalListeningController.updateSoal);
router.delete('/:id', soalListeningController.deleteSoal);

export default router;
