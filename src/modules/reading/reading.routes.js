import express from 'express';
import * as readingController from './reading.controller.js';

const router = express.Router();

router.get('/', readingController.getAllReadings);
router.get('/:id', readingController.getReadingById);
router.post('/', readingController.createReading);
router.put('/:id', readingController.updateReading);
router.delete('/:id', readingController.deleteReading);

export default router;
