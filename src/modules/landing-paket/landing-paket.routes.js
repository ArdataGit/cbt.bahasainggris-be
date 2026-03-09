import express from 'express';
import * as landingPaketController from './landing-paket.controller.js';

const router = express.Router();

router.get('/', landingPaketController.getAllLandingPakets);
router.post('/', landingPaketController.addLandingPaket);
router.put('/:id/order', landingPaketController.updateLandingPaketOrder);
router.delete('/:id', landingPaketController.deleteLandingPaket);

export default router;
