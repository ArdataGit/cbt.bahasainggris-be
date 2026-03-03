import express from 'express';
import * as listeningController from './listening.controller.js';
import upload from '../../middleware/upload.js';

const router = express.Router();

router.get('/', listeningController.getAllListening);
router.get('/:id', listeningController.getListeningById);
router.post('/', upload.single('audio'), listeningController.createListening);
router.put('/:id', upload.single('audio'), listeningController.updateListening);
router.delete('/:id', listeningController.deleteListening);

export default router;
