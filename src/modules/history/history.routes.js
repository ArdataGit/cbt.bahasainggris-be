import express from 'express';
import * as historyController from './history.controller.js';

const router = express.Router();

router.post('/reading', historyController.saveReadingHistory);
router.post('/listening', historyController.saveListeningHistory);
router.get('/user', historyController.getUserHistory);

export default router;
