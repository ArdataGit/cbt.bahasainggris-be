import express from 'express';
import * as writingController from './writing.controller.js';

const router = express.Router();

router.get('/', writingController.getAllWriting);
router.get('/:id', writingController.getWritingById);
router.post('/', writingController.createWriting);
router.put('/:id', writingController.updateWriting);
router.delete('/:id', writingController.deleteWriting);

export default router;
