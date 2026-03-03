import express from 'express';
const router = express.Router();
import * as speakingCategoryController from './speaking-category.controller.js';

router.get('/', speakingCategoryController.getAllCategories);
router.get('/:id', speakingCategoryController.getCategoryById);
router.post('/', speakingCategoryController.createCategory);
router.put('/:id', speakingCategoryController.updateCategory);
router.delete('/:id', speakingCategoryController.deleteCategory);

router.get('/:id/speakings', speakingCategoryController.getSpeakingByCategory);

export default router;
