import express from 'express';
const router = express.Router();
import * as soalSpeakingController from './soal-speaking.controller.js';

router.get('/', soalSpeakingController.getAllSoalSpeaking);
router.get('/:id', soalSpeakingController.getSoalSpeakingById);
router.post('/', soalSpeakingController.createSoalSpeaking);
router.put('/:id', soalSpeakingController.updateSoalSpeaking);
router.delete('/:id', soalSpeakingController.deleteSoalSpeaking);

export default router;
