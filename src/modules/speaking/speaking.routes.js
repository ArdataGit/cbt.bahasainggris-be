import express from 'express';
const router = express.Router();
import * as speakingController from './speaking.controller.js';
import upload from '../../middleware/upload.js';

router.get('/', speakingController.getAllSpeaking);
router.get('/:id', speakingController.getSpeakingById);

// Expecting 'audio' field for file uploads
router.post('/', upload.single('audio'), speakingController.createSpeaking);
router.put('/:id', upload.single('audio'), speakingController.updateSpeaking);

router.delete('/:id', speakingController.deleteSpeaking);

export default router;
