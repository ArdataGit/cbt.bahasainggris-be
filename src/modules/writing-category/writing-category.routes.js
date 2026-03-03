import express from 'express';
import * as writingCategoryController from './writing-category.controller.js';

const router = express.Router();

router.get('/', writingCategoryController.getAllCategories);
router.get('/:id', writingCategoryController.getCategoryById);
router.post('/', writingCategoryController.createCategory);
router.put('/:id', writingCategoryController.updateCategory);
router.delete('/:id', writingCategoryController.deleteCategory);

export default router;
