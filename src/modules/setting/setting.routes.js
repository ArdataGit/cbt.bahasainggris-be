import express from 'express';
import * as settingController from './setting.controller.js';

const router = express.Router();

router.get('/', settingController.getSettings);
router.put('/', settingController.updateSettings);

export default router;
