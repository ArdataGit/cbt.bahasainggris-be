import express from 'express';
import * as soalReadingController from './soal-reading.controller.js';

const router = express.Router();

router.get('/', soalReadingController.getAllSoalReadings);
router.get('/:id', soalReadingController.getSoalReadingById);
router.post('/', soalReadingController.createSoalReading);
router.put('/:id', soalReadingController.updateSoalReading);
router.delete('/:id', soalReadingController.deleteSoalReading);

export default router;
