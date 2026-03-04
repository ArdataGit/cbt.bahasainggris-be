import express from 'express';
import * as listeningController from './listening.controller.js';
import upload, { uploadTo } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', listeningController.getAllListening);
router.get('/:id', listeningController.getListeningById);
router.post('/', uploadTo('audiomaster').single('audio'), listeningController.createListening);
router.put('/:id', uploadTo('audiomaster').single('audio'), listeningController.updateListening);
router.delete('/:id', listeningController.deleteListening);

export default router;
