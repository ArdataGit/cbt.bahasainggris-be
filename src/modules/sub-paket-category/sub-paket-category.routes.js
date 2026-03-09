import express from 'express';
const router = express.Router();
import * as subCategoryController from './sub-paket-category.controller.js';

router.get('/', subCategoryController.getAllSubCategories);
router.get('/:id', subCategoryController.getSubCategoryById);
router.post('/', subCategoryController.createSubCategory);
router.put('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

export default router;
