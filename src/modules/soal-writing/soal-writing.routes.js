import express from 'express';
import * as soalWritingController from './soal-writing.controller.js';

const router = express.Router();

router.get('/', soalWritingController.getSoalByWritingId);
router.get('/:id', soalWritingController.getSoalById);
router.post('/', soalWritingController.createSoal);
router.put('/:id', soalWritingController.updateSoal);
router.delete('/:id', soalWritingController.deleteSoal);

export default router;
