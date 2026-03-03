import express from 'express';
import * as listeningCategoryController from './listening-category.controller.js';

const router = express.Router();

router.get('/', listeningCategoryController.getAllCategories);
router.get('/:id', listeningCategoryController.getCategoryById);
router.post('/', listeningCategoryController.createCategory);
router.put('/:id', listeningCategoryController.updateCategory);
router.delete('/:id', listeningCategoryController.deleteCategory);

export default router;
