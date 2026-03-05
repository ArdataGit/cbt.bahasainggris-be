import express from 'express';
const router = express.Router();
import * as speakingController from './speaking.controller.js';
import { uploadTo } from '../../middleware/upload.js';

router.get('/', speakingController.getAllSpeaking);
router.get('/:id', speakingController.getSpeakingById);

// Expecting 'audio' field for file uploads
const uploadSpeaking = uploadTo('speakingmaster');

router.post('/', uploadSpeaking.single('audio'), speakingController.createSpeaking);
router.put('/:id', uploadSpeaking.single('audio'), speakingController.updateSpeaking);

router.delete('/:id', speakingController.deleteSpeaking);


export default router;
