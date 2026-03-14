import express from 'express';
import * as whatsappAdminController from './whatsapp-admin.controller.js';

const router = express.Router();

router.get('/', whatsappAdminController.getAllWhatsappAdmins);
router.post('/', whatsappAdminController.createWhatsappAdmin);
router.put('/:id', whatsappAdminController.updateWhatsappAdmin);
router.delete('/:id', whatsappAdminController.deleteWhatsappAdmin);

export default router;
