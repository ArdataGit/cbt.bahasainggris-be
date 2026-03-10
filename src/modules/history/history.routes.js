import express from 'express';
import * as historyController from './history.controller.js';
import { uploadTo } from '../../middleware/upload.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/reading', historyController.saveReadingHistory);
router.post('/listening', historyController.saveListeningHistory);
router.post('/writing', historyController.saveWritingHistory);
router.post('/speaking', uploadTo('userspeaking').array('audios'), historyController.saveSpeakingHistory);
router.post('/listening', historyController.saveListeningHistory);
router.post('/writing', historyController.saveWritingHistory);
router.get('/user', historyController.getUserHistory);
router.get('/', historyController.getAllHistory);
router.patch('/writing/:id/score', historyController.updateWritingScore);
router.patch('/speaking/:id/score', historyController.updateSpeakingScore);
router.post('/send-email', historyController.sendScoreEmail);
router.get('/pembelian', authenticateToken, historyController.getPembelianHistory);
router.get('/me', authenticateToken, historyController.getUserHistoryMe);
router.get('/me/:id', authenticateToken, historyController.getUserHistoryMeById);

export default router;
