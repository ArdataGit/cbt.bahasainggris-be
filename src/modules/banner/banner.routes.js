import express from 'express';
import * as bannerController from './banner.controller.js';
import { uploadImageTo } from '../../middleware/imageUpload.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', bannerController.getAllBanners);
router.post('/', authenticateToken, uploadImageTo('banners').single('image'), bannerController.createBanner);
router.delete('/:id', authenticateToken, bannerController.deleteBanner);

export default router;
