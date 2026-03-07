import express from 'express';
import readingRoutes from '../modules/reading/reading.routes.js';
import soalReadingRoutes from '../modules/soal-reading/soal-reading.routes.js';
import listeningRoutes from '../modules/listening/listening.routes.js';
import writingRoutes from '../modules/writing/writing.routes.js';
import soalWritingRoutes from '../modules/soal-writing/soal-writing.routes.js';
import soalListeningRoutes from '../modules/soal-listening/soal-listening.routes.js';
import readingCategoryRoutes from '../modules/reading-category/reading-category.routes.js';
import listeningCategoryRoutes from '../modules/listening-category/listening-category.routes.js';
import writingCategoryRoutes from '../modules/writing-category/writing-category.routes.js';
import speakingRoutes from '../modules/speaking/speaking.routes.js';
import soalSpeakingRoutes from '../modules/soal-speaking/soal-speaking.routes.js';
import speakingCategoryRoutes from '../modules/speaking-category/speaking-category.routes.js';
import paketRoutes from '../modules/paket/paket.routes.js';
import dataUserRoutes from '../modules/data-user/data-user.routes.js';
import historyRoutes from '../modules/history/history.routes.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/uploads/readings/${req.file.filename}`;
    
    res.json({
      success: true,
      data: {
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.use('/readings', readingRoutes);
router.use('/soal-readings', soalReadingRoutes);
router.use('/listening', listeningRoutes);
router.use('/soal-listening', soalListeningRoutes);
router.use('/writing', writingRoutes);
router.use('/soal-writing', soalWritingRoutes);
router.use('/reading-categories', readingCategoryRoutes);
router.use('/listening-categories', listeningCategoryRoutes);
router.use('/writing-categories', writingCategoryRoutes);
router.use('/speakings', speakingRoutes);
router.use('/soal-speakings', soalSpeakingRoutes);
router.use('/speaking-categories', speakingCategoryRoutes);
router.use('/pakets', paketRoutes);
router.use('/data-users', dataUserRoutes);
router.use('/history', historyRoutes);

export default router;